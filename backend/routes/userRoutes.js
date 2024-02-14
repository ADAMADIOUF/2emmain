import expres from "express"
const router = expres.Router()
import{authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,getUsers,getUserById,deletedUser,updatedUser} from "../controllers/userControllers.js"
import { admin, protect } from "../middleware/authMiddleware.js"
router.route("/").post(registerUser).get(protect,admin,getUsers)
router.post("/logout",logoutUser)
router.post('/login', authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router
  .route('/id')
  .delete(protect, admin, deletedUser)
  .get(protect, admin, getUserById)
  .put(protect, admin,updatedUser)



export default router