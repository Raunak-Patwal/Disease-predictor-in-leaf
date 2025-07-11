import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Sidebar component to display a history of predictions.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.predictions - Array of past prediction objects.
 * @param {string} props.currentDisease - The slug of the currently displayed disease from the URL.
 * @param {function} props.getBlobUrlFromBase64 - Helper function to convert base64 to Blob URL.
 */
function HistorySidebar({ predictions, currentDisease, getBlobUrlFromBase64 }) {
  return (
    <aside className="flex-col hidden w-64 p-4 border-r md:flex border-white/20 bg-white/10 backdrop-blur-lg">
      <h2 className="mb-4 text-xl font-bold text-green-300">📜 History</h2>
      {predictions.length === 0 ? (
        <p className="text-white/60">No predictions yet.</p>
      ) : (
        <ul className="space-y-3 text-sm text-white/90">
          {predictions.map((pred) => {
            const predDiseaseLowerCase = pred.name.toLowerCase().replace(" ", "-");
            const shouldShowThumbnailSegmented = predDiseaseLowerCase !== "nematode" && predDiseaseLowerCase !== "virus" && predDiseaseLowerCase !== "healthy";

            return (
              <li
                key={pred.id}
                className={`p-3 flex items-center gap-2 rounded-lg border cursor-pointer ${
                  predDiseaseLowerCase === currentDisease // Check against current URL disease param
                    ? "bg-green-700 text-white font-semibold"
                    : "bg-white/10"
                }`}
              >
                <Link
                  to={`/result/${predDiseaseLowerCase}`}
                  state={{
                    imageUrl: pred.imageUrl,
                    severity: pred.severity,
                    affectedImage: pred.affectedImage,
                    multiClassPrediction: pred.multiClassPrediction,
                    specificDiseasePrediction: pred.specificDiseasePrediction,
                  }}
                  className="flex items-center w-full gap-2"
                >
                  {pred.imageUrl && (
                    <img
                      src={getBlobUrlFromBase64(pred.imageUrl)} // Use the helper here
                      alt="Original thumbnail"
                      className="object-cover w-8 h-8 border rounded border-white/20"
                    />
                  )}
                  {pred.affectedImage && shouldShowThumbnailSegmented && (
                    <img
                      src={getBlobUrlFromBase64(pred.affectedImage, 'image/png')} // Use the helper here
                      alt="Segmented thumbnail"
                      className="object-cover w-8 h-8 border rounded border-white/20"
                    />
                  )}
                  <div>
                    <div>{pred.name}</div>
                    <div className="text-xs text-white/70">{pred.date}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

export default HistorySidebar;