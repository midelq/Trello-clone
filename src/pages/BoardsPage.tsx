import React from 'react';

export default function BoardsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Boards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Here will be a list of boards   */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Sample Board</h2>
          <p className="text-gray-600 mt-2">This is a sample board</p>
        </div>
      </div>
    </div>
  );
}
