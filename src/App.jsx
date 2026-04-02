import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("landing");

  return page === "landing" ? (
    <Landing goToForm={() => setPage("form")} />
  ) : (
    <Form goBack={() => setPage("landing")} />
  );
}

/* ---------------- LANDING ---------------- */

function Landing({ goToForm }) {
  return (
    <div style={{ padding: "60px 20px", backgroundColor: "#f7f9f8" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ fontSize: "28px" }}>AD AFRICA</h2>
        </div>

        <div style={{ marginTop: "40px" }}>
          <h1 style={{ fontSize: "40px" }}>
            Your message deserves to be understood everywhere
          </h1>

          <p style={{ marginTop: "20px", color: "#555" }}>
            Turn ideas into structured adverts that communicate clearly across languages and cultures.
          </p>

          <button
            onClick={goToForm}
            style={{
              marginTop: "25px",
              padding: "15px 30px",
              background: "#166534",
              color: "white",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer"
            }}
          >
            Build Your Advert
          </button>
        </div>

        <SlidingStatements />
      </div>
    </div>
  );
}

/* ---------------- SLIDES ---------------- */

function SlidingStatements() {
  const statements = [
    "Build something people understand instantly",
    "Speak directly to your audience in their own language",
    "Turn simple ideas into powerful, structured adverts"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statements.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: "80px", textAlign: "center" }}>
      <h2 style={{ fontSize: "30px" }}>
        {statements[index]}
      </h2>
    </div>
  );
}

/* ---------------- FORM ---------------- */

function Form({ goBack }) {
  const [form, setForm] = useState({
    brand: "",
    product: "",
    language: "",
    audience: "",
    description: ""
  });

  const [image, setImage] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const generateAd = async () => {
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
          prompt: `${form.product} advert for ${form.audience} in ${form.language}. ${form.description}`,
          size: "1024x1024"
        })
      });

      const data = await res.json();
      if (data?.data?.[0]?.url) {
        setImage(data.data[0].url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "60px 20px", backgroundColor: "#f7f9f8" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <button onClick={goBack} style={{ marginBottom: "20px" }}>
          Back
        </button>

        <h1>Create your advert</h1>

        <div style={{ display: "grid", gap: "15px", marginTop: "30px" }}>
          <input placeholder="Brand" onChange={(e) => handleChange("brand", e.target.value)} />
          <input placeholder="Product" onChange={(e) => handleChange("product", e.target.value)} />

          <select onChange={(e) => handleChange("language", e.target.value)}>
            <option value="">Select language</option>
            <option>English</option>
            <option>Yoruba</option>
            <option>Hausa</option>
            <option>Igbo</option>
            <option>French</option>
            <option>Swahili</option>
            <option>Arabic</option>
          </select>

          <input placeholder="Audience" onChange={(e) => handleChange("audience", e.target.value)} />

          <textarea
            placeholder="Describe your advert"
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <button onClick={generateAd}>
            Generate Advert
          </button>
        </div>

        {image && (
          <div style={{ marginTop: "30px" }}>
            <img src={image} alt="generated" style={{ width: "100%" }} />

            <a href={image} download="ad.png">
              Download Advert
            </a>
          </div>
        )}
      </div>
    </div>
  );
}