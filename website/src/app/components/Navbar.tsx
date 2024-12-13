import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-800 text-white shadow-lg">
      <Link href="/" className="flex items-center space-x-2">
        <Image 
          src={process.env.NEXT_PUBLIC_BASE_PATH + '/logo.png'}
          alt="Logo" 
          width={40} 
          height={40} 
          className="filter brightness-0 invert"
        />
        <span className="text-xl font-bold text-cyan-300">Virus Database Explorer</span>
      </Link>
      <div className="space-x-4">
        <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
        <Link href="/about" className="hover:text-cyan-300 transition-colors">About</Link>
        <Link 
          href="https://github.com/Qile0317/bioe131-final-project-qja-fa24/blob/main/README.md" 
          className="hover:text-cyan-300 transition-colors" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Docs
        </Link>
      </div>
    </nav>
  );
}
