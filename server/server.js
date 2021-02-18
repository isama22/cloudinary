const express = require('express');
const app = express()
const { cloudinary } = require('./utils/cloudinary')

app.use(express.json({limit: '50mb' }))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.post('/api/upload', async (req, res)=> {
    try {
        const fileStr = req.body.data
        console.log(fileStr)
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'test'
        })
        console.log(uploadedResponse)
        res.json({msg: 'yayayay'})
    } catch (error){
        console.log(error)
        res.status(500).json({err: 'something went wrong'})
    }
})


const port = process.env.port || 3001

app.listen(3001, () => {
    console.log(`listening on port ${port}`)
})