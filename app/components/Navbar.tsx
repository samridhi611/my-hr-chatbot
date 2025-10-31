'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleNewChat = () => {
    // router.refresh(); // refreshes current page data and state
    // OR simply reload:
    window.location.reload();
  };
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-1">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SK Finance Logo"
              height={50}
              width={45}
              className="h-[60px] w-[58px]"
            />
          </div>
        </Link>

        <button className="px-5 py-2 text-white bg-[#002d72] rounded-[4px] cursor-pointer" onClick={() => handleNewChat()}>
          {" "}
          New Chat{" "}
        </button>
      </div>
    </header>
  );
}
