export default function Footer() {
    return (
      <footer className="bg-gray-100 p-4 text-center">
        <div className="flex justify-center space-x-4">
          <p>© {new Date().getFullYear()} Annalea Maeder, Juno Lee, Qile Yang</p>
          <a 
            href="https://github.com/Qile0317/bioe131-final-project-qja-fa24" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            Original Repository URL
          </a>
        </div>
      </footer>
    );
}
