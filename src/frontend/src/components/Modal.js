import React from "react";
import { Box, Flex, CloseButton } from "@chakra-ui/react";

function Modal({ children, setModalOpen }) {
  const handleCloseModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setModalOpen(false);
    }
  };

  return (
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
        padding="8px" // Reduce padding
        width="85%" // Slightly smaller width
        maxWidth="650px" // Reduced max width
        height="85vh" // Slightly smaller height
        display="flex"
        flexDirection="column"
        boxShadow="lg"
        position="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <CloseButton
          position="absolute"
          top="10px"
          right="10px"
          onClick={() => setModalOpen(false)}
        />

        {/* Modal Content */}
        <Flex direction="column" height="100%">
          {children}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Modal;
