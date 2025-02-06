// src/components/MediaPlatformMenu.js
import React from "react";
import { Flex, Menu, MenuButton, MenuList, MenuItem, Button, Icon, Circle } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaLinkedin } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";

function MediaPlatformMenu({ selectedPlatforms, setSelectedPlatforms }) {
  const platformIcons = {
    facebook: { icon: FaFacebook, color: "blue.500" },
    instagram: { icon: FaInstagram, color: "pink.400" },
    tiktok: { icon: FaTiktok, color: "black" },
    x: { icon: FaTwitter, color: "blue.400" },
    linkedin: { icon: FaLinkedin, color: "blue.700" },
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  return (
    <Flex alignItems="center" mt={4} mb={4}>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="blue" size="sm" rightIcon={<ChevronDownIcon />}>
          Select Platforms
        </MenuButton>
        <MenuList>
          {Object.entries(platformIcons).map(([platform, { icon, color }]) => (
            <MenuItem key={platform} icon={<Icon as={icon} boxSize={6} color={color} />} onClick={() => handlePlatformChange(platform)}>
              <Flex alignItems="center" justifyContent="space-between" w="100%">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                <Circle size="8px" bg={selectedPlatforms.includes(platform) ? "green.400" : "transparent"} ml={2} />
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex ml={4} gap={2}>
        {selectedPlatforms.map((platform) => (
          <Icon key={platform} as={platformIcons[platform].icon} boxSize={6} color={platformIcons[platform].color} />
        ))}
      </Flex>
    </Flex>
  );
}

export default MediaPlatformMenu;
