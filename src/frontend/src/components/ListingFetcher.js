import React, { useState } from "react";
import { Button, Flex, Icon } from "@chakra-ui/react";
import { MdHome } from "react-icons/md"; // Import Home Icon

const API_BASE_URL = "https://64e2-142-188-25-43.ngrok-free.app";

function ListingFetcher({ setListing, setEditableListing, setModalOpen }) {
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
    <Flex mb={4} justifyContent="center">
      <Button
        onClick={fetchListing}
        colorScheme="blue"
        size="md" // Smaller button size
        isLoading={loading}
        loadingText="Fetching..."
        leftIcon={<Icon as={MdHome} boxSize={4} />} // Slightly smaller icon
        borderRadius="md" // Modern, subtle rounded corners
        px={6} // Adjust padding for a sleeker look
        py={2}
      >
        Beta Fetch Listing
      </Button>
    </Flex>
  );
}

export default ListingFetcher;
