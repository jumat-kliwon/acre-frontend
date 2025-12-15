export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Landing Page</h1>
      <a
        href="/member/dashboard"
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Masuk Member
      </a>
    </div>
  );
}
