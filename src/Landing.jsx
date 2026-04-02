import { motion } from "framer-motion";

export default function Landing({ goToForm }) {
  return (
    <div style={{ padding: "60px" }}>
      
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        
        <div>
          <h1 style={{ fontSize: "48px", lineHeight: "1.2" }}>
            Your ideas can become powerful adverts in any language
          </h1>

          <p style={{ marginTop: "20px", color: "#555", maxWidth: "500px" }}>
            Build structured adverts using AI. Reach audiences across different languages and markets with clarity and precision.
          </p>

          <button
            onClick={goToForm}
            style={{
              marginTop: "30px",
              padding: "14px 24px",
              background: "#166534",
              color: "white",
              border: "none",
              borderRadius: "30px"
            }}
          >
            Build Your Advert
          </button>
        </div>

        <div>
          <img
            src="https://picsum.photos/400/300"
            style={{ borderRadius: "20px" }}
          />
        </div>
      </div>

      <div style={{ marginTop: "80px" }}>
        <h2>Example adverts</h2>

        <div style={{ display: "flex", gap: "20px", overflowX: "auto", marginTop: "20px" }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              minWidth: "250px",
              background: "white",
              padding: "20px",
              borderRadius: "16px"
            }}>
              <img src={`https://picsum.photos/300/200?${i}`} style={{ width: "100%", borderRadius: "10px" }} />
              <p style={{ marginTop: "10px" }}>
                Sample advert showcasing audience targeting and messaging
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}