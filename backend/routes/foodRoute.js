 import express from "express"
 import { addFood,listFood,removeFood, searchItem} from  "../controllers/foodController.js";
 import multer, { diskStorage } from "multer"//to make image storage



 const foodRouter = express.Router();



 //Image Storage Engine
 const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }

})
const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post('/remove',removeFood)
foodRouter.post("/search",searchItem)

 export default foodRouter;