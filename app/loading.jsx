export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-bg text-text">
      <div className="flex flex-col items-center gap-4">
        <div className="loader"></div>
        <p className="text-textSoft text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
