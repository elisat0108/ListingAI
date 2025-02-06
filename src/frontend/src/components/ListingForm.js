import React from "react";
import { Box, Input, Textarea, VStack, FormControl, HStack, Icon, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaDollarSign, FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";

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
    <Box
      bg="white"
      p={2}
      borderRadius="lg"
      boxShadow="small"
      border="1px solid"
      borderColor="gray.200"
      width="100%"
    >
      <VStack spacing={1} align="stretch">
        {/* Address and Price on the same row */}
        <HStack spacing={2}>
          <FormControl flex="2">
            <InputGroup>
              <InputLeftElement
				  pointerEvents="none"
				  display="flex"
				  alignItems="center"
				  justifyContent="center"
				  height="100%"
				  width="2.5rem" // Ensures consistent spacing
			  >
				  <Icon as={FaMapMarkerAlt} color="gray.400" />
			  </InputLeftElement>

              <Input
                value={listing.Address}
                onChange={(e) => handleFieldChange("Address", e.target.value)}
                placeholder="Address"
                size="sm"
                focusBorderColor="blue.500"
                borderRadius="sm"
              />
            </InputGroup>
          </FormControl>
          <FormControl flex="1">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaDollarSign} color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                value={listing.Price}
                onChange={handlePriceChange} // ✅ Uses custom handler
                placeholder="Price"
                size="sm"
                focusBorderColor="blue.500"
                borderRadius="sm"
              />
            </InputGroup>
          </FormControl>
        </HStack>

        {/* Bedrooms and Bathrooms */}
        <HStack spacing={4}>
          <FormControl flex="1">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaBed} color="gray.400" />
              </InputLeftElement>
              <Input
                type="number"
                value={listing.Beds}
                onChange={(e) => handleFieldChange("Beds", e.target.value)}
                placeholder="Bedrooms"
                size="sm"
                focusBorderColor="blue.500"
                borderRadius="sm"
              />
            </InputGroup>
          </FormControl>
          <FormControl flex="1">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaBath} color="gray.400" />
              </InputLeftElement>
              <Input
                type="number"
                value={listing.Washrooms}
                onChange={(e) => handleFieldChange("Washrooms", e.target.value)}
                placeholder="Bathrooms"
                size="sm"
                focusBorderColor="blue.500"
                borderRadius="sm"
              />
            </InputGroup>
          </FormControl>
        </HStack>

        {/* Description */}
        <FormControl>
          <Textarea
            value={listing.Description}
            onChange={(e) => handleFieldChange("Description", e.target.value)}
            placeholder="Description"
            size="sm"
            focusBorderColor="blue.500"
            borderRadius="md"
            height="100px"
            resize="none"
          />
        </FormControl>
      </VStack>
    </Box>
  );
}

export default ListingForm;
