// ../Components/ResultPageDesign/ResultImage.js
import { useRef } from "react";

function ResultImage({ imageUrl, segmentedImage }) {
  const segmentedRef = useRef(null);
  const originalRef = useRef(null);

  const downloadImage = (imgElement, filename) => {
    if (!imgElement || !imgElement.src) {
      alert("⚠️ Image not available for download.");
      return;
    }

    if (imgElement.src.startsWith('data:image/') || imgElement.src.startsWith('blob:')) {
      const link = document.createElement("a");
      link.href = imgElement.src;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgElement, 0, 0);

      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, "image/png");
    }
  };

  // Determine if only one image is displayed to apply centering
  const isSingleImage = imageUrl && !segmentedImage;

  return (
    // Conditional class based on whether it's a single image or two
    <div className={`flex flex-wrap gap-6 mb-10 ${isSingleImage ? 'justify-center' : 'justify-center md:justify-around'}`}>
      {/* Original Image */}
      {imageUrl && (
        <div className="flex flex-col items-center p-4 border shadow-lg rounded-xl bg-white/5 border-white/20">
          <h3 className="mb-2 text-lg font-semibold text-green-300">Original Image</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            ref={originalRef}
            className="mb-3 rounded-xl max-w-full h-auto max-h-[400px]" // Added max-h to prevent overly tall images
          />
          <button
            onClick={() =>
              downloadImage(originalRef.current, "original-image.png")
            }
            className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-500"
          >
            ⬇️ Download Original
          </button>
        </div>
      )}

      {/* Segmented Image */}
      {segmentedImage && (
        <div className="flex flex-col items-center p-4 border shadow-lg rounded-xl bg-white/5 border-white/20">
          <h3 className="mb-2 text-lg font-semibold text-red-300">Segmented (Affected Area)</h3>

          <div className="relative mb-3">
            <img
              src={segmentedImage}
              ref={segmentedRef}
              alt="Segmented"
              className="relative z-10 rounded-xl max-w-full h-auto max-h-[400px]" // Added max-h
            />
            <div className="absolute inset-0 z-0 pointer-events-none rounded-xl bg-red-500/20 blur-md animate-pulse-slow"></div>
          </div>

          <button
            onClick={() => downloadImage(segmentedRef.current, "segmented-image.png")}
            className="px-4 py-2 mt-10 text-sm text-white bg-red-600 rounded hover:bg-red-500"
          >
            ⬇️ Download Segmented
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultImage;