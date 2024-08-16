import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const PdfViewer = ({pdf}) => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setPageNumber(1)
    }
    const goToPrevPage = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1))
    }
    
    const goToNextPage = () => {
        setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages))
    }

    return (
        <>
            <p>
                Сторінка {pageNumber} з {numPages}
            </p>
            <ButtonGroup>
                <Button className='success-button px-5' onClick={goToPrevPage} disabled={pageNumber <= 1}>Prev</Button>
                <Button className='success-button px-5' onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</Button>
            </ButtonGroup>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </>
    )
}

export default PdfViewer