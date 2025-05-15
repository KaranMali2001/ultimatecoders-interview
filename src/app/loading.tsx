export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-black text-white py-6 px-4">
      {/* Header skeleton */}
      <div className="max-w-screen-xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-6">
          {/* Logo skeleton */}
          <div className="h-8 w-48 bg-gray-800 rounded-md animate-pulse"></div>

          {/* Search bar skeleton */}
          <div className="h-10 w-72 bg-gray-800 rounded-full animate-pulse hidden sm:block"></div>
        </div>

        {/* Filter buttons skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-8 w-28 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-8 w-28 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-8 w-28 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-800 rounded-full animate-pulse"></div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-6 w-12 bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-800 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Movie grid skeleton */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate 6 movie card skeletons */}
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
              {/* Movie poster skeleton */}
              <div className="aspect-video w-full bg-gray-800 animate-pulse relative">
                {/* Action buttons skeleton */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Content skeleton */}
              <div className="p-4">
                {/* Title and rating skeleton */}
                <div className="flex justify-between items-center mb-2">
                  <div className="h-6 w-36 bg-gray-800 rounded-md animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-800 rounded-md animate-pulse"></div>
                </div>

                {/* Year & genre skeleton */}
                <div className="h-5 w-48 bg-gray-800 rounded-md animate-pulse mb-4"></div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded-md animate-pulse"></div>
                </div>

                {/* Watch Now button skeleton */}
                <div className="h-12 w-full bg-pink-900 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
