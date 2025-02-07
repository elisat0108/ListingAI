const API_BASE_URL = "https://64e2-142-188-25-43.ngrok-free.app";

export const fetchListing = async (setListing, setEditableListing, setModalOpen) => {
  try {
    const response = await fetch(`${API_BASE_URL}/listing/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    setListing(data);
    setEditableListing({ ...data });
    setModalOpen(true);
  } catch (error) {
    alert("Error fetching listing: " + error.message);
  }
};
