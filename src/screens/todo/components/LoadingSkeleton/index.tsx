import Skeleton from "react-loading-skeleton";

export default function LoadingSkeleton () {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <div
        className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2 mb-2"
        key={i}
      >
        <div className="flex items-center align-center">
          <Skeleton width={20} height={20} circle={true} />
          <div className="flex items-left flex-col ms-2 justify-center">
            <Skeleton width={100} height={20} />
            <Skeleton width={200} height={20} />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton width={20} height={20} circle={true} />
          <Skeleton width={20} height={20} circle={true} />
        </div>
      </div>
    ));
};
