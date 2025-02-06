import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For navigation

const API_BASE_URL = "https://64e2-142-188-25-43.ngrok-free.app";

function FacebookCallback() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Use for redirecting the user

  useEffect(() => {
    const fetchFacebookUserToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userAccessToken = urlParams.get("user_access_token");

      if (!userAccessToken) {
        alert("Facebook login failed. No access token received.");
        navigate("/"); // Redirect to home page
        return;
      }

      // ✅ Store Access Token in Local Storage
      localStorage.setItem("fb_user_access_token", userAccessToken);

      try {
        // 🔹 Fetch user's Facebook pages
        const response = await fetch(`${API_BASE_URL}/facebook/get-pages?access_token=${userAccessToken}`);
        const data = await response.json();

        if (data.pages) {
          localStorage.setItem("fb_pages", JSON.stringify(data.pages));
        }

        console.log("✅ Facebook Pages Fetched:", data.pages);

      } catch (error) {
        console.error("Error fetching Facebook Pages:", error);
      }

      // ✅ Redirect back to home page after login
      navigate("/");
    };

    fetchFacebookUserToken();
  }, [navigate]);

  return <div style={{ textAlign: "center", fontSize: "20px", marginTop: "50px" }}>Redirecting...</div>;
}

export default FacebookCallback;
