import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-xl text-gray-700">사주를 분석하고 있습니다...</p>
      </div>
    </div>
  );
};