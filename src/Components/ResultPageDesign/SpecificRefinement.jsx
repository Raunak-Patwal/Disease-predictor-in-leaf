import React from 'react';

/**
 * Displays refined classification if applicable (e.g., Fungi -> Early Blight).
 *
 * @param {object} props - The component props.
 * @param {string} props.disease - The current disease slug from the URL.
 * @param {object | null} props.multiClassPrediction - The initial broad classification data.
 * @param {object | null} props.specificDiseasePrediction - The refined specific disease data.
 */
function SpecificRefinement({ disease, multiClassPrediction, specificDiseasePrediction }) {
  // Logic to determine if this section should be displayed
  const shouldShowRefinement =
    specificDiseasePrediction &&
    specificDiseasePrediction.class &&
    specificDiseasePrediction.class.toLowerCase().replace(" ", "-") !== disease && // Only show if it's a *different* specific refinement
    (
      (multiClassPrediction?.prediction?.toLowerCase() === 'fungi' && specificDiseasePrediction.class.toLowerCase().replace(" ", "-") === 'early-blight') ||
      (multiClassPrediction?.prediction?.toLowerCase() === 'phytophthora' && specificDiseasePrediction.class.toLowerCase().replace(" ", "-") === 'late-blight')
    );

  if (!shouldShowRefinement) {
    return null;
  }

  return (
    <div className="p-6 mt-8 border rounded-lg bg-white/10 border-white/20">
      <h3 className="mb-4 text-lg font-semibold text-green-300">
        Refined Classification
      </h3>
      <p className="text-white/90">
        The initial classification was further refined to:
        <span className="ml-2 font-bold text-green-200">
          {specificDiseasePrediction.class}
        </span>
        {specificDiseasePrediction.confidence && (
          <span className="ml-2 text-white/70">
            {" "}
            (Confidence:
            {(specificDiseasePrediction.confidence * 100).toFixed(2)}%)
          </span>
        )}
      </p>
    </div>
  );
}

export default SpecificRefinement;