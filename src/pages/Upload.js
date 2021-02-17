// import React, {useState} from './node_modules/react';
// import React, { useState, Component } from 'react';
import React, { useState } from 'react';
// import React, { useEffect, useState } from 'react';

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState()
    const [selectedFile, setSelectedFile] = useState('')

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]; //can upload multiple photos by changing this line from grabbing index [0] to something else
        previewFile(file);
        
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const handleSubmitFile = (e) => {
        e.preventDefault()
        if(!previewSource) return;
        uploadImage(previewSource)
    }
    const uploadImage = (base64EncodedImage) => {
        console.log(base64EncodedImage)
    }
    return (
        <div>
            <h1>Upload</h1>
            <form onSubmit={handleSubmitFile}>
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
                <button className="btn" type="submit">submit</button>
            </form>
            {previewSource && (
                <img src={previewSource} alt="chosen" style={{height: '300px'}}/>
            )}
        </div>
    )
}

