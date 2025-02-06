import React, { useState } from "react";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import Modal from "./Modal";
import ImageGallery from "./ImageGallery";
import ListingForm from "./ListingForm";
import MediaPlatformMenu from "./MediaPlatformMenu";
import { postToSocialMedia } from "../services/SocialMediaService";

function ListingModal({ listing, setListing, selectedImages, setSelectedImages, setModalOpen }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const handlePost = async () => {
    setLoading(true);
    try {
      await postToSocialMedia(selectedPlatforms, listing, selectedImages);
      alert("Posts successfully created for selected platforms!");
    } catch (error) {
      alert("Error posting to platforms: " + error.message);
    }
    setLoading(false);
  };

  return (
    <Modal setModalOpen={setModalOpen}>
      <Flex direction="column" height="100%">
        {/* Header */}
        <Box flexShrink="0" mb={0.1}>
          <Text fontSize="md" fontWeight="bold" textAlign="center">
            Confirm Listing Information
          </Text>
        </Box>

        {/* Main Content */}
        <Flex flex="1" direction="column" gap={1}>
          {/* Platform Selection Menu */}
          <MediaPlatformMenu selectedPlatforms={selectedPlatforms} setSelectedPlatforms={setSelectedPlatforms} />

       {/* Image Gallery Component */}
          <Box flexShrink="0" maxHeight="20vh">
		  </Box>

		{listing.Images && listing.Images.length > 0 && (
		  <ImageGallery
          images={listing.Images}
          selectedImages={selectedImages}
          toggleImageSelection={(img) => {
            setSelectedImages((prev) =>
              prev.includes(img)
                ? prev.filter((selected) => selected !== img)
                : prev.length < 8
                ? [...prev, img]
                : prev
            );
          }}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
		/>
      )}

           {/* Listing Form */}
          <Box flex="1" overflow="hidden">
            <ListingForm
              listing={listing}
              handleFieldChange={(field, value) => setListing({ ...listing, [field]: value })}
            />
          </Box>
        </Flex>

        {/* Footer */}
        <Box flexShrink="0" mt={2} display="flex" justifyContent="flex-end">
		  <Button
			colorScheme="green"
			size="sm"
			width="20%"
			onClick={handlePost}
			isLoading={loading}
			isDisabled={!selectedImages.length || !selectedPlatforms.length}
		  >
			Compile Post
		  </Button>
		</Box>
      </Flex>
    </Modal>
  );
}

export default ListingModal;
