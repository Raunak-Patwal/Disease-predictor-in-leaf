import { useRef, useState } from "react";
import Webcam from "react-webcam";

function ImageUpload({ predictions = [], setPredictions = () => {} }) {
  const fileInputRef = useRef();
  const webcamRef = useRef();
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setUseCamera(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePredict = () => {
    if (!image) return alert("Upload or capture an image first.");
    const fakeResult = {
      id: Date.now(),
      name: "Predicted Disease",
      date: new Date().toLocaleDateString(),
    };
    setPredictions([fakeResult, ...predictions]);
  };

  const handleCancel = () => {
    setImage(null);
    setUseCamera(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="p-6 text-white border shadow-lg border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
      <h2 className="mb-6 text-xl font-bold text-green-200">Upload a Leaf Image</h2>

      <div className="flex flex-col items-center gap-6">
        {image && (
          <img
            src={image}
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

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={handlePredict}
            disabled={!image}
            className={`px-8 py-3 font-semibold rounded-xl transition ${
              image
                ? "bg-green-700 hover:bg-green-600 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            Predict
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
