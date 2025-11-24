import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {

    async registerUser(data) {
        const { name, username, password, role } = data;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await User.create({
            name,
            username,
            password: hashedPassword,
            role,
        });
    }

    async loginUser(username, password) {
        const user = await User.findOne({ username });
        if (!user) throw new Error("User does not exist!");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password");

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return {token, user};

    }

    async getUserById(id) {
        return User.findById(id).select("-password");
    }
}

export default new UserService;