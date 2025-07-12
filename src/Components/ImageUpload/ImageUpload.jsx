import { useRef, useState, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import fetchPrediction from "../Fetch/Fetch";
import fetchSeverity from "../Fetch/FetchSeverity";
import { PredictionContext } from "../Fetch/PredictionContext";
import { Client } from "@gradio/client";

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function ImageUpload() {
  const fileInputRef = useRef();
  const webcamRef = useRef();
  const navigate = useNavigate();
  const { predictions, setPredictions } = useContext(PredictionContext);

  const [imagePreviewBase64, setImagePreviewBase64] = useState(null);
  const [file, setFile] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreviewBase64) {
        // Clean up if needed
      }
    };
  }, [imagePreviewBase64]);

  const capture = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;
    const blob = await fetch(screenshot).then((res) => res.blob());
    const camFile = new File([blob], "captured.jpg", { type: "image/jpeg" });

    if (imagePreviewBase64) setImagePreviewBase64(null);
    setFile(camFile);
    const base64 = await fileToBase64(camFile);
    setImagePreviewBase64(base64);
    setUseCamera(false);
  };

  const handleUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    if (imagePreviewBase64) setImagePreviewBase64(null);
    setFile(uploadedFile);
    const base64 = await fileToBase64(uploadedFile);
    setImagePreviewBase64(base64);
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload or capture an image.");
      return;
    }
    setLoading(true);

    let finalDiseaseName = null;
    let multiClassResult = null;
    let specificDiseasePrediction = null;
    let severityData = null;
    let gradioSegmentedImageBase64 = null;
    let predictionSource = "gradio";

    try {
      const client = await Client.connect("rishab1090/potato6");
      const gradioResult = await client.predict("/predict", { image: file });

      const gradioPredictedDiseaseLabel = gradioResult.data[0]?.label;
      const gradioProbabilities = gradioResult.data[1];
      const gradioImageObject = gradioResult.data[2];

      if (gradioImageObject?.url) {
        if (gradioImageObject.url.startsWith("data:image/")) {
          gradioSegmentedImageBase64 = gradioImageObject.url;
        } else {
          const response = await fetch(gradioImageObject.url);
          if (response.ok) {
            const blob = await response.blob();
            gradioSegmentedImageBase64 = await fileToBase64(blob);
          }
        }
      }

      multiClassResult = {
        prediction: gradioPredictedDiseaseLabel,
        probabilities: gradioProbabilities,
      };

      // *** MODIFICATION START ***
      const primaryCategory = (gradioPredictedDiseaseLabel || "").toLowerCase();

      // Conditionally call fetchPrediction only for "fungi" or "phytophthora"
      if (primaryCategory === "fungi" || primaryCategory === "phytophthora") {
        specificDiseasePrediction = await fetchPrediction(file);
        // If specific prediction is successful, use it as final disease name and source
        if (specificDiseasePrediction?.class) {
          finalDiseaseName = specificDiseasePrediction.class;
          predictionSource = "secondary";
        } else {
          // Fallback to gradio prediction if specific prediction fails or is not found
          finalDiseaseName = gradioPredictedDiseaseLabel;
          predictionSource = "gradio";
        }
      } else {
        // For "nematode", "virus", "healthy", "early-blight", "late-blight" (if they are
        // directly returned by Gradio and not refined by fetchPrediction),
        // or any other category, use the Gradio prediction directly.
        finalDiseaseName = gradioPredictedDiseaseLabel;
        predictionSource = "gradio";
      }

      // Call fetchSeverity for all cases where severity makes sense
      // (excluding healthy, virus, nematode as per your Result component's logic)
      if (primaryCategory !== "nematode" && primaryCategory !== "virus" && primaryCategory !== "healthy") {
          severityData = await fetchSeverity(file);
      } else {
          severityData = null; // Ensure severity is null for these categories
      }
      // *** MODIFICATION END ***


      let finalAffectedImageForState = null;
      if (severityData?.affected_image_url?.startsWith("data:image/")) {
        finalAffectedImageForState = severityData.affected_image_url;
      } else if (severityData?.segmentation_mask_base64) {
        finalAffectedImageForState = `data:image/png;base64,${severityData.segmentation_mask_base64}`;
      } else if (gradioSegmentedImageBase64) {
        finalAffectedImageForState = gradioSegmentedImageBase64;
      }

      if (!finalDiseaseName) {
        alert("Could not determine a valid disease name.");
        setLoading(false);
        return;
      }

      const predictionData = {
        id: Date.now(),
        name: finalDiseaseName,
        date: new Date().toLocaleDateString(),
        imageUrl: imagePreviewBase64,
        severity: severityData?.severity || null,
        affectedImage: finalAffectedImageForState,
        multiClassPrediction: multiClassResult,
        specificDiseasePrediction,
        source: predictionSource,
      };

      setPredictions([predictionData, ...predictions]);

      navigate(`/result/${finalDiseaseName.toLowerCase().replace(" ", "-")}`, {
        state: {
          imageUrl: predictionData.imageUrl,
          severity: predictionData.severity,
          affectedImage: predictionData.affectedImage,
          multiClassPrediction: predictionData.multiClassPrediction,
          specificDiseasePrediction: predictionData.specificDiseasePrediction,
        },
      });
    } catch (err) {
      console.error("❌ Prediction Error:", err);
      if (err.message.includes("Network Error") || err.message.includes("CORS")) {
        alert("CORS or Network issue. Check backend server.");
      } else {
        alert("Prediction error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setImagePreviewBase64(null);
    setUseCamera(false);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-6 text-white border shadow-lg border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
      <h2 className="mb-6 text-xl font-bold text-green-200">Upload a Leaf Image</h2>
      <div className="flex flex-col items-center gap-6">
        {imagePreviewBase64 && (
          <img
            src={imagePreviewBase64}
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