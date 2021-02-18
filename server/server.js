// const express = require('express');
// const app = express()
// const { cloudinary } = require('./utils/cloudinary')

// app.use(express.json({limit: '50mb' }))
// app.use(express.urlencoded({limit: '50mb', extended: true}))

// app.get('/api/images', async (req,res) => {
//     const {resources} = await cloudinary.search.expression('folder:tests')
//     .sort_by('public_id', 'desc')
//     .max_results(30)
//     .execute();
//     const publicIds = resources.map(file => file.public_id)
//     res.send(publicIds);
// })
// app.post('/api/upload', async (req, res)=> {
//     try {
//         const fileStr = req.body.data
//         console.log(fileStr)
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'test'
//         })
//         console.log(uploadedResponse)
//         res.json({msg: 'yayayay'})
//     } catch (error){
//         console.log(error)
//         res.status(500).json({err: 'something went wrong'})
//     }
// })


// const port = process.env.port || 3001

// app.listen(3001, () => {
//     console.log(`listening on port ${port}`)
// })

const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:test')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'test',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on 3001');
});
