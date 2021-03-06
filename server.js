const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());



//Upload endpoint 
app.post('/upload', (req, res) => {
    
    if( req.files === null ) {
        return res.status(400).json({ message: 'No file Uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        //if file successfully uploaded
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
    });
});



app.listen(5000, () => {
    console.log('SERVER STARTED')
});