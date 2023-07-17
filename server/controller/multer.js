const multer = require('multer')
const uuid = require('uuid')


const profileStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/profile')
    },
    filename:function(req,file,cb){
        console.log('[+]Uploaded file name ',file)
        req.filename =uuid.v4()+".jpg"
        cb(null,req.filename)
    }
})



const profileUpload = multer({
    limits:{fileSize:5*1024*1024},
    storage:profileStorage,
    fileFilter:function(req,file,cb){
        console.log("[+]Profile upload File Filter Function Execution");
        if(file.mimetype.split('/')[0]==="image"){
            return cb(null,true)
        }
            
        else{
            var err='Invalid Image Type! Only jpg|jpeg|png images can be uploaded.';
            return cb(err, false);
        }
        }
})


exports.profileStorage=(req,res,next)=>{
    profileUpload.single("profilePhoto")(req,res,(err)=>{
        if(err){
            console.log('[+]File upload error ',err)
            res.json({
                error:true,
                message:err
            })
        }
        else{
            next()
        }

    })
}

const resumeStorage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/resume")
    },
    filename:function(req,file,cb){
        console.log("[+]Uploaded file name ",file)
        req.filename =uuid.v4()+".pdf"
        cb(null,req.filename)
    }
})


const resumeUpload = multer({
    storage:resumeStorage,
    fileFilter:function(req,file,cb){
        console.log("[+]File filter function execution")
        console.log(file.mimetype)
        if (file.mimetype === "application/pdf"){
            return cb(null,true);
        }else{
        const error="Only pdf files are allowed!"
        cb(error,false)
        }
    }
})

exports.resumeStorage=resumeUpload.single("resume")


