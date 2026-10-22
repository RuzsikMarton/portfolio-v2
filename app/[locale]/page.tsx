import Link from 'next/link';

export default function Home() {
  return (
    <div className="container px-4 mx-auto">
      <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
      <Link href="/admin" className="text-blue-500 underline">
        Admin Panel
      </Link>
    </div>
  );
}
