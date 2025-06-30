import { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import fetchPrediction from "../Fetch/Fetch";
import fetchSeverity from "../Fetch/FetchSeverity";
import { PredictionContext } from "../Fetch/PredictionContext";

function ImageUpload() {
  const fileInputRef = useRef();
  const webcamRef = useRef();
  const navigate = useNavigate();
  const { predictions, setPredictions } = useContext(PredictionContext);

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    const blob = await fetch(screenshot).then((res) => res.blob());
    const camFile = new File([blob], "captured.jpg", { type: "image/jpeg" });

    setFile(camFile);
    setImagePreview(URL.createObjectURL(camFile));
    setUseCamera(false);
  };

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setImagePreview(URL.createObjectURL(uploadedFile));
  };

  const handlePredict = async () => {
    if (!file) return alert("Please upload or capture an image.");
    setLoading(true);

    try {
      const result = await fetchPrediction(file);
      console.log("🧪 Disease Class:", result.class);

      if (!result?.class) {
        alert("Prediction failed.");
        return;
      }

      const severityData = await fetchSeverity(file);
      const predictionData = {
        id: Date.now(),
        name: result.class,
        date: new Date().toLocaleDateString(),
        imageUrl: imagePreview,
        severity: severityData.severity,
        affectedImage: severityData.affected_image_url || `data:image/png;base64,${severityData.segmentation_mask_base64}`,
      };

      setPredictions([predictionData, ...predictions]);

      navigate(`/result/${result.class.toLowerCase().replace(" ", "-")}`, {
        state: {
          imageUrl: imagePreview,
          severity: predictionData.severity,
          affectedImage: predictionData.affectedImage,
        },
      });
    } catch (err) {
      console.error("❌ Prediction Error:", err);
      alert("An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setImagePreview(null);
    setUseCamera(false);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-6 text-white border shadow-lg border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
      <h2 className="mb-6 text-xl font-bold text-green-200">Upload a Leaf Image</h2>

      <div className="flex flex-col items-center gap-6">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full max-w-sm border shadow-lg rounded-xl border-white/20"
          />
        )}

        {useCamera ? (
          <div className="flex flex-col items-center w-full max-w-sm gap-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-xl"
              videoConstraints={{ facingMode: "environment" }}
            />
            <button
              onClick={capture}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500"
            >
              Capture
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-5 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
              >
                Upload from Device
              </button>

              <button
                onClick={() => setUseCamera(true)}
                className="px-5 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
              >
                Capture from Camera
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={handlePredict}
            disabled={!file || loading}
            className={`px-8 py-3 font-semibold rounded-xl transition ${
              file && !loading
                ? "bg-green-700 hover:bg-green-600 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          <button
            onClick={handleCancel}
            className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
