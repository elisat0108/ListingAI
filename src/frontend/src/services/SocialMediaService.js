const API_BASE_URL = "https://64e2-142-188-25-43.ngrok-free.app";

/**
 * Generic function to post to multiple platforms
 * @param {string | array} platforms - Selected platform(s) (e.g., "facebook" or ["facebook", "twitter"])
 * @param {object} listing - The listing details
 * @param {array} selectedImages - Array of selected image URLs
 */

export const postToSocialMedia = async (platforms, listing, selectedImages) => {
  try {
    // Ensure platforms is always an array
    const platformArray = Array.isArray(platforms) ? platforms : [platforms];

    // Construct post content
    const postContent = `
      🏡 ${listing.Address}
      💰 Price: ${listing.Price}
      🛏 Bedrooms: ${listing.Beds} | 🛁 Washrooms: ${listing.Washrooms}
      📜 ${listing.Description}

      #RealEstate #HomeForSale #RealEstateAI
    `;

    // Define API endpoints for supported platforms
    const platformEndpoints = {
      facebook: `${API_BASE_URL}/listing/publish/facebook`,     
      twitter: `${API_BASE_URL}/listing/publish/twitter/`,     // Not yet supported
      linkedin: `${API_BASE_URL}/listing/publish/linkedin/`,   // Not yet supported
      blog: `${API_BASE_URL}/listing/publish/blog/`,           // Not yet supported
      instagram: `${API_BASE_URL}/listing/publish/instagram/`, // Not yet supported
      tiktok: `${API_BASE_URL}/listing/publish/tiktok/`, // Not yet supported
    };

    // Filter out unsupported platforms
    const validPlatforms = platformArray.filter((platform) => platformEndpoints[platform]);

    if (validPlatforms.length === 0) {
      alert("No valid platforms selected.");
      return;
    }

    for (const platform of validPlatforms) {
      console.log(`Posting to: ${platformEndpoints[platform]}`); // Debugging

      const response = await fetch(platformEndpoints[platform], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // ✅ Prevents security errors if using ngrok
        },
        body: JSON.stringify({
          post_content: postContent,
          images: selectedImages,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`${platform.toUpperCase()} Post created successfully! 🎉`);
      } else {
        alert(`Error posting to ${platform}: ${data.error}`);
        console.error(`Failed to post on ${platform}:`, data);
      }
    }
  } catch (error) {
    console.error(`Network error while posting to platforms:`, error);
    alert(`Network error. Please try again.`);
  }
};
