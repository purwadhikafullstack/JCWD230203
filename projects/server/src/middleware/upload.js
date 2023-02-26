// Import Multer
const {multerUpload} = require('./../lib/multer')

const {sequelize} = require('./../sequelize/models/index')
// import DeleteFiles
const deleteFiles = require('./../helpers/deleteFiles')


const uploadImages = async(req, res, next) => {
    const t = await sequelize.transaction()
    const multerResult = multerUpload.fields([{name: 'ktp_path', maxCount: 3}])

    multerResult(req, res, function(err){

        try {
            console.log("masuk upload")
            if(err) throw err
            // check if files from BE is empty
            if (Object.keys(req.files).length === 0) {
                throw { message: 'Please upload your photo' };
            }
            
            req.files.ktp_path.forEach((value) => {
                if(value.size > 1000000000000) throw {message: `${value.originalname} size is to large`, fileToDelete: req.files}
            })
            t.commit();
            next()

        } catch (error) {
           t.rollback();
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