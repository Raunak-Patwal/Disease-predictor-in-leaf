import axios from "axios";

const fetchPrediction = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); 
    const response = await axios.post(
      "https://potato-disease-prediction-using-cnn-9.onrender.com/predict",
      formData,
      {
        headers: {
          "x-api-key": "your-secret-api-key"          
        },
      }
    );

    console.log("Prediction Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error.response?.data || error.message);
    return null;
  }
};

export default fetchPrediction;
