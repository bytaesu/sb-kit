import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Sandbox <span>| sb-kit</span>
        </h1>

        <Link href="/signin" passHref>
          <button className=" px-6 py-3 rounded-xl shadow-lg bg-blue-300  hover:bg-blue-200 active:scale-95 transition-all">
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
}
