import { config } from "@/helpers/config/envConfig";
import { useAppToast } from "@/redux/hooks";
import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";

interface IShareServiceProps {
  id: string;
  isShareService: boolean;
  setIsShareService: (v: boolean) => void;
}

const ShareService = ({
  id,
  isShareService,
  setIsShareService,
}: IShareServiceProps) => {
  const shareUrl = `${config.base_url}/service-details/${id}`;
  const [isCopied, setIsCopied] = useState(false);
  const {showToast} = useAppToast()

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      showToast("Link copied to clipboard", "success");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <Modal
      open={isShareService}
      footer={null}
      onCancel={() => setIsShareService(false)}
      className="w-full md:w-[350px]"
    >
      <div className="flex items-center gap-4">
        {/* Copy Link */}
        <Button
          onClick={handleCopyToClipboard}
          type="primary"
          ghost={isCopied}
          className="mb-2"
        >
          {isCopied ? "Copied!" : "Copy Link"}
        </Button>

        {/* Facebook */}
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        {/* Twitter */}
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        {/* WhatsApp */}
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        {/* Facebook Messenger */}
        <FacebookMessengerShareButton
          url={shareUrl}
          appId={config.fb_app_id as string}
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>
    </Modal>
  );
};

export default ShareService;
