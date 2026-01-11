import React from "react";

const LoanCardSkeleton = () => {
  return (
    <div className="bg-base-200 rounded-2xl shadow-md overflow-hidden animate-pulse h-full">
      {/* Image */}
      <div className="h-48 bg-base-300" />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="h-4 bg-base-300 rounded w-3/4 mb-3" />
        <div className="h-3 bg-base-300 rounded w-full mb-2" />
        <div className="h-3 bg-base-300 rounded w-5/6 mb-4" />

        <div className="space-y-2 mb-6">
          <div className="h-3 bg-base-300 rounded w-1/2" />
          <div className="h-3 bg-base-300 rounded w-2/3" />
          <div className="h-3 bg-base-300 rounded w-1/3" />
        </div>

        <div className="mt-auto h-10 bg-base-300 rounded-xl" />
      </div>
    </div>
  );
};

export default LoanCardSkeleton;
