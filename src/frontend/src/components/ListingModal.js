// src/components/ListingModal.js
import React, { useState } from "react";
import { Box, Button, Text, Select } from "@chakra-ui/react";
import Modal from "./Modal";  // ✅ Now using Modal.js
import ImageGallery from "./ImageGallery";
import ListingForm from "./ListingForm";
import { postToSocialMedia } from "../services/SocialMediaService";

function ListingModal({ listing, setListing, selectedImages, setSelectedImages, setModalOpen }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");

  const handleFieldChange = (field, value) => {
    setListing((prev) => ({ ...prev, [field]: value }));
  };

  const handlePost = async () => {
    setLoading(true);
    await postToSocialMedia(selectedPlatform, listing, selectedImages);
    setLoading(false);
  };

  return (
    <Modal setModalOpen={setModalOpen}>
      <Text fontSize="xl" fontWeight="bold" mb={2}>Confirm Listing Information</Text>

      {/* Image Gallery Component */}
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

      {/* Listing Form Component */}
      <ListingForm listing={listing} handleFieldChange={handleFieldChange} />

      {/* Select Social Media Platform */}
      <Box mt={4}>
        <Text fontWeight="bold" mb={1}>Select Platform</Text>
        <Select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
          <option value="blog">Blog</option>
        </Select>
      </Box>

      {/* Post Button */}
      <Button mt={4} colorScheme="green" size="lg" width="100%" onClick={handlePost} isLoading={loading} isDisabled={selectedImages.length === 0}>
        Post to {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
      </Button>

      {/* Close Button Removed Here (Already Handled in Modal.js) */}
    </Modal>
  );
}

export default ListingModal;
