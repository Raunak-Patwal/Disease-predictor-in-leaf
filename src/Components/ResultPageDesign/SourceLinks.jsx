function SourceLinks({ sources }) {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-xl font-medium text-green-200">Sources</h2>
      <ul className="space-y-1 text-blue-300 underline list-disc list-inside">
        {sources.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SourceLinks;
