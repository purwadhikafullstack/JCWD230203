// Import Multer
const {multerUpload} = require('./../library/multer')

// import DeleteFiles
const deleteFiles = require('../helpers/deleteFiles')

const uploadImages = (req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'images', maxCount: 3}])
    multerResult(req, res, function(err){
        try {

            if(err) throw err
            req.files.images.forEach((value) => {
                if(value.size > 1000000000000) throw {message: `${value.originalname} size is to large`, fileToDelete: req.files}
            })
            next()
        } catch (error) {

            if(error.fileToDelete){
                deleteFiles(error.fileToDelete)
            }

            return res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = uploadImages