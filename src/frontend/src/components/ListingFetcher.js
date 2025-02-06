import React, { useState } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

const API_BASE_URL = "https://64e2-142-188-25-43.ngrok-free.app";

function ListingFetcher({ setListing, setEditableListing, setModalOpen }) {
  const [searchUrl, setSearchUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchListing = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <Flex mb={4} gap={2}>
      <Input placeholder="Paste listing URL here" value={searchUrl} onChange={(e) => setSearchUrl(e.target.value)} />
      <Button onClick={fetchListing} colorScheme="blue" size="md" isLoading={loading} loadingText="Fetching...">
        Fetch Listing
      </Button>
    </Flex>
  );
}

export default ListingFetcher;
