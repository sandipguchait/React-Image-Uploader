import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {

    const [ file, setFile] = useState('');
    const [ filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try{
            //posting the file to the server
            const response = await axios.post('/upload', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            // When file gets uploaded success, we get a JSON data from backend as filename, filepath
            const { filename, filepath } = response.data;
            //setting its value to state
            setUploadedFile({ filename, filepath });
        } catch(err) {
            if( err.response.status === 500 ) {
                console.log('problem with server');
            } else {
                console.log(err.response.data.message)
            }
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">
                        {filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>
        </Fragment>
    );
};

export default FileUpload;