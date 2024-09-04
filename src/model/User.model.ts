import mongoose, { Schema, Document } from "mongoose";
import { blob } from "stream/consumers";

export interface Message extends Document {
    content: string,
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    }
})


export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMassage: boolean,
    message: Message[]
}


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "UserName is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true,
        match: [/.+\@.+\..+/, "please Use A Valid Email address "]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        unique: true,
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code Is Required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Is Required"],

    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMassage: {
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel

