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
    <div
      style={{
        padding: "60px 20px",
        backgroundColor: "#f7f9f8",
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg width=\"80\" height=\"80\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"rgba(0,0,0,0.03)\"><rect x=\"10\" y=\"10\" width=\"20\" height=\"10\"/><rect x=\"40\" y=\"30\" width=\"25\" height=\"12\"/><circle cx=\"20\" cy=\"50\" r=\"6\"/></g></svg>')"
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* BRAND (RESTORED) */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/86/Africa_(orthographic_projection).svg"
            alt="Africa logo"
            style={{
              width: "40px",
              height: "40px",
              filter: "invert(29%) sepia(85%) saturate(400%) hue-rotate(90deg)"
            }}
          />
          <h2 style={{ fontWeight: "bold", fontSize: "32px", letterSpacing: "1px" }}>
            AD AFRICA
          </h2>
        </div>

        {/* HERO (RESTORED) */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "40px",
            alignItems: "center"
          }}
        >
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "44px", lineHeight: "1.2" }}>
              Your message deserves to be understood everywhere
            </h1>

            <p style={{ marginTop: "20px", color: "#555" }}>
              Turn your ideas into adverts that speak clearly to people, no matter their language or location.
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

          <div style={{ flex: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
              alt="advert example"
              style={{ width: "100%", borderRadius: "16px" }}
            />

            <p style={{ marginTop: "10px", color: "#444" }}>
              A real-world advert placed where people make decisions.
            </p>
          </div>
        </div>

        {/* SLIDER */}
        <SlidingStatements />
      </div>
    </div>
  );
}

/* ---------------- SLIDER (RESTORED) ---------------- */

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
      <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
        {statements[index]}
      </h1>
    </div>
  );
}

/* ---------------- FORM (RESTORED) ---------------- */

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
    <div
      style={{
        padding: "60px 20px",
        backgroundColor: "#f7f9f8",
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg width=\"80\" height=\"80\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"rgba(0,0,0,0.03)\"><rect x=\"10\" y=\"10\" width=\"20\" height=\"10\"/><rect x=\"40\" y=\"30\" width=\"25\" height=\"12\"/><circle cx=\"20\" cy=\"50\" r=\"6\"/></g></svg>')"
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <button onClick={goBack} style={{ marginBottom: "20px" }}>
          Back
        </button>

        <h1 style={{ fontSize: "40px" }}>Create your advert</h1>

        <div style={{ marginTop: "40px", display: "grid", gap: "20px" }}>
          <input placeholder="Brand name" onChange={(e) => handleChange("brand", e.target.value)} />
          <input placeholder="Product or service" onChange={(e) => handleChange("product", e.target.value)} />

          <select onChange={(e) => handleChange("language", e.target.value)}>
            <option>Select language</option>
            <option>English</option>
            <option>Yoruba</option>
            <option>Hausa</option>
            <option>Igbo</option>
            <option>French</option>
            <option>Swahili</option>
            <option>Arabic</option>
          </select>

          <input placeholder="Target audience" onChange={(e) => handleChange("audience", e.target.value)} />

          <textarea
            placeholder="Describe your advert"
            onChange={(e) => handleChange("description", e.target.value)}
            style={{ minHeight: "120px" }}
          />

          <button
            onClick={generateAd}
            style={{
              padding: "18px",
              background: "#166534",
              color: "white",
              borderRadius: "30px"
            }}
          >
            Generate Advert
          </button>
        </div>

        {image && (
          <div style={{ marginTop: "40px" }}>
            <img src={image} alt="generated advert" style={{ width: "100%", borderRadius: "16px" }} />

            <a
              href={image}
              download="ad-africa-advert.png"
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "12px 24px",
                background: "#166534",
                color: "white",
                borderRadius: "30px",
                textDecoration: "none"
              }}
            >
              Download Advert
            </a>
          </div>
        )}
      </div>
    </div>
  );
}