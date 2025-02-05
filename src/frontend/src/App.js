import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  IconButton,
  CloseButton,
  Badge,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function App() {
  const [listing, setListing] = useState(null);
  const [editableListing, setEditableListing] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");

  const imagesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const API_BASE_URL = "https://f2da-142-188-25-43.ngrok-free.app";

/*
// Fetch listing data
  const fetchListing = async () => {
    setLoading(true);
    try {
      // Simulating API fetch for both button and URL search
      const response = await fetch("http://127.0.0.1:8000/listing/");
      const data = await response.json();
      setListing(data);
      setEditableListing({ ...data }); // Create a copy for editing
      setModalOpen(true); // Open the modal once data is fetched
    } catch (error) {
      alert("Error fetching listing");
    }
    setLoading(false);
  };
*/

  // Fetch listing data
  const fetchListing = async () => {
    try {
      console.log("Fetching from:", `${API_BASE_URL}/listing/`); // Debugging

      const response = await fetch(`${API_BASE_URL}/listing/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true", // ✅ Bypasses Ngrok security page
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Listing:", data);
      setListing(data);
      setEditableListing({ ...data });
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching listing:", error);
      alert("Error fetching listing: " + error.message);
    }
  };

  // Toggle image selection
  const toggleImageSelection = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((img) => img !== image)
        : prev.length < 8
        ? [...prev, image]
        : prev
    );
  };

  // Pagination controls
  const nextPage = () => {
    if (editableListing && currentPage < Math.ceil(editableListing.Images.length / imagesPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle field changes
  const handleFieldChange = (field, value) => {
    setEditableListing((prev) => {
      const updatedValue =
        field === "Price"
          ? `$${parseFloat(value.replace(/[^0-9.]/g, "")).toLocaleString()}`
          : value;
      return {
        ...prev,
        [field]: updatedValue,
      };
    });
  };

  /*
  // Submit to post
  const createPost = () => {
    alert("Post created successfully!");
  };
  */
  
  // Submit to post
  const createPost = async () => {
    await fetch(`${API_BASE_URL}/listing/publish/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_content: editableListing.Description,
        images: selectedImages,
      }),
    });
    alert("Post created successfully!");
  };

  // Close modal when clicking outside
  const handleCloseModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setModalOpen(false);
    }
  };

  return (
    <Box padding="20px" fontFamily="Arial, sans-serif" maxWidth="800px" margin="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        AI-Powered Real Estate Marketing Hub
      </Text>
      <Flex mb={4} gap={2}>
	  
	   {/* Search Bar */}
        <Input
          placeholder="Paste listing URL here"
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
        />
        <Button
          onClick={fetchListing}
          colorScheme="blue"
          size="md"
          isLoading={loading}
          loadingText="Fetching..."
        >
          Fetch Listing
        </Button>
      </Flex>

      {/* Modal */}
      {modalOpen && editableListing && (
        <Flex
          id="modal-overlay"
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
          onClick={handleCloseModal}
        >
          <Box
            background="white"
            borderRadius="10px"
            padding="20px"
            width="90%"
            maxWidth="600px"
            height="auto"
            display="flex"
            flexDirection="column"
            boxShadow="lg"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <CloseButton
              position="absolute"
              top="10px"
              right="10px"
              onClick={() => setModalOpen(false)}
            />

            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Step 2: Confirm Listing Information
            </Text>

            {/* Image Gallery */}
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={prevPage}
                disabled={currentPage === 0}
                colorScheme="blue"
                aria-label="Previous"
              />
              <Flex gap={2} position="relative">
                {editableListing.Images.slice(
                  currentPage * imagesPerPage,
                  currentPage * imagesPerPage + imagesPerPage
                ).map((img, index) => (
                  <Box key={index} position="relative" width="150px" height="100px">
                    <Image
                      src={img}
                      alt={`Listing ${index}`}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      borderRadius="md"
                      border={selectedImages.includes(img) ? "3px solid green" : "1px solid gray"}
                      cursor="pointer"
                      _hover={{ transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
                      onClick={() => toggleImageSelection(img)}
                    />
                    {selectedImages.includes(img) && (
                      <Badge
                        position="absolute"
                        top="5px"
                        left="5px"
                        colorScheme="red"
                        borderRadius="full"
                        fontSize="xs"
                        px={2}
                        py={1}
                      >
                        {selectedImages.indexOf(img) + 1}
                      </Badge>
                    )}
                  </Box>
                ))}
              </Flex>
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={nextPage}
                disabled={currentPage >= Math.ceil(editableListing.Images.length / imagesPerPage) - 1}
                colorScheme="blue"
                aria-label="Next"
              />
            </Flex>

            {/* Editable Fields */}
            <VStack spacing={2} align="stretch">
              {/* Address */}
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Address
                </Text>
                <Input
                  value={editableListing.Address}
                  onChange={(e) => handleFieldChange("Address", e.target.value)}
                  placeholder="Enter property address"
                  size="sm"
                />
              </Box>

              {/* Price */}
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Price
                </Text>
                <Input
                  type="text"
                  value={editableListing.Price}
                  onChange={(e) => handleFieldChange("Price", e.target.value)}
                  placeholder="Enter property price"
                  size="sm"
                />
              </Box>

              {/* Bedrooms and Bathrooms */}
              <Flex gap={4}>
                <Box flex="1">
                  <Text fontWeight="bold" mb={1}>
                    Bedrooms
                  </Text>
                  <Input
                    type="number"
                    value={editableListing.Beds}
                    onChange={(e) => handleFieldChange("Beds", e.target.value)}
                    placeholder="Enter number of bedrooms"
                    size="sm"
                  />
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" mb={1}>
                    Bathrooms
                  </Text>
                  <Input
                    type="number"
                    value={editableListing.Washrooms}
                    onChange={(e) => handleFieldChange("Washrooms", e.target.value)}
                    placeholder="Enter number of bathrooms"
                    size="sm"
                  />
                </Box>
              </Flex>

              {/* Description */}
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Description
                </Text>
                <Textarea
                  value={editableListing.Description}
                  onChange={(e) => handleFieldChange("Description", e.target.value)}
                  placeholder="Enter property description"
                  size="sm"
                  height="60px"
                  overflowY="auto"
                />
              </Box>
            </VStack>

            {/* Fixed Post Button */}
            <Button
              mt={4}
              colorScheme="green"
              size="lg"
              width="100%"
              onClick={createPost}
              isDisabled={selectedImages.length === 0}
            >
              Create Post
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default App;