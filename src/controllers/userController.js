import bcrypt from "bcryptjs";
import user from "../models/user.js";
import userService from "../services/userService.js";
import generateToken from "../utils/generateToken.js";

class UserController {
    register = async (req, res) => {
        try {
            const user = await userService.registerUser(req.body);

            if (!user) {
                return res.status(400).json({message:"User not created"});
            }

            res.status(201).json({message:"User logged in successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    username:user.username,
                    role:user.role
                },
            });

        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const { user, token } = await userService.loginUser(username, password);

            res.status(200).json({message:"User logged in successfully",
                user: {id: user._id,
                    name: user.name,
                    username:user.username,
                    role:user.role
                },
                token
            });
        } catch (error) {
            res.status(401).json({message: error.message});
        }
    };

    profile = async (req, res) => {
        try {
            res.json(req.user);
        } catch (error) {
            res.status(401).json({message: "Cannot get user profile"});
        }
    };
}

export default new UserController;