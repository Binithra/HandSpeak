import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const url = 'https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const BookViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => Math.max(1, Math.min(prevPageNumber + offset, numPages)));
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <style>
        {`
          .book-viewer {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
          }

          .page-info {
            margin-top: 10px;
          }

          .page-buttons {
            margin-top: 10px;

            button {
              margin-right: 10px;
            }
          }
        `}
      </style>
      <div className="book-viewer">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <div className="page-info">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </div>
        <div className="page-buttons">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BookViewer;
