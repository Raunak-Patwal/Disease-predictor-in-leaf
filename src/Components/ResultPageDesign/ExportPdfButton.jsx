import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ExportPDFButton() {
  const handleExport = async () => {
    const resultElement = document.getElementById("result-content");
    if (!resultElement) {
      alert("❌ Export failed: Result section not found.");
      return;
    }

    // Scroll to top of the element to ensure it's fully visible
    resultElement.scrollIntoView({ behavior: "smooth", block: "start" });

    // Wait for a short time to ensure all styles/images are rendered
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(resultElement, {
          scale: 2,
          useCORS: true,
          logging: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("prediction-result.pdf");
      } catch (err) {
        alert("⚠️ Export failed: " + err.message);
      }
    }, 500);
  };

  return (
    <button
      onClick={handleExport}
      className="px-6 py-3 text-white bg-purple-600 rounded-xl hover:bg-purple-500"
    >
      🧾 Export as PDF
    </button>
  );
}

export default ExportPDFButton;
