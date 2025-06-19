import { useParams, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PredictionContext } from "../Components/Fetch/PredictionContext";

const diseaseInfo = {
  "early-blight": {
    title: "Early Blight",
    description:
      "Early blight is a fungal disease caused by *Alternaria solani*. It primarily affects older leaves, forming concentric dark lesions and reducing yield.",
    treatment: [
      "Use certified disease-free seeds.",
      "Apply Mancozeb or Chlorothalonil fungicides early.",
      "Remove plant debris and rotate crops yearly.",
    ],
    sources: [
      "https://www.cabi.org/isc/datasheet/37952",
      "https://www.extension.purdue.edu/extmedia/BP/BP-56-W.pdf",
    ],
  },
  "late-blight": {
    title: "Late Blight",
    description:
      "Late blight is caused by *Phytophthora infestans*. It creates rapidly spreading lesions on leaves, stems, and tubers, leading to major losses.",
    treatment: [
      "Destroy infected plants immediately.",
      "Apply copper-based fungicides during growth.",
      "Avoid overcrowding and use drip irrigation.",
    ],
    sources: [
      "https://www.apsnet.org/edcenter/disandpath/fungalasco/pdlessons/Pages/LateBlight.aspx",
      "https://www.extension.umn.edu/garden/yard-garden/vegetables/late-blight-of-potato-and-tomato/",
    ],
  },
};

function Result() {
  const { disease } = useParams();
  const { state } = useLocation();
  const { predictions } = useContext(PredictionContext);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (state?.imageUrl) {
      setImageUrl(state.imageUrl);
    } else {
      // Fallback: Try finding from context
      const found = predictions.find(
        (item) => item.name.toLowerCase().replace(" ", "-") === disease
      );
      if (found?.imageUrl) {
        setImageUrl(found.imageUrl);
      }
    }
  }, [state, predictions, disease]);

  const data = diseaseInfo[disease];

  if (!data) {
    return <div className="p-6 text-white">Disease not recognized.</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
      {/* Sidebar */}
      <aside className="flex-col hidden w-64 p-4 overflow-y-auto border-r md:flex bg-white/10 backdrop-blur-lg border-white/20">
        <h2 className="mb-4 text-xl font-bold text-green-300">📜 History</h2>
        {predictions.length === 0 ? (
          <p className="text-white/60">No predictions yet.</p>
        ) : (
          <ul className="space-y-3 text-sm text-white/90">
            {predictions.map((pred) => (
              <li
                key={pred.id}
                className={`p-3 rounded-lg border ${
                  pred.name.toLowerCase().replace(" ", "-") === disease
                    ? "bg-green-700 text-white font-semibold"
                    : "bg-white/10"
                }`}
              >
                <div>{pred.name}</div>
                <div className="text-xs text-white/70">{pred.date}</div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl p-8 mx-auto border shadow-xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/20">
          <h1 className="mb-6 text-4xl font-extrabold text-center text-red-400 drop-shadow-lg">
             Detected: {data.title}
          </h1>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded Leaf"
              className="w-full max-w-lg mx-auto mb-8 border shadow-lg rounded-xl border-white/30"
            />
          )}

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold text-green-300"> What is it?</h2>
            <p className="text-lg leading-relaxed text-white/90">{data.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold text-green-300"> How to Treat It</h2>
            <ul className="space-y-2 text-lg list-disc list-inside text-white/90">
              {data.treatment.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-xl font-medium text-green-200"> Sources</h2>
            <ul className="space-y-1 text-blue-300 underline list-disc list-inside">
              {data.sources.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="text-center">
            <Link to="/predict">
              <button className="px-6 py-3 text-lg font-semibold bg-green-600 shadow-md hover:bg-green-500 rounded-xl">
                🔄 Predict More
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Result;
