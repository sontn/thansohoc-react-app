import React, { useState, useEffect } from "react";
import "./App.css";
import ReactGA from "react-ga4";
import QRCode from "qrcode.react";

// Initialize Google Analytics
const trackingId = "G-W5H2WCTTML"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const phoneRegex = /^[0-9 +]{9,15}$/;

  // Track page view on component mount
  useEffect(() => {
    console.log(
      "Tracking page view:",
      window.location.pathname + window.location.search
    );
    ReactGA.send("pageview");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(""); // Clear the result when a new submission is made

    // Validate phone number format
    if (!phoneRegex.test(phoneNumber)) {
      setError(
        "Số điện thoại phải có độ dài từ 9 đến 12 ký tự, bao gồm chữ số, dấu cách"
      );
      return;
    }

    // Track form submission event
    ReactGA.event({
      category: "User",
      action: "Submitted Phone Number",
      label: phoneNumber,
    });

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
      <div id="qr-code">
        <QRCode value="https://tracuuthansohoc.live" />
      </div>
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
