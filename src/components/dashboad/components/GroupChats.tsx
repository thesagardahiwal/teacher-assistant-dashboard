// app/dashboard/components/GroupChats.tsx
import { MessageSquare } from "lucide-react";

const groupChats = [
  {
    name: "Teacher’s Group",
    message: "Donna Clapton: Who can replace me on Wed...",
    count: 14,
  },
  {
    name: "Class 3A",
    message: "You: Composition-task.pdf",
    count: 0,
  },
  {
    name: "Class 3B",
    message: "Cody Dodson: Where can I read the info for...",
    count: 2,
  },
];

export default function GroupChats() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Group chats</h3>
        <button className="text-indigo-600 text-sm font-medium">View all</button>
      </div>

      <div className="space-y-3">
        {groupChats.map((chat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-xl">
                <MessageSquare size={18} className="text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{chat.name}</p>
                <p className="text-sm text-gray-500">{chat.message}</p>
              </div>
            </div>
            {chat.count > 0 && (
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                {chat.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
