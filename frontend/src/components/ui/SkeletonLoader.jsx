import React from 'react';

export const StatCardSkeleton = () => {
  return (
    <div className="dash-card p-5 space-y-4 bg-white animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 bg-[#E2E8F0] rounded w-24"></div>
        <div className="w-7 h-7 bg-[#E2E8F0] rounded-lg"></div>
      </div>
      <div className="h-5 bg-[#E2E8F0] rounded w-3/4"></div>
      <div className="flex items-baseline justify-between pt-2">
        <div className="h-8 bg-[#E2E8F0] rounded w-16"></div>
        <div className="h-4 bg-[#E2E8F0] rounded w-20"></div>
      </div>
      <div className="h-3 bg-[#E2E8F0] rounded w-full pt-2"></div>
      <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3">
        <div className="h-3 bg-[#E2E8F0] rounded w-20"></div>
        <div className="h-3 bg-[#E2E8F0] rounded w-16"></div>
      </div>
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="dash-card p-6 bg-white space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-[#E2E8F0] rounded w-40"></div>
          <div className="h-3 bg-[#E2E8F0] rounded w-60"></div>
        </div>
        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg"></div>
      </div>
      <div className="h-64 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-end p-4 gap-3">
        <div className="h-1/3 bg-[#E2E8F0] flex-1 rounded-t"></div>
        <div className="h-2/3 bg-[#E2E8F0] flex-1 rounded-t"></div>
        <div className="h-1/2 bg-[#E2E8F0] flex-1 rounded-t"></div>
        <div className="h-5/6 bg-[#E2E8F0] flex-1 rounded-t"></div>
        <div className="h-2/5 bg-[#E2E8F0] flex-1 rounded-t"></div>
      </div>
    </div>
  );
};
