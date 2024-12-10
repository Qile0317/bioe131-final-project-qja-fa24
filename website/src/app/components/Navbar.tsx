import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-800 text-white shadow-lg">
      <Link href="/" className="flex items-center space-x-2">
        <Image 
          src="/globe.svg" 
<<<<<<< HEAD
          alt="Virus Database Logo" 
=======
          alt="Logo" 
>>>>>>> main
          width={40} 
          height={40} 
          className="filter brightness-0 invert"
        />
        <span className="text-xl font-bold text-cyan-300">Virus Database</span>
      </Link>
      <div className="space-x-4">
        <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
<<<<<<< HEAD
        <Link href="/search" className="hover:text-cyan-300 transition-colors">Search</Link>
=======
>>>>>>> main
        <Link href="/about" className="hover:text-cyan-300 transition-colors">About</Link>
        <Link href="/customize" className="hover:text-cyan-300 transition-colors">Customize DB</Link>
      </div>
    </nav>
  );
}
