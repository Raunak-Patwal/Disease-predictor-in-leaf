// In Fetchmulticlass.jsx
import axios from "axios";

const fetchmulticlass = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://rishab1090-multi.hf.space/predict", // <-- CORRECTED URL
      formData,
      {
        headers: {
          "x-api-key": "mysecretkey"
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

export default fetchmulticlass;