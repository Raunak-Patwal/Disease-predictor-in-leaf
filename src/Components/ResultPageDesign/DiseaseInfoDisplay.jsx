import React from 'react';
// Assuming TreatmentInfo and SourceLinks are still separate components you have
import TreatmentInfo from './TreatmentInfo';
import SourceLinks from './SourceLinks';

/**
 * Displays the disease description, treatment recommendations, and source links.
 *
 * @param {object} props - The component props.
 * @param {string} props.description - Description of the disease.
 * @param {Array<string>} props.treatment - Array of treatment recommendations.
 * @param {Array<string>} props.sources - Array of source URLs.
 */
function DiseaseInfoDisplay({ description, treatment, sources }) {
  return (
    <>
      {/* Assuming TreatmentInfo has its own internal heading */}
      <TreatmentInfo description={description} treatment={treatment} />

      {/* Assuming SourceLinks has its own internal heading and conditional rendering */}
      {sources && sources.length > 0 && (
        <SourceLinks sources={sources} />
      )}
    </>
  );
}

export default DiseaseInfoDisplay;