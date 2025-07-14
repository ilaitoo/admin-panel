export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 animate-fade-in">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-xl font-medium">Loading, please wait...</p>
      </div>
    </>
  );
}
