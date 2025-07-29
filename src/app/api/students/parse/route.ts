import { NextRequest, NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { parse } from 'csv-parse/sync';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const columnMapping = formData.get('mapping') as string;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.toLowerCase();
    let records: any[] = [];

    if (filename.endsWith('.csv')) {
      records = parse(buffer.toString(), {
        columns: true,
        skip_empty_lines: true,
      });
    } 
    else if (filename.endsWith('.xlsx') || filename.endsWith('.xls')) {
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      records = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } 
    else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
    }

    // Apply column mapping if provided
    let mappedData = records;
    if (columnMapping) {
      const mapping = JSON.parse(columnMapping);
      mappedData = records.map(record => {
        const mappedRecord: any = {};
        for (const [targetField, sourceField] of Object.entries(mapping)) {
          mappedRecord[targetField] = record[sourceField as string];
        }
        return mappedRecord;
      });
    }

    return NextResponse.json({ 
      success: true,
      rawData: records,
      mappedData: mappedData,
      sample: mappedData.slice(0, 5) // Return first 5 rows for preview
    });

  } catch (err) {
    console.error('File processing error:', err);
    return NextResponse.json(
      { error: 'Failed to process file', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}