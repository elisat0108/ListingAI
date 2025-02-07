import React, { useState } from "react";
import { Box, Button, Input, Text, Flex, Icon } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import Modal from "./Modal";
import ListingModal from "./ListingModal";
import { fetchListing } from "../services/ListingFetcher"; // ✅ Import fetchListing

function CreateListing({ setListing, setEditableListing, editableListing, setModalOpen, modalOpen }) {
  const [listingLink, setListingLink] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);

  const handleExtractListing = async () => {
    if (!listingLink) {
      try {
        await fetchListing(setListing, setEditableListing, setModalOpen); // ✅ Pass setModalOpen
      } catch (error) {
        console.error("Error fetching listing:", error);
        alert("Failed to extract listing. Please try again.");
      }
    } else {
      alert(`Extracting details from: ${listingLink}`);
    }
  };

  return (
    <>
      {/* Create a Post Button */}
      <Flex mb={4} justifyContent="center">
        <Button
          mt={4}
          colorScheme="blue"
          size="md"
          onClick={() => setModalOpen(true)} // ✅ Opens the modal
          leftIcon={<Icon as={MdHome} boxSize={4} />}
          borderRadius="md"
          px={6}
          py={2}
        >
          Create a Post
        </Button>
      </Flex>

      {/* Step 1: Extract Listing Modal */}
      {modalOpen && !editableListing && ( // ✅ Show this modal only if editableListing is null
        <Modal setModalOpen={setModalOpen}>
          <Flex direction="column" gap={4} padding={4}>
            {/* Header */}
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="bold">Property Listing Social Media Posts</Text>
              <Text fontSize="sm" color="gray.500">
                Turn your current listings into social media posts by pasting your listing link below.
              </Text>
            </Box>

            {/* URL Input */}
            {!isManualEntry && (
              <Box>
                <Text mb={2}>Paste Listing Link From Realtor.ca Here</Text>
                <Input
                  placeholder="https://www.realtor.ca/real-estate//homedetails/..."
                  value={listingLink}
                  onChange={(e) => setListingLink(e.target.value)}
                />
                <Button mt={4} colorScheme="red" width="100%" onClick={handleExtractListing}>
                  Extract Listing
                </Button>
              </Box>
            )}

            {/* Manual Entry Toggle */}
            <Button variant="link" onClick={() => setIsManualEntry((prev) => !prev)} textDecoration="underline">
              {isManualEntry ? "Paste Listing Link Instead" : "Enter Listing Information Manually"}
            </Button>
          </Flex>
        </Modal>
      )}

      {/* Step 2: Show Listing Modal */}
      {modalOpen && editableListing && ( // ✅ Show ListingModal only when editableListing is set
        <ListingModal
          listing={editableListing}
          setListing={setListing}
          selectedImages={[]}
          setSelectedImages={() => {}}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}

export default CreateListing;
