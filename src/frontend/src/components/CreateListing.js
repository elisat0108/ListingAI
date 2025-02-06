import React, { useState } from "react";
import { Box, Button, Input, Text, Flex, Icon } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import Modal from "./Modal";

function CreateListing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [listingLink, setListingLink] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);

  const handleExtractListing = () => {
    if (!listingLink) {
      alert("Please provide a valid listing URL.");
      return;
    }
    // Add logic to extract listing details using the URL
    alert(`Extracting details from: ${listingLink}`);
  };

  return (
    <>
      <Flex mb={4} justifyContent="center">
        <Button
          mt={4}
          colorScheme="blue"
          size="md"
          onClick={() => setModalOpen(true)}
          leftIcon={<Icon as={MdHome} boxSize={4} />}
          borderRadius="md"
          px={6}
          py={2}
        >
          Promote a Listing
        </Button>
      </Flex>

      {modalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <Flex direction="column" gap={4} padding={4}>
            {/* Header */}
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                Property Listing Social Media Posts
              </Text>
              <Text fontSize="sm" color="gray.500">
                Turn your current listings into social media posts by pasting your listing link below.
              </Text>
            </Box>

            {/* URL Input */}
            {!isManualEntry && (
              <Box>
                <Text mb={2}>Paste Listing Link From Realtor.ca</Text>
                <Input
                  placeholder="https://www.realtor.ca/real-estate/homedetails/..."
                  value={listingLink}
                  onChange={(e) => setListingLink(e.target.value)}
                />
                <Button
                  mt={4}
                  colorScheme="red"
                  width="100%"
                  onClick={handleExtractListing}
                >
                  Extract Listing
                </Button>
              </Box>
            )}

            {/* Manual Entry Toggle */}
            <Button
              variant="link"
              onClick={() => setIsManualEntry((prev) => !prev)}
              textDecoration="underline"
            >
              {isManualEntry ? "Paste Listing Link Instead" : "Enter Listing Information Manually"}
            </Button>

            {/* Manual Entry Placeholder */}
            {isManualEntry && (
              <Box>
                <Text>Manual entry form will go here.</Text>
                {/* Add your manual entry form components */}
              </Box>
            )}
          </Flex>
        </Modal>
      )}
    </>
  );
}

export default CreateListing;
