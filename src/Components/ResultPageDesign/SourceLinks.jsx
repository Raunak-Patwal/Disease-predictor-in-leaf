import React from 'react';

/**
 * Displays external source links for more information.
 *
 * @param {object} props - The component props.
 * @param {Array<string>} props.sources - Array of source URLs.
 */
function SourceLinks({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="p-6 mt-8 border rounded-lg bg-white/10 border-white/20">
      <h3 className="mb-4 text-lg font-semibold text-green-300">
        Additional Resources
      </h3>
      <ul className="pl-5 space-y-2 list-disc text-white/80">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              {source}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SourceLinks;