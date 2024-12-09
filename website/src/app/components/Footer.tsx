export default function Footer() {
    return (
      <footer className="bg-slate-800 p-4 text-center text-white">
        <div className="flex justify-center space-x-4 items-center">
          <p className="text-gray-300">© {new Date().getFullYear()} Annalea Maeder, Juno Lee, Qile Yang</p>
          <a 
            href="https://github.com/your-repo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-300 hover:underline hover:text-cyan-200 transition-colors"
          >
            Original Repository
          </a>
        </div>
      </footer>
    );
  }
  