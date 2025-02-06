// src/components/ListingForm.js
import React from "react";
import { Box, Input, Text, Textarea, VStack, Flex } from "@chakra-ui/react";

function ListingForm({ listing, handleFieldChange }) {
  
  // Custom handler to ensure price formatting
  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    if (value) {
      value = `$${parseFloat(value).toLocaleString()}`; // Format with $
    }
    handleFieldChange("Price", value);
  };

  return (
    <VStack spacing={2} align="stretch">
      {/* Address */}
      <Box>
        <Text fontWeight="bold" mb={1}>Address</Text>
        <Input
          value={listing.Address}
          onChange={(e) => handleFieldChange("Address", e.target.value)}
          placeholder="Enter property address"
          size="sm"
        />
      </Box>

      {/* Price with auto-formatting */}
      <Box>
        <Text fontWeight="bold" mb={1}>Price</Text>
        <Input
          type="text"
          value={listing.Price}
          onChange={handlePriceChange} // ✅ Uses custom handler
          placeholder="Enter property price"
          size="sm"
        />
      </Box>

      {/* Bedrooms and Bathrooms */}
      <Flex gap={4}>
        <Box flex="1">
          <Text fontWeight="bold" mb={1}>Bedrooms</Text>
          <Input
            type="number"
            value={listing.Beds}
            onChange={(e) => handleFieldChange("Beds", e.target.value)}
            placeholder="Enter number of bedrooms"
            size="sm"
          />
        </Box>
        <Box flex="1">
          <Text fontWeight="bold" mb={1}>Bathrooms</Text>
          <Input
            type="number"
            value={listing.Washrooms}
            onChange={(e) => handleFieldChange("Washrooms", e.target.value)}
            placeholder="Enter number of bathrooms"
            size="sm"
          />
        </Box>
      </Flex>

      {/* Description */}
      <Box>
        <Text fontWeight="bold" mb={1}>Description</Text>
        <Textarea
          value={listing.Description}
          onChange={(e) => handleFieldChange("Description", e.target.value)}
          placeholder="Enter property description"
          size="sm"
          height="60px"
          overflowY="auto"
        />
      </Box>
    </VStack>
  );
}

export default ListingForm;
