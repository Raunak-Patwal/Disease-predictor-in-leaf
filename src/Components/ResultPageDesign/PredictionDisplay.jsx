import React from 'react';
import ResultImage from './ResultImage';
import SeverityCard from './SeverityCard';
import ImageComparison from './ImageComparision';


/**
 * Displays the main prediction visuals: original image, segmented image, and severity card/comparison.
 *
 * @param {object} props - The component props.
 * @param {string} props.originalImageUrl - URL for the original uploaded image.
 * @param {string | null} props.segmentedImageUrl - URL for the segmented image (or null if not applicable).
 * @param {object | null} props.severity - Severity data (or null if not applicable).
 */
function PredictionDisplay({ originalImageUrl, segmentedImageUrl, severity }) {
  // Determine if severity/segmentation/graph should be shown based on severity presence
  const shouldShowSeverityAndComparison = severity !== null;

  return (
    <>
      <ResultImage
        imageUrl={originalImageUrl}
        segmentedImage={shouldShowSeverityAndComparison ? segmentedImageUrl : null}
      />

      {shouldShowSeverityAndComparison && severity && (
        <>
          <SeverityCard severity={severity} />
          {/* Note: ImageComparison might need more props if its logic isn't fully self-contained */}
          <ImageComparison severity={severity} />
        </>
      )}
    </>
  );
}

export default PredictionDisplay;