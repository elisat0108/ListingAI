import React from "react"; 
import { Box, Flex, Image, IconButton, Badge, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function ImageGallery({ images, selectedImages, toggleImageSelection, currentPage, setCurrentPage }) {
  const imagesPerPage = 3;

  const nextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        {/* Left Pagination Button */}
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={prevPage}
          disabled={currentPage === 0}
          colorScheme="blue"
          aria-label="Previous"
        />

        {/* Image Grid */}
        <Flex gap={2} position="relative">
          {images.slice(
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

        {/* Right Pagination Button */}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(images.length / imagesPerPage) - 1}
          colorScheme="blue"
          aria-label="Next"
        />
      </Flex>

      {/* Instruction Text Positioned Underneath the First Image */}
      <Flex mt={2} alignItems="flex-start">
        <Text fontSize="sm" color="gray.600" ml="85px">
          Please select up to 8 photos that you want to use in your post.
        </Text>
      </Flex>
    </Box>
  );
}

export default ImageGallery;
