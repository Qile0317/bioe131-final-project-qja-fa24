export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          About Virus Genome Database
        </h1>
        
        <div className="prose max-w-prose mx-auto">
          <p>
            This proof-of-concept database provides a collection of virus genome 
            sequences and associated metadata. Our goal is to facilitate 
            research and understanding of viral genomics.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Features
          </h2>
          <ul>
            <li>Search virus genomes by sequence or metadata</li>
            <li>Genome file and annotation storage</li>
            <li>Flexible database customization</li>
            <li>Integration with JBrowse for genome visualization</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
