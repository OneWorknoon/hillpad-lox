import Modal from "react-modal";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon
} from "react-share";

const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: "700px",
      zIndex: 999,
      backgroundColor: "white",
      color: "black",
      padding: "30px",
      height: 'auto',
      position: 'relative',
    },
};

function Share() {
    const [modalOpened, setModalIsOpen] = useState(true);
    const currentUrl = window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        alert("Link copied to clipboard!");
    };

    return (
        <Modal
            closeTimeoutMS={500}
            isOpen={modalOpened}
            style={customStyles}
            contentLabel="Share Course"
            shouldCloseOnOverlayClick={true}
        >
            <div className="w-full flex justify-between">
                <div className="text-2xl text-light_black text-center p-2 w-11/12">
                    Share this course
                </div>
                <button onClick={() => setModalIsOpen(!modalOpened)} className="text-light_black text-3xl text-right p-2">
                    <IoClose />
                </button>
            </div>
            <div className="p-4 flex flex-wrap gap-x-10 mx-auto w-full items-center justify-center">
                <div className="flex items-center my-2">
                    <FacebookShareButton url={currentUrl} className="flex flex-col items-center gap-2 text-lg text-light_black">
                        <FacebookIcon size={32} round />
                        <span>Facebook</span>
                    </FacebookShareButton>
                </div>
                <div className="flex items-center my-2">
                    <TwitterShareButton url={currentUrl} className="flex flex-col items-center gap-2 text-lg text-light_black">
                        <TwitterIcon size={32} round />
                        <span>Twitter</span>
                    </TwitterShareButton>
                </div>
                <div className="flex items-center my-2">
                    <WhatsappShareButton url={currentUrl} className="flex flex-col items-center gap-2 text-lg text-light_black">
                        <WhatsappIcon size={32} round />
                        <span>WhatsApp</span>
                    </WhatsappShareButton>
                </div>
                <div className="flex items-center my-2">
                    <TelegramShareButton url={currentUrl} className="flex flex-col items-center gap-2 text-lg text-light_black">
                        <TelegramIcon size={32} round />
                        <span>Telegram</span>
                    </TelegramShareButton>
                </div>
                <div className="flex flex-col gap-2 items-center my-2 cursor-pointer" onClick={copyToClipboard}>
                    <FaLink className="text-lg text-light_black" />
                    <span className="ml-2 text-lg text-light_black">Copy Link</span>
                </div>
            </div>
        </Modal>
    );
}

export default Share;