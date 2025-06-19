import { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import fetchPrediction from "../Fetch/Fetch";
import { useNavigate } from "react-router-dom";
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

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      fetch(screenshot)
        .then((res) => res.blob())
        .then((blob) => {
          const fileFromCam = new File([blob], "captured.jpg", { type: "image/jpeg" });
          setFile(fileFromCam);
          setImagePreview(URL.createObjectURL(fileFromCam));
          setUseCamera(false);
        });
    }
  };

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setImagePreview(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };

  const handlePredict = async () => {
    if (!file) return alert("Please upload or capture an image.");
    setLoading(true);

    const result = await fetchPrediction(file);

    if (result?.class) {
      const predictionData = {
        id: Date.now(),
        name: result.class,
        date: new Date().toLocaleDateString(),
        imageUrl: imagePreview,
      };

      const updated = [predictionData, ...predictions];
      setPredictions(updated);

      navigate(`/result/${result.class.toLowerCase().replace(" ", "-")}`, {
        state: { imageUrl: imagePreview },
      });
    } else {
      alert("Prediction failed. Try again.");
    }

    setLoading(false);
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
