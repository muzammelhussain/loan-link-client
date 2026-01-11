const LoanCardSkeleton = () => {
  return (
    <div className="border rounded-xl shadow-sm bg-base-100 animate-pulse overflow-hidden">
      <div className="h-44 bg-base-300" />

      <div className="p-4 space-y-3">
        <div className="h-4 bg-base-300 rounded w-3/4" />
        <div className="h-3 bg-base-300 rounded w-full" />
        <div className="h-3 bg-base-300 rounded w-5/6" />

        <div className="space-y-2 pt-2">
          <div className="h-3 bg-base-300 rounded w-1/2" />
          <div className="h-3 bg-base-300 rounded w-2/3" />
          <div className="h-3 bg-base-300 rounded w-1/3" />
        </div>

        <div className="h-9 bg-base-300 rounded mt-4" />
      </div>
    </div>
  );
};

export default LoanCardSkeleton;
