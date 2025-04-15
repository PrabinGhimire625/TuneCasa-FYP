// ShareButton.js
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { toast } from "react-toastify";

const ShareButton = ({ url }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShareClick = () => {
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url).then(() => {
      toast.success("link copied to clipboard!"); // Notify the user that the link has been copied
    }).catch(() => {
      toast.error("Failed to copy the link.");
    });

    // Toggle the share options visibility
    setIsSharing((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleShareClick}
        className="mt-2 flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
      >
        <FiShare2 size={16} />
        Share
      </button>
  
      {isSharing && (
        <div className="mt-3 flex gap-3">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      )}
    </div>
  );
  
};

export default ShareButton;
