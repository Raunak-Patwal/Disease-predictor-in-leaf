function TreatmentInfo({ description, treatment }) {
  return (
    <>
      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-green-300">What is it?</h2>
        <p className="text-lg leading-relaxed text-white/90">{description}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-green-300">How to Treat It</h2>
        <ul className="space-y-2 text-lg list-disc list-inside text-white/90">
          {treatment.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default TreatmentInfo;
