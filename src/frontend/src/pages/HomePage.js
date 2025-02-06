import React, { useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

function HomePage({ fetchListing, loginWithFacebook }) {
  const [searchUrl, setSearchUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
          onClick={() => {
            setLoading(true);
            fetchListing();
            setLoading(false);
          }}
          colorScheme="blue"
          size="md"
          isLoading={loading}
          loadingText="Fetching..."
        >
          Fetch Listing
        </Button>
      </Flex>

      <Button onClick={loginWithFacebook} colorScheme="blue">
        Login with Facebook
      </Button>
    </Box>
  );
}

export default HomePage;
