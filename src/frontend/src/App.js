import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ListingFetcher from "./components/ListingFetcher";
import ListingModal from "./components/ListingModal";
import ContentGeneration from "./components/ContentGeneration"; // ✅ Import ContentGeneration

function App() {
  const [listing, setListing] = useState(null);
  const [editableListing, setEditableListing] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box padding="20px" fontFamily="Arial, sans-serif" maxWidth="800px" margin="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        AI-Powered Real Estate Marketing Hub
      </Text>

      {/* Content Generation Module */}
      <ContentGeneration />

      <ListingFetcher setListing={setListing} setEditableListing={setEditableListing} setModalOpen={setModalOpen} />
      {modalOpen && editableListing && (
        <ListingModal
          listing={editableListing}
          setListing={setEditableListing}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          setModalOpen={setModalOpen}
        />
      )}
    </Box>
  );
}

export default App;
