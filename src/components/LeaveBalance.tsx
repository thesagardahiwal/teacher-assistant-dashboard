import { TrendingUp, TrendingDown } from 'lucide-react';

interface LeaveBalanceProps {
  leaveBalance: {
    casual: number;
    sick: number;
    earned: number;
  };
}

export function LeaveBalance({ leaveBalance }: LeaveBalanceProps) {
  const leaveTypes = [
    {
      type: 'casual',
      label: 'Casual Leave',
      balance: leaveBalance?.casual,
      color: 'bg-blue-500',
      trend: 'down' as const
    },
    {
      type: 'sick',
      label: 'Sick Leave',
      balance: leaveBalance?.sick,
      color: 'bg-orange-500',
      trend: 'stable' as const
    },
    {
      type: 'earned',
      label: 'Earned Leave',
      balance: leaveBalance?.earned,
      color: 'bg-green-500',
      trend: 'up' as const
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h2>
      
      <div className="space-y-4">
        {leaveTypes.map((leave) => (
          <div key={leave.type} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${leave.color}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-900">{leave.label}</p>
                <p className="text-xs text-gray-500">Days remaining</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {leave.balance}
              </span>
              {leave.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : leave.trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
          View Leave History →
        </button>
      </div>
    </div>
  );
}