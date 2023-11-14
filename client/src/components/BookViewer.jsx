import React, { useState,useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { storage } from "../config/firebase.config";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getAllStorybooks } from "../api";
import { Document, Page, pdfjs } from 'react-pdf';


const BookViewer = ({bookURL}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [{ allBooks,bookIndex, isBookViewing }, dispatch] = useStateValue();
  const [bookImageCover, setBookImageCover] = useState(null);
  const [isbookLoading, setIsBookLoading] = useState(false);

  const closeBookViewer = () => {
    if (isBookViewing) {
      dispatch({
        type: actionType.SET_ISBOOK_VIEWING,
        isBookViewing: false,
      });
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) =>
      Math.max(1, Math.min(prevPageNumber + offset, numPages))
    );
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  useEffect(() => {
    if (!allBooks) {
      getAllStorybooks().then((data) => {
        dispatch({
          type: actionType.SET_ALL_BOOKS,
          allBooks: data.data,
        });
      });
    }
  });

  return (
   
      <div className="flex, flex-col items-center m-20">
        <div className="absolute top-2 right-2">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeBookViewer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
        </div>
        <Document file={bookURL} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "BookCover" : "Book"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
      }
    );
  };
}

export default BookViewer;

export const YourComponent = (data) => {
  const [selectedBook, setSelectedBook] = useState(null);

  // Assuming you have a function to handle book selection
  const handleBookClick = (storybooks) => {
    setSelectedBook(storybooks);
  };
  
  return (
    <div>
      {/* Display the list of books */}
      {data.map((storybooks) => (
        <div key={storybooks._id} onClick={() => handleBookClick(storybooks)}>
          <img src={storybooks.bookImageCover} alt={`Book ${storybooks.bookIndex} Cover`} />
        </div>
      ))}

      {/* Display the selected book's PDF */}
      {selectedBook && (
        <div className="w-1/2">
          <BookViewer bookURL={selectedBook.bookURL} />
        </div>
      )}
    </div>
  );
};








