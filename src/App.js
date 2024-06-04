import React, { useState } from "react";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(""); // Clear the result when a new submission is made

    try {
      const response = await fetch(
        "https://obxapg4gkme4lskjhynzfxq5mu0royfb.lambda-url.us-east-1.on.aws",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone_number: phoneNumber }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data:", data);
      setResult(data);
    } catch (error) {
      setError("Số điện thoại nhập không đúng, vui lòng nhập lại.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Thần số học dựa vào số điện thoại</h1>
      <form onSubmit={handleSubmit}>
        Số điện thoại
        <label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Xem quẻ</button>
      </form>
      <div id="result">
        <h2>Kết quả:</h2>
        <p>{result || "Chưa có kết quả"}</p>
      </div>
      {error && (
        <div>
          <h2>Có lỗi:</h2>
          <p>{error}</p>
        </div>
      )}
      <footer>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://nhagiaodich.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          nhagiaodich.com
        </a>
      </footer>
    </div>
  );
}

export default App;
