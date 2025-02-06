// src/components/Modal.js
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
        padding="20px"
        width="90%"
        maxWidth="600px"
        height="auto"
        display="flex"
        flexDirection="column"
        boxShadow="lg"
        position="relative" // ✅ Ensures close button stays in place
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* ✅ Close Button in Top Right */}
        <CloseButton
          position="absolute"
          top="10px"
          right="10px"
          onClick={() => setModalOpen(false)}
        />
        
        {children} {/* Allows inserting any content inside modal */}
      </Box>
    </Flex>
  );
}

export default Modal;
