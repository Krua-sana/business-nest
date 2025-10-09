export default function ApplicationForm() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Apply to Business Nest</h1>
      <p className="text-center mb-8 text-gray-600">
        Fill in the application form below to join our 10 Saturdays program.
      </p>

      <iframe
        src="https://formspree.io/f/xkgqbpaz"   // 👈 Replace with your Formspree link
        className="w-full h-[800px] border rounded shadow"
        title="Application Form"
      ></iframe>
    </div>
  );
}
