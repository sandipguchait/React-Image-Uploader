import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {

    const [ file, setFile] = useState('');
    const [ filename, setFilename ] = useState('Choose File');
    const [ uploadedFile, setUploadedFile ] = useState({});
    const [ message, setMessage ] = useState('');
    const [ uploadPercentage, setUploadPercentage ] = useState(0);

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
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round(( progressEvent.loaded * 100 ) /
                    progressEvent.total
                    )))

                    // clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                },
            });
            // When file gets uploaded success, we get a JSON data from backend as filename, filepath
            const { fileName, filePath } = response.data;
            //setting its value to state
            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded')

        } catch(err) {
            if( err.response.status === 500 ) {
                setMessage('problem with server');
            } else {
                setMessage(err.response.data.message)
            }
        }
    };

    return (
        <Fragment>
            { message && <Message message={message}/> }
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">
                        {filename}
                    </label>
                </div>
                <Progress percentage={uploadPercentage} />
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>
            { uploadedFile ? (<div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{ uploadedFile.fileName }</h3>
                    <img style={{ width: '100%'}} src={uploadedFile.filePath} alt=""/>
                </div>
            </div>) : null }
        </Fragment>
    );
};

export default FileUpload;