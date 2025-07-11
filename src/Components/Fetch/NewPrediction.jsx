import { Client } from "@gradio/client";

async function predictPotatoDisease() {
  try {
    // Fetch the example image (replace with your actual image input)
    // If you have a local image, you'll need to read it as a Blob or File.
    // For a local file, you might use FileReader or similar browser APIs.
    // For a Node.js environment, you'd use fs.readFile to get a Buffer and then convert to Blob if needed.
    const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test_/test_image.jpeg"); // Example URL from screenshot
    const exampleImage = await response_0.blob();

    // Connect to the Gradio Space
    const client = await Client.connect("rishab1090/potato6"); // Use the correct space name

    // Make the prediction call
    const result = await client.predict("/predict", {
      image: exampleImage, // Pass your image Blob/File here
    });

    // Log the results
    console.log("Prediction Results:", result.data);

    // Access individual results based on the API's return structure:
    const predictedDisease = result.data[0]; // Output value from "Predicted Disease" Label component
    const classProbabilities = result.data[1]; // Output value from "Class Probabilities" Json component
    const segmentedImage = result.data[2]; // Output value from "Segmented Leaf" Image component (likely a string, e.g., a data URL or path)

    console.log("Predicted Disease:", predictedDisease);
    console.log("Class Probabilities:", classProbabilities);
    console.log("Segmented Image (path/data URL):", segmentedImage);

  } catch (error) {
    console.error("Error during API call:", error);
  }
}


predictPotatoDisease();