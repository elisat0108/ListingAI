import React, { useState } from "react";
import { Box, Input, Button, Text, Flex, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

function ContentGeneration() {
  const [inputValue, setInputValue] = useState("");

  const handleGenerate = () => {
    alert("Generate Module in Construction");
  };

  return (
    <Box width="100%" maxWidth="800px" margin="auto" padding="20px">
      {/* Header with Info Tooltip */}
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Let’s plan your social media content{" "}
          <Tooltip 
            label="Provide your topic idea, and we'll suggest content." 
            fontSize="sm" 
            placement="top"
            hasArrow
			p={2}
            borderRadius="sm"
            boxShadow="sm"
            maxWidth="500px" // Ensures the tooltip fits one line
          >
            <InfoIcon cursor="pointer" ml={1} />
          </Tooltip>
        </Text>
      </Flex>

      {/* Input Bar and Generate Button */}
      <Flex gap={2}>
        <Input
          placeholder="What would you like your content to focus on this week?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="lg"
          flex="1"
          borderColor="gray.300"
          borderWidth="2px"
          _hover={{ borderColor: "blue.400" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)" }}
        />
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleGenerate}
          isDisabled={!inputValue.trim()}
        >
          Generate
        </Button>
      </Flex>
    </Box>
  );
}

export default ContentGeneration;
