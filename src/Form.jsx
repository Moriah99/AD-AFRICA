export default function Form({ goBack }) {
  return (
    <div style={{ padding: "60px", maxWidth: "600px", margin: "auto" }}>
      
      <button onClick={goBack}>Back</button>

      <h1 style={{ marginTop: "20px" }}>
        Create your advert
      </h1>

      <div style={{ marginTop: "30px", display: "grid", gap: "20px" }}>
        
        <input placeholder="Brand name" />
        <input placeholder="Product or service" />
        <input placeholder="Language Yoruba Hausa French" />
        <input placeholder="Target audience" />

        <textarea placeholder="Describe your advert" />

        <button style={{
          padding: "14px",
          background: "#166534",
          color: "white",
          border: "none",
          borderRadius: "30px"
        }}>
          Generate Advert
        </button>

      </div>

    </div>
  );
}