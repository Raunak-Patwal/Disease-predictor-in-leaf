// src/pages/Result.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { PredictionContext } from "../Components/Fetch/PredictionContext";

import ResultHeader from "../Components/ResultPageDesign/ResultHeader";
import PredictionDisplay from "../Components/ResultPageDesign/PredictionDisplay";
import SpecificRefinement from "../Components/ResultPageDesign/SpecificRefinement";
import DiseaseInfoDisplay from "../Components/ResultPageDesign/DiseaseInfoDisplay";
import ActionButtons from "../Components/ResultPageDesign/ActionButtons";
import HistorySidebar from "../Components/ResultPageDesign/HistorySidebar";
import ProbabilityChart from "../Components/ResultPageDesign/ProbabilityCharts";

// Chart.js imports and registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- Helper function to create Blob URL from Base64 ---
const getBlobUrlFromBase64 = (base64String, contentType = 'image/jpeg') => {
  if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:image/')) {
    console.warn("getBlobUrlFromBase64 received a string that is not a data:image/ URL or is empty:", base64String);
    return base64String;
  }
  try {
    const base64 = base64String.split(',')[1];
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const typeMatch = base64String.match(/^data:(.*?);base64,/);
    const actualContentType = typeMatch ? typeMatch[1] : contentType;
    const blob = new Blob([byteArray], { type: actualContentType });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error("Error converting base64 to blob URL in Result:", e);
    return null;
  }
};

// --- diseaseInfo Data (updated for clarity on generic vs. specific) ---
// IMPORTANT: You'll need to populate this with genuinely correct and detailed information.
const diseaseInfo = {
  "early-blight": {
    title: "Early Blight",
    description: "Early blight is a common fungal disease of tomatoes and potatoes, caused by the fungus *Alternaria solani*. It typically appears first on older leaves as small, dark spots with concentric rings, often surrounded by a yellow halo. Severe infection can lead to leaf drop, reduced vigor, and significant yield loss.",
    treatment: [
      "Use certified disease-free seeds and transplants.",
      "Practice good sanitation: remove and destroy infected plant debris, especially at the end of the season.",
      "Ensure proper plant spacing and prune lower leaves to improve air circulation and reduce humidity.",
      "Avoid overhead irrigation; water at the base of plants or use drip irrigation.",
      "Apply fungicides preventatively or at the first sign of symptoms. Effective fungicides include those containing chlorothalonil, mancozeb, or azoxystrobin. Always follow label instructions.",
      "Practice crop rotation with non-solanaceous crops (e.g., corn, beans) for at least 2-3 years to reduce pathogen buildup in the soil.",
    ],
    sources: [
      "https://www.cabi.org/isc/datasheet/37952",
      "https://www.extension.purdue.edu/extmedia/BP/BP-56-W.pdf",
      "https://extension.umn.edu/plant-diseases/early-blight-tomato-and-potato",
    ],
  },
  "late-blight": {
    title: "Late Blight",
    description: "Late blight is a notoriously destructive disease primarily affecting potatoes and tomatoes, caused by the oomycete *Phytophthora infestans*. It can spread rapidly under cool, wet conditions, causing large, water-soaked, irregular lesions on leaves that quickly turn brown or black. A fuzzy white mold may be visible on the underside of infected leaves, especially in humid conditions. This disease can decimate crops within days.",
    treatment: [
      "Strict sanitation is paramount: remove and destroy all infected plants and tubers immediately. Do not compost diseased material.",
      "Apply fungicides proactively, especially during periods of cool, wet weather, as recommended by local agricultural advisories. Products containing copper, propamocarb, or dimethomorph can be effective. Rotate fungicide classes to prevent resistance.",
      "Improve air circulation by proper plant spacing and staking.",
      "Avoid overhead irrigation to keep foliage dry. Water early in the day to allow leaves to dry before nightfall.",
      "Use resistant varieties if available in your region, though new pathogen strains can overcome resistance.",
      "Eliminate volunteer potato plants from previous seasons, as they can harbor the pathogen.",
    ],
    sources: [
      "https://www.apsnet.org/edcenter/disandpath/fungalasco/pdlessons/Pages/LateBlight.aspx",
      "https://www.extension.umn.edu/garden/yard-garden/vegetables/late-blight-of-potato-and-tomato/",
      "https://www.agric.wa.gov.au/potatoes/late-blight-potatoes",
    ],
  },
  "phytophthora": {
    title: "Phytophthora (General Oomycete Infection)",
    description: "Phytophthora refers to a genus of destructive plant pathogens known as water molds (oomycetes), not true fungi. They thrive in overly wet or waterlogged soil conditions and can cause various diseases including root rots, crown rots, blights (like Late Blight), and damping-off. Symptoms often include wilting, yellowing leaves, stunted growth, and eventual plant collapse due to root damage.",
    treatment: [
      "Improve soil drainage dramatically: use raised beds, incorporate organic matter (if soil is clayey), or select well-drained planting sites.",
      "Avoid overwatering; ensure soil dries out between waterings. Use drip irrigation instead of overhead watering where possible.",
      "Plant resistant varieties if available for your specific crop and region.",
      "Remove and destroy infected plants and surrounding soil immediately to prevent spread. Do not replant susceptible crops in affected areas.",
      "Fungicides specifically designed for oomycetes (e.g., containing propamocarb, fosetyl-al, or mefenoxam) can be applied preventatively or as a treatment, strictly following label instructions. Note: many common fungicides for true fungi are ineffective against Phytophthora.",
      "Practice strict sanitation for tools and equipment.",
    ],
    sources: [
      "https://www.cabi.org/isc/datasheet/40669",
      "https://extension.psu.edu/phytophthora-root-rot-and-blight-of-woody-ornamentals",
      "https://www.gardeningknowhow.com/plant-problems/disease/phytophthora-root-rot.htm",
    ],
  },
  "fungi": {
    title: "General Fungal Infection",
    description: "This indicates a broad fungal infection. Fungi are diverse plant pathogens causing a wide array of symptoms such as leaf spots, powdery mildew, rusts, wilts, and damping-off. While specific identification requires further analysis, general fungal management practices can help mitigate damage.",
    treatment: [
      "Improve air circulation around plants by ensuring proper spacing and judicious pruning.",
      "Avoid overhead watering; water plants at the base to keep foliage dry.",
      "Remove and promptly destroy (do not compost) infected plant parts to prevent disease spread.",
      "Consider using broad-spectrum fungicides as a preventative or curative measure, always adhering to product label instructions.",
      "Ensure good garden hygiene: clean tools, remove weeds, and clear plant debris.",
      "Improve soil health and drainage to reduce fungal conducive environments.",
    ],
    sources: [
      "https://www.rhs.org.uk/disease/fungal-diseases",
      "https://extension.psu.edu/managing-fungal-diseases-in-the-garden",
      "https://www.plantura.garden/advice/plant-care/plant-fungus",
    ],
  },
  "healthy": {
    title: "Healthy Plant",
    description: "Your plant appears to be thriving with no visible signs of disease. This indicates optimal growing conditions and successful care practices. Consistent monitoring and continued good care will ensure its ongoing health and productivity.",
    treatment: [
      "Maintain consistent, appropriate watering based on plant needs and environmental conditions.",
      "Ensure adequate sunlight exposure and balanced nutrient supply through regular fertilization.",
      "Implement proactive pest management strategies and regularly inspect for early signs of stress or disease.",
      "Practice good garden hygiene, keeping the area free of weeds, pests, and decaying plant material.",
      "Consider preventative measures like selecting disease-resistant varieties for future plantings.",
    ],
    sources: [], // No external sources for 'healthy' status
  },
  "nematode": {
    title: "Nematode Infection",
    description: "Nematodes are microscopic roundworms that inhabit soil and can cause significant damage to plant roots, often leading to symptoms above ground such as stunted growth, wilting, yellowing (chlorosis), and reduced yields. Root-knot nematodes, for example, cause characteristic swellings or galls on roots, impairing water and nutrient uptake.",
    treatment: [
      "Use nematode-resistant or tolerant plant varieties specific to your crop and region.",
      "Practice strict crop rotation: rotate with non-host crops (e.g., grains, marigolds, or specific cover crops) for several seasons to starve out nematode populations.",
      "Solarization: Heat soil using clear plastic sheeting during hot periods to reduce nematode populations in small garden areas.",
      "Incorporate abundant organic matter (e.g., compost, well-rotted manure) into the soil to enhance beneficial microbial activity, which can suppress nematode populations.",
      "Maintain plant vigor: Healthy plants are more tolerant of nematode damage. Ensure adequate water and nutrients.",
      "In severe infestations, consider biological nematicides containing beneficial fungi or bacteria. Chemical nematicides are typically a last resort, require careful application, and may be restricted.",
    ],
    sources: [
      "https://extension.uga.edu/publications/detail.html?number=C1045",
      "https://www.aces.edu/blog/topics/crop-production/nematode-management/",
      "https://ipm.ucanr.edu/PMG/r605400111.html",
    ],
  },
  "virus": {
    title: "Viral Infection",
    description: "Plant viral diseases are caused by obligate parasitic viruses that multiply only within living plant cells. Symptoms vary widely but commonly include mosaic patterns, mottling, yellowing, leaf distortion (curling, crinkling), stunting, and reduced fruit quality. Viruses are often spread by insect vectors (aphids, whiteflies), contaminated tools, or infected propagation material, and there is generally no cure for an infected plant.",
    treatment: [
      "Immediately remove and destroy (bag and discard, do not compost) any infected plants to prevent the spread of the virus.",
      "Control insect vectors that transmit viruses using appropriate insecticides, biological controls, or physical barriers.",
      "Use certified virus-free seeds, seedlings, or propagation material.",
      "Practice stringent sanitation: regularly clean gardening tools with a bleach solution (10% bleach, 90% water) or rubbing alcohol after use on each plant, especially if a viral infection is suspected. Wash hands thoroughly.",
      "Plant virus-resistant varieties if available for your specific crop and prevalent viruses in your area.",
      "Avoid handling healthy plants after touching infected ones.",
    ],
    sources: [
      "https://www.apsnet.org/edcenter/disandpath/viral/Pages/default.aspx",
      "https://www.rhs.org.uk/disease/virus-diseases-plants",
      "https://www.ndsu.edu/agriculture/extension/pubs/plant-diseases/plant-viruses",
    ],
  },
};


function Result() {
  const { disease } = useParams();
  const { state } = useLocation();
  const { predictions } = useContext(PredictionContext);

  const [displayImageUrl, setDisplayImageUrl] = useState(null);
  const [displaySegmentedImage, setDisplaySegmentedImage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [multiClassPrediction, setMultiClassPrediction] = useState(null);
  const [specificDiseasePrediction, setSpecificDiseasePrediction] = useState(null);
  const [predictionProbabilities, setPredictionProbabilities] = useState(null);

  // Use a ref to store the previous severity to prevent unnecessary updates if it's an object
  const prevSeverityRef = useRef();

  const shouldShowSeverityAndGraph =
    disease !== "nematode" && disease !== "virus" && disease !== "healthy";

  useEffect(() => {
    let currentPrediction = null;

    if (state?.imageUrl) {
      currentPrediction = state;
    } else {
      currentPrediction = predictions.find(
        (item) => item.name.toLowerCase().replace(" ", "-") === disease
      );
    }

    if (currentPrediction) {
      // --- IMPORTANT: Deep comparison for severity to prevent infinite re-renders ---
      const newSeverity = currentPrediction.severity;
      if (JSON.stringify(newSeverity) !== JSON.stringify(prevSeverityRef.current)) {
        setSeverity(newSeverity);
        prevSeverityRef.current = newSeverity; // Update the ref with the new value
      }

      setMultiClassPrediction(currentPrediction.multiClassPrediction);
      setSpecificDiseasePrediction(currentPrediction.specificDiseasePrediction);

      // --- Optimized Blob URL handling without self-referencing dependencies in the main effect ---
      const newImageUrl = currentPrediction.imageUrl ? getBlobUrlFromBase64(currentPrediction.imageUrl) : null;
      if (newImageUrl !== displayImageUrl) { // Only update if the URL actually changed
        if (displayImageUrl && displayImageUrl.startsWith('blob:')) {
          URL.revokeObjectURL(displayImageUrl); // Revoke old URL before setting new one
        }
        setDisplayImageUrl(newImageUrl);
      }

      const newSegmentedUrl = (shouldShowSeverityAndGraph && currentPrediction.affectedImage)
        ? getBlobUrlFromBase64(currentPrediction.affectedImage, 'image/png')
        : null;

      if (newSegmentedUrl !== displaySegmentedImage) { // Only update if the URL actually changed
        if (displaySegmentedImage && displaySegmentedImage.startsWith('blob:')) {
          URL.revokeObjectURL(displaySegmentedImage); // Revoke old URL before setting new one
        }
        setDisplaySegmentedImage(newSegmentedUrl);
      }

      // Determine which probabilities to display
      if (currentPrediction.multiClassPrediction?.probabilities) {
        setPredictionProbabilities(currentPrediction.multiClassPrediction.probabilities);
      } else if (currentPrediction.specificDiseasePrediction?.probabilities) {
        setPredictionProbabilities(currentPrediction.specificDiseasePrediction.probabilities);
      } else {
        setPredictionProbabilities(null);
      }
    } else {
      console.warn("No prediction data found for current disease in state or context. Displaying loading or fallback.");
      // Ensure all states are reset when no prediction is found
      if (displayImageUrl) { URL.revokeObjectURL(displayImageUrl); }
      if (displaySegmentedImage) { URL.revokeObjectURL(displaySegmentedImage); }
      setDisplayImageUrl(null);
      setDisplaySegmentedImage(null);
      setSeverity(null);
      setMultiClassPrediction(null);
      setSpecificDiseasePrediction(null);
      setPredictionProbabilities(null);
      prevSeverityRef.current = null; // Also reset the ref
    }

    // --- Cleanup function for when the component unmounts ---
    return () => {
      // These checks are for when the component itself unmounts.
      if (displayImageUrl && displayImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(displayImageUrl);
      }
      if (displaySegmentedImage && displaySegmentedImage.startsWith('blob:')) {
        URL.revokeObjectURL(displaySegmentedImage);
      }
    };
    // CRITICAL: Removed displayImageUrl, displaySegmentedImage from dependencies.
    // The internal checks (newImageUrl !== displayImageUrl) and the prevSeverityRef handle updates.
  }, [state, predictions, disease, shouldShowSeverityAndGraph]); // <--- THIS IS THE CORRECTED DEPENDENCY ARRAY


  // --- Determine the most accurate disease name to display and fetch its info ---
  const infoFromDiseaseInfo = diseaseInfo[disease];

  let actualPredictionName = "Analyzing...";

  if (multiClassPrediction?.prediction && multiClassPrediction.prediction.toLowerCase().replace(" ", "-") === disease) {
    actualPredictionName = multiClassPrediction.prediction;
  } else if (specificDiseasePrediction?.class && specificDiseasePrediction.class.toLowerCase().replace(" ", "-") === disease) {
    actualPredictionName = specificDiseasePrediction.class;
  } else if (infoFromDiseaseInfo) {
    actualPredictionName = infoFromDiseaseInfo.title;
  } else {
    actualPredictionName = multiClassPrediction?.prediction || specificDiseasePrediction?.class || "Unknown Disease";
  }

  const displayData = infoFromDiseaseInfo || {
    title: actualPredictionName,
    description: "Detailed information for this specific prediction is not yet available. Please refer to the probabilities for potential categories.",
    treatment: ["No specific treatment recommendations available.", "Consult a local agricultural expert for guidance."],
    sources: [],
  };

  // Show loading state if essential data isn't ready
  if (!displayImageUrl && !multiClassPrediction && !specificDiseasePrediction) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
        <p className="text-xl">Loading prediction details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
      <div className="flex">
        {/* History Sidebar Component */}
        <HistorySidebar predictions={predictions} currentDisease={disease} getBlobUrlFromBase64={getBlobUrlFromBase64} />

        <main className="flex-1 px-6 py-10">
          <div
            id="result-content"
            className="max-w-5xl p-8 mx-auto border shadow-xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/20"
          >
            <ResultHeader title={displayData.title} />

            <PredictionDisplay
              originalImageUrl={displayImageUrl}
              segmentedImageUrl={shouldShowSeverityAndGraph ? displaySegmentedImage : null}
              severity={shouldShowSeverityAndGraph ? severity : null}
            />

            <ProbabilityChart probabilities={predictionProbabilities} />

            <SpecificRefinement
              disease={disease}
              multiClassPrediction={multiClassPrediction}
              specificDiseasePrediction={specificDiseasePrediction}
            />

            <DiseaseInfoDisplay
              description={displayData.description}
              treatment={displayData.treatment}
              sources={displayData.sources}
            />

            <ActionButtons />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Result;