import express from 'express';
import courseController from "../controllers/courseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware("instructor"), courseController.createCourse);
router.get('/', courseController.getAllCourses);

router.get('/enrolled', authMiddleware, roleMiddleware("student"), courseController.getEnrolledCourses);
router.put('/enroll/:id', authMiddleware, roleMiddleware("student"), courseController.enrollUser);
router.get('/instructor', authMiddleware, roleMiddleware("instructor"), courseController.getInstructorCourses)

router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware, roleMiddleware("instructor"), courseController.updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware("instructor"), courseController.deleteCourse);


export default router;