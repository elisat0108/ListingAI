// src/services/SocialMediaService.js
const API_BASE_URL = "https://64e2-142-188-25-43.ngrok-free.app";

/**
 * Generic function to post to multiple platforms
 * @param {string} platform - The target platform (e.g., "facebook", "twitter", "linkedin", "blog")
 * @param {object} listing - The listing details
 * @param {array} selectedImages - Array of selected image URLs
 */
export const postToSocialMedia = async (platform, listing, selectedImages) => {
  try {
    // Construct post content
    const postContent = `
      🏡 ${listing.Address}
      💰 Price: ${listing.Price}
      🛏 Bedrooms: ${listing.Beds} | 🛁 Washrooms: ${listing.Washrooms}
      📜 ${listing.Description}

      #RealEstate #HomeForSale #RealEstateAI
    `;

    // Ensure correct API endpoint
    const platformEndpoints = {
      facebook: `${API_BASE_URL}/listing/publish/facebook`,
      twitter: `${API_BASE_URL}/listing/publish/twitter/`,
      linkedin: `${API_BASE_URL}/listing/publish/linkedin/`,
      blog: `${API_BASE_URL}/listing/publish/blog/`,
    };

    if (!platformEndpoints[platform]) {
      alert(`Unsupported platform: ${platform}`);
      return;
    }

    console.log(`Posting to: ${platformEndpoints[platform]}`); // Debugging

    const response = await fetch(platformEndpoints[platform], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",  // ✅ If using ngrok, prevents security errors
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
  } catch (error) {
    console.error(`Network error while posting to ${platform}:`, error);
    alert(`Network error. Please try again.`);
  }
};
