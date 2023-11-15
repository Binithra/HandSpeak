import React, { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BookViewer = () => {
  const [{ allBooks, bookIndex, bookImageCover, isBookViewing }, dispatch] =
    useStateValue();
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const closeBookViewer = () => {
    if (isBookViewing) {
      dispatch({
        type: actionType.SET_ISBOOK_VIEWING,
        isBookViewing: false,
      });
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex, flex-col items-center m-20">
      <div className="absolute top-16 right-12">
        <motion.i whileTap={{ scale: 0.8 }} onClick={closeBookViewer}>
          <IoMdClose className="text-teal-700 bg-white hover:text-headingColor text-3xl cursor-pointer btn-circle btn-ghost" />
        </motion.i>
      </div>

      <embed src={allBooks[bookIndex]?.bookURL} type="application/pdf" 
      className="w-screen h-screen "
      onLoadSuccess={onDocumentLoadSuccess}/>
        {/* <Page pageNumber={pageNumber} /> */}
      {/* </Document> */}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default BookViewer;
