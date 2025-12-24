import Modal from "react-modal";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import WishListCard from "./wishListCard";
import { IoClose } from "react-icons/io5";
import { fetchWishList } from '../../redux/wishList';

const customStyles = {
    overlay: {
      backgroundColor: "rgb(37 36 36 / 75%)",
      margin: '0',
      width: '100vw',
      height: '100vh',
      overflowY: 'scroll',
      zIndex: 9999999,
    },
    content: {
      top: '0',
      right: '0',
      left: 'auto',
      bottom: "0",
      width: "400px",
      height: "100%",
      zIndex: 9999999,
      backgroundColor: "white",
      color: "black",
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
};

function WishList() {
    const [modalOpened, setModalIsOpen] = useState(true);
    const courses = useSelector((state) => state.wishList.courses);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    console.log({courses})
    useEffect(() => {
        dispatch(fetchWishList());
    }, [dispatch]);
    console.log({sssss:courses})
    // Handle click outside of modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the modal is open and the click is outside the modal
            if (
                modalOpened && 
                modalRef.current && 
                !modalRef.current.contains(event.target)
            ) {
                setModalIsOpen(false);
            }
        };

        // Add event listener when modal is open
        if (modalOpened) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalOpened]);
    function handleClose(){
        setModalIsOpen(false)
      //  window.location.reload()
    }
    return (
        <Modal
            ref={modalRef}
            closeTimeoutMS={500}
            isOpen={modalOpened}
            style={customStyles}
            contentLabel="WishLists"
            // Disable overlay click since we're handling it manually
            shouldCloseOnOverlayClick={false}
        >
            <div className="sticky top-0 bg-white z-10 shadow-md">
                <div className="flex justify-between items-center p-4">
                    <div className="text-2xl text-light_black">
                        My WishList
                    </div>
                    <button onClick={() =>handleClose()} className="text-light_black text-3xl">
                        <IoClose />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {courses.map(course => (
                    <WishListCard course={course} key={course.id} />
                ))}
            </div>
        </Modal>
    );
}

export default WishList;

