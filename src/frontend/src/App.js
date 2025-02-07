import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import ListingModal from "./components/ListingModal";
import ContentGeneration from "./components/ContentGeneration";
import CreateListing from "./components/CreateListing";

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

      {/* CreateListing Component */}
      <CreateListing 
        setListing={setListing} 
        setEditableListing={setEditableListing}
        editableListing={editableListing}		
        setModalOpen={setModalOpen} 
        modalOpen={modalOpen}
      />
	  
      {modalOpen && editableListing && (
        <ListingModal
          listing={editableListing}
          setListing={setListing}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          setModalOpen={setModalOpen}
          setEditableListing={setEditableListing}
        />
      )}
    </Box>
  );
}

export default App;
