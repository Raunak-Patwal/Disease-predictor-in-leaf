import { useParams, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PredictionContext } from "../Components/Fetch/PredictionContext";
import ResultHeader from "../Components/ResultPageDesign/ResultHeader";
import ResultImage from "../Components/ResultPageDesign/ResultImage";
import SeverityCard from "../Components/ResultPageDesign/SeverityCard";
import ImageComparison from "../Components/ResultPageDesign/ImageComparision";
import TreatmentInfo from "../Components/ResultPageDesign/TreatmentInfo";
import SourceLinks from "../Components/ResultPageDesign/SourceLinks";
// import ExportPDFButton from "../Components/ResultPageDesign/ExportPdfButton";
import ShareButton from "../Components/ResultPageDesign/ShareButton";

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
  const [severity, setSeverity] = useState(null);
  const [segmentedImage, setSegmentedImage] = useState(null);

  useEffect(() => {
    if (state?.imageUrl) {
      setImageUrl(state.imageUrl);
      setSeverity(state.severity);
      setSegmentedImage(state.affectedImage);
    } else {
      const found = predictions.find(
        (item) => item.name.toLowerCase().replace(" ", "-") === disease
      );
      if (found) {
        setImageUrl(found.imageUrl);
        setSeverity(found.severity);
        setSegmentedImage(found.affectedImage);
      }
    }
  }, [state, predictions, disease]);

  const data = diseaseInfo[disease];
  if (!data) return <div className="p-6 text-white">Disease not recognized.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="flex-col hidden w-64 p-4 border-r md:flex border-white/20 bg-white/10 backdrop-blur-lg">
          <h2 className="mb-4 text-xl font-bold text-green-300">📜 History</h2>
          {predictions.length === 0 ? (
            <p className="text-white/60">No predictions yet.</p>
          ) : (
            <ul className="space-y-3 text-sm text-white/90">
              {predictions.map((pred) => (
                <li
                  key={pred.id}
                  className={`p-3 flex items-center gap-2 rounded-lg border cursor-pointer ${
                    pred.name.toLowerCase().replace(" ", "-") === disease
                      ? "bg-green-700 text-white font-semibold"
                      : "bg-white/10"
                  }`}
                >
                  <img
                    src={pred.affectedImage}
                    alt="segmented"
                    className="object-cover w-8 h-8 border rounded border-white/20"
                  />
                  <div>
                    <div>{pred.name}</div>
                    <div className="text-xs text-white/70">{pred.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-10">
          <div
            id="result-content"
            className="max-w-5xl p-8 mx-auto border shadow-xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/20"
          >
            <ResultHeader title={data.title} />
            <ResultImage imageUrl={imageUrl} segmentedImage={segmentedImage} />
            <SeverityCard severity={severity} />
            <ImageComparison severity={severity} />
            <TreatmentInfo description={data.description} treatment={data.treatment} />
            <SourceLinks sources={data.sources} />

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              
              <ShareButton />
              <Link to="/predict">
                <button className="px-6 py-3 mt-4 text-white bg-green-600 rounded-xl hover:bg-green-500">
                  🔄 Predict More
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Result;
