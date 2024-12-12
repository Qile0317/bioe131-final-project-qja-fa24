export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
          About the Virus Sequence Database explorer
        </h1>

        <section className="prose max-w-prose mx-auto text-gray-700">
          <p className="text-lg">
            Welcome to the Virus Sequence Database explorer, a proof-of-concept platform designed to 
            advance research in viral genomics. This resource provides access to a curated 
            collection of virus genome sequences along with rich metadata to support analysis 
            and discovery.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Effortless Search:</strong> Filter virus genomes by detailed metadata fields.</li>
            <li><strong>Customizable Database:</strong> Tailor the database to fit diverse research needs with the cli tool.</li>
            <li><strong>JBrowse Integration:</strong> Visualize genomes interactively with JBrowse2 support.</li>
          </ul>
        </section>

        <footer className="mt-12 text-center text-gray-500">
          <p>
            Built with dedication to support the global scientific community in understanding viral genomics.
          </p>
        </footer>
      </main>
    </div>
  );
}
