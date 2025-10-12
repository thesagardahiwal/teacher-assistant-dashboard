import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { ITeachingDiary } from '@/types/teachingDiary.types';


interface DiaryCalendarViewProps {
  entries: ITeachingDiary[];
  onEntryClick: (entry: ITeachingDiary) => void;
}

export function DiaryCalendarView({ entries, onEntryClick }: DiaryCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { month, year, daysInMonth, firstDayOfMonth } = useMemo(() => {
    const date = new Date(currentDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    
    return {
      month: date.toLocaleString('default', { month: 'long' }),
      year,
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      firstDayOfMonth: new Date(year, month, 1).getDay()
    };
  }, [currentDate]);

  const getEntriesForDate = (date: Date) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.lectureDate);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, currentDate.getMonth(), day);
      days.push(date);
    }
    
    return days;
  }, [year, currentDate.getMonth(), daysInMonth, firstDayOfMonth]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {month} {year}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const isToday = date && 
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();
            
            const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();
            const dayEntries = date ? getEntriesForDate(date) : [];

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-200 ${
                  !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                } ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
              >
                {date && (
                  <>
                    {/* Date Number */}
                    <div className={`text-sm font-medium mb-1 ${
                      isToday 
                        ? 'text-blue-600' 
                        : isCurrentMonth 
                        ? 'text-gray-900' 
                        : 'text-gray-400'
                    }`}>
                      {date.getDate()}
                    </div>

                    {/* Entries */}
                    <div className="space-y-1">
                      {dayEntries.slice(0, 2).map((entry, entryIndex) => (
                        <button
                          key={entryIndex}
                          onClick={() => onEntryClick(entry)}
                          className="w-full text-left p-1 bg-blue-50 hover:bg-blue-100 rounded text-xs text-blue-700 truncate transition"
                          title={`${entry.subject} - ${entry.batch}`}
                        >
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">
                              {entry.subject}
                            </span>
                          </div>
                        </button>
                      ))}
                      
                      {dayEntries.length > 2 && (
                        <div className="text-xs text-gray-500 px-1">
                          +{dayEntries.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Teaching Entry</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 border-2 border-blue-500 rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}