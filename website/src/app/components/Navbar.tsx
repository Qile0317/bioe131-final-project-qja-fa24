import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image 
          src="/globe.svg" 
          alt="Virus Database Logo" 
          width={40} 
          height={40} 
        />
        <span className="text-xl font-bold text-blue-700">Virus Database</span>
      </Link>
      <div className="space-x-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/search" className="hover:text-blue-600">Search</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <Link href="/customize" className="hover:text-blue-600">Customize DB</Link>
      </div>
    </nav>
  );
}
