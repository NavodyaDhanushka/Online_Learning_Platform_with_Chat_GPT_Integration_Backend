import Course from "../models/course.js";
import User from "../models/user.js";

class CourseService {

    async createCourse(data, instructorId) {
        const course = new Course({...data, instructor: instructorId});
        await course.save();
        return course;
    }

    async getAllCourses(currentUserId) {

        const courses = await Course.find()
            .populate("instructor", "name username role")
            .populate("enrolledUsers", "name username role");


        const updatedCourses = courses.map(course => {
            const isEnrolled = course.enrolledUsers.some(
                user => user._id.toString() === currentUserId.toString()
            );
            return {
                ...course.toObject(),
                isEnrolled
            };
        });

        return updatedCourses;
    }


    async getCourseById(id, currentUserId) {
        const course = await Course.findById(id)
            .populate("instructor", "name username role")
            .populate("enrolledUsers", "name username role");

        if (!course) throw new Error("Course not found");

        const isEnrolled = course.enrolledUsers.some(
            (user) => user._id.toString() === currentUserId
        );

        return {
            ...course.toObject(),
            isEnrolled
        };
    }


    async updateCourse(courseId, updateData) {
        const course = await Course.findByIdAndUpdate(courseId, updateData, {new: true, runValidators: true});
        if (!course) throw new Error("Course not found");
        return course;
    }

    async deleteCourse(id) {
        const course = await Course.findById(id);
        if (!course) throw new Error("Course not found");

        await Course.findByIdAndDelete(id);
        return course;
    }

    async enrollUser(courseId, userId) {
        const course = await Course.findById(courseId);
        if (!course) throw new Error("Course not found");

        if (!Array.isArray(course.enrolledUsers)) course.enrolledUsers = [];

        const alreadyEnrolled = course.enrolledUsers.some(id => id.toString() === userId.toString());
        if (!alreadyEnrolled) {
            course.enrolledUsers.push(userId);
            await course.save();
        }

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (!Array.isArray(user.enrolledCourse)) user.enrolledCourse = [];
        if (!user.enrolledCourse.includes(courseId)) {
            user.enrolledCourse.push(courseId);
            await user.save();

        }
        return course;
    }

    async getEnrolledCourses(userId) {

        console.log("User Id:", userId);
        return await Course.find({enrolledUsers: userId})
            .populate("instructor", "name username role")
            .populate("enrolledUsers", "name username role");
    }

    async getCoursesByInstructor(instructorId) {
        try {
            const courses = await Course.find({instructor: instructorId})
                .populate("instructor", "name username role");
            return courses;
        } catch (error) {
            throw new Error("Error fetching courses: " + error.message);
        }
    }
}

export default new CourseService();