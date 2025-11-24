import courseService from "../services/courseService.js";
import Course from "../models/course.js";

class CourseController {
    createCourse = async (req, res) => {
        try {
            const course = await courseService.createCourse(req.body);
            res.status(200).json({message: "Course created successfully.", course});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    getAllCourses = async (req, res) => {
        try {
            const courses = await courseService.getAllCourses();
            res.status(200).json(courses);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    getCourseById = async (req, res) => {
        try {
            const course = await courseService.getCourseById(req.params.id);
            res.status(200).json(course);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    updateCourse = async (req, res) => {
        try {
            const course = await courseService.updateCourse(req.params.id, req.body);
            res.status(200).json({message: "Course updated successfully.", course});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    deleteCourse = async (req, res) => {
        try {
            const course = await courseService.deleteCourse(req.params.id);
            res.status(200).json({message: "Course deleted successfully.", course});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    enrollUser = async (req, res) => {
        try {
            const userId = req.user._id;
            if (!userId) throw new Error("User ID is required");

            const course = await courseService.enrollUser(req.params.id, userId);
            res.status(200).json({message: "Course enrolled successfully.", course});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    getEnrolledCourses = async (req, res) => {
        try {
            const userId = req.user._id;
            const courses = await courseService.getEnrolledCourses(userId);
            res.status(200).json(courses);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

}

export default new CourseController();