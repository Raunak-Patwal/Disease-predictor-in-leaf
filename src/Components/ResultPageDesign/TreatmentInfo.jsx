import React from 'react';

/**
 * Displays the disease description and treatment recommendations.
 *
 * @param {object} props - The component props.
 * @param {string} props.description - Description of the disease.
 * @param {Array<string>} props.treatment - Array of treatment recommendations.
 */
function TreatmentInfo({ description, treatment }) {
  return (
    <div className="p-6 mt-8 border rounded-lg bg-white/10 border-white/20">
      <h3 className="mb-4 text-lg font-semibold text-green-300">
        Disease Information
      </h3>
      <p className="mb-6 text-white/90">{description}</p>

      <h4 className="mb-3 text-base font-semibold text-green-200">
        Recommended Treatment:
      </h4>
      <ul className="pl-5 space-y-2 list-disc text-white/80">
        {treatment.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default TreatmentInfo;