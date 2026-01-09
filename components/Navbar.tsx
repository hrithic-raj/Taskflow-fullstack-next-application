import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-neutral-900 px-6 py-3 border-b border-neutral-800">
      <div className="text-xl font-semibold text-white">
        TaskFlow
      </div>

      <Link
        href="/profile"
        className="h-9 w-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm text-white"
      >
        👤
      </Link>
    </nav>
  );
}
