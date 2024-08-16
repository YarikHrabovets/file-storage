import React, { useState, useEffect } from 'react'

const TextViewer = ({textBase64}) => {
    const [text, setText] = useState('')

    useEffect(() => {
        const decodedString = atob(textBase64.split(',')[1])
        const blob = new Blob([decodedString], { type: 'text/plain' })
        const reader = new FileReader()
        reader.readAsText(blob)
        reader.onloadend = () => {
            setText(reader.result)
        }
    }, [textBase64])

    return (
        <pre className='text-start'>{text}</pre>
    )
}

export default TextViewer