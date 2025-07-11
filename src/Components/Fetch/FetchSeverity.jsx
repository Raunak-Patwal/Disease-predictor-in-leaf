import axios from "axios";

const fetchSeverity = async (file) => {
  try { 
    const formData = new FormData();
    formData.append("file", file); 

    const response = await axios.post(
      "https://rishab1090-potato2.hf.space/predict_severity",
      formData,
      {
        headers: {
          "x-api-key": "your-secret-api-key",
        }
      }
    );

    console.log("Severity API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error(" Error fetching severity:", error.message);
    console.log(" Full error response:", JSON.stringify(error.response?.data?.detail, null, 2));
    return {
      severity: "Unknown",
      affected_image_url: null
    };
  }
};

export default fetchSeverity;
