import Course from "../models/course.js";
import course from "../models/course.js";
import User from "../models/user.js";

class CourseService {

    async createCourse(data) {
        const course = new Course(data);
        await course.save();
        return course;
    }

    async getAllCourses() {
        return await course.find()
            .populate("instructor", "name username role")
            .populate("enrolledUsers", "name username role");
    }

    async getCourseById(id) {
        const course = await Course.findById(id)
            .populate("instructor", "name username role")
            .populate("enrolledUsers", "name username role");
        if (!course) throw new Error("Course not found");
        return course;
    }

    async updateCourse(courseId, updateData) {
        const course = await Course.findByIdAndUpdate(courseId, updateData, { new: true, runValidators: true });
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
        if(!user.enrolledCourse.includes(courseId)) {
            user.enrolledCourse.push(courseId);
            await user.save();

        }
        return course;
    }

    async getEnrolledCourses(userId) {
        return await Course.find({ enrolledUsers: userId})
            .populate("instructor", "name username role")
            .populate("enrolledUsers", "name username role");
    }
}

export default new CourseService();