import courseService from "../services/courseService.js";

class CourseController {
    createCourse = async (req, res) => {
        try {
            const instructor = req.user.id;
            const course = await courseService.createCourse(req.body, instructor);
            res.status(200).json({message: "Course created successfully.", course});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    getAllCourses = async (req, res) => {
        try {
            const userId = req.user.id;
            const courses = await courseService.getAllCourses(userId);
            res.status(200).json(courses);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    getCourseById = async (req, res) => {
        try {
            const currentUserId = req.user.id; // or however you store the user
            const course = await courseService.getCourseById(req.params.id, currentUserId);
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
            const userId = req.user.id;

            const courses = await courseService.getEnrolledCourses(userId);
            res.status(200).json({
                success: true,
                message: "Enrolled courses loaded successfully",
                courses
            });
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    getInstructorCourses = async (req, res) => {
        try {
            const instructorId = req.user.id;
            const courses = await courseService.getCoursesByInstructor(instructorId);

            return res.status(200).json({
                success: true,
                data: courses,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}

export default new CourseController();