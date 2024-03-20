import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDatabase from "./database/db.js";
import { User } from "./models/user.model.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import bcrypt from "bcrypt"

const app = express()

dotenv.config({
    path: './.env'
})

app.use(cookieParser());
app.use(cors())

// app.use(cors({
//     origin: "http://localhost:5173/",
//     credentials: true
// }))
// {
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }

// dotenv.config()

connectDatabase()

// Middleware to parse JSON bodies
app.use(express.json());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        // fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})


app.post('/api/user/register',
    // upload.fields([
    //     {
    //         name: "avatar",
    //         maxCount: 1
    //     }
    // ]),
    upload.single('avatar'),

    async (req, res) => {
        try {
            console.log(req.body);
            const { username, email, fullname, password } = req.body;

            if (username == "" || email == "" || password == "" || fullname == "") {
                throw new Error("All fields are required");
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new Error('Email is already in use');
            }

            // if (!req.files) {
            //     throw new Error("Avatar is required")
            // }

            // const avatarLocalPath = req.files?.avatar[0]?.path
            console.log(req.file);
            const avatarLocalPath = req.file?.path

            if (!avatarLocalPath) {
                throw new Error("Avatar file is required")
            }
        
            const avatar = await uploadOnCloudinary(avatarLocalPath)

            // const user = await User.create({ username, email, fullname, avatar, password });
            const user = await User.create({
                username,
                email,  
                fullname,
                avatar: avatar?.url || "",
                password,
            })

            if (!user) {
                throw new Error('User register unsuccessful');
            }

            const createdUser = await User.findById(user._id).select(
                "-password -refreshToken"
            )

            console.log("All done");
            res.status(200).json({
                statusCode: 200,
                data: createdUser,
                message: "User registration successful"
            });
        } catch (error) {
            console.log("Error registering user: ", error.message);
            res.status(500).json({
                statusCode: 500,
                message: "Error registering user: " + error.message
            });
        }
    }
);

// app.post("api/user/login", async (req, res) => {
//     try{
//         console.log(req.body);
//         const { email, password } = req.body

//         if (email == "") {
//             throw new Error("Enter Email Id..")
//         }

//         // Find user
//         const user = await User.findOne({ email })

//         if (!user) {
//             throw new Error("No user with this email id")
//         }

//         // const passwordCheck = await bcrypt.compare(password, user.password)
//         // const passwordCheck = await user.isPasswordCorrect(password)

//         const validPassword = await bcrypt.compare(
// 			req.body.password,
// 			user.password
// 		)

//         if (!validPassword){
//             throw new Error("Incorrect password")
//         }

//         console.log("Successful login");
//         res.status(200).json({
//             data: user,
//             message: "Login successful"
//         })
//     } catch(error){
//         res.status(400).json({
//             message: "Error: " + error.message
//         })
//     }
// });


// app.post('api/user/register', async (req, res) => {
//     try {
//         console.log(req.body);
//         const { name, email, password } = req.body

//         // if (name == "" || email == "" || password == ""){
//         //     throw new Error("All fields are required")
//         // }
//         if (!name || !email || !password) {
//             throw new Error("All fields are required");
//         }

//         const existingUser = await User.findOne({email})

//         if (existingUser) {
//             throw new Error('Email is already in use')
//         }

//         const user = await User.create({ name, email, password })

//         if (!user) {
//             throw new Error('User register unsuccessful')
//         }

//         console.log("All done");
//         res.send(200, json({
//             statusCode: 200,
//             data: user,
//             message: "User login successful"
//         }))
//     } catch (error) {
//         console.log("Some error occurred while registering user");
//     }
// })

app.post("/api/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email == "" || password == "") {
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("No user found with this email");
        }

        const passwordCorrect = await user.isPasswordCorrect(password);

        if (!passwordCorrect) {
            throw new Error("Incorrect password");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        const loggedInUser = await User.findById(user._id).select("-password")

        const options = {
            httpOnly: true,
            secure: true
        }

        console.log("Successful login");
        console.log(accessToken);
        console.log(refreshToken);
        // res.status(200).json({
        //     data: [loggedInUser, accessToken, refreshToken],
        //     message: "Login successful"
        // });
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: loggedInUser, accessToken, refreshToken,
                message: "Login done"
            }
            )
    } catch (error) {
        console.error("Error during login:", error);
        res.status(400).json({
            message: "Login failed. " + error.message
        });
    }
});

app.post("/api/user/logout", async (req, res) => {
    // console.log(req.cookies?.accessToken);
    // console.log(req.cookies?.refreshToken);
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            throw new Error("Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new Error("Invalid Access Token");
        }

        console.log(user)
        await User.findByIdAndUpdate(
            user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        console.log("Logout success");
        res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                message: "User logged out"
            });
    } catch (error) {
        res
            .status(401)
            .json({
                message: error.message || "Invalid access token"
            });
    }
});

app.post("/api/user/forgot-password", async (req, res) => {
    try {
        const email = req.body.email

        if (email == "") {
            throw new Error("Please provide an email address")
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("No user found with this mail id.")
        }

        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "1h"} )
        const mailDetails = {
            from: {
                name: "Srivastava Group of Industries",
                address: process.env.USER_EMAIL
            },
            to: email,
            subject: "Mail regarding password reset",
            text: "Here is your link to reset password:-" + `http://localhost:5173/reset-password/${user._id}/${token}`,
            // html: "<h1>Hello World</h1><p>This is a test email.</p>",
        }

        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email has been sent successfully..");
            } catch (error) {
                console.log(error);
            }
        }
        sendMail(transporter, mailDetails)

        res.status(200).json(
            {
                message: "Email sent successfully"
            }
        )
    } catch (error) {
        res.status(401).json(
            {
                message: "Error occurred while sending the email" + error
            }
        )
    }
})

app.post("/api/user/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body; // Extract password from request body

    if (!token || !id) {
        return res.status(400).json({ error: "Details required" });
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ error: "Token not verified" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user's password in the database
        await User.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: "Error changing password" });
    }
})
// app.post("/api/user/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params
//     const password = req.body

//     if (token == "" || id == ""){
//         throw new Error("Details required..")
//     }

//     const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
//     if (!decodedToken){
//         throw new Error("Token not verified")
//     }

//     // const newPass = bcrypt.hash(password, 12)

//     // User.findByIdAndUpdate( {_id: id}, {password: newPass})
//     bcrypt.hash(password, 12)
//     .then(hash => {
//         User.findByIdAndUpdate( {_id: id}, {password: hash} )
//         .then(res.status(200).json({
//             message: "Password changed successfully"
//         }))
//         .catch(console.log(error))
//         .catch(err => res.send({Status: err}))
//     })


// })
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running successfully on port " + process.env.PORT);
})