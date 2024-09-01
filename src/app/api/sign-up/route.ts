import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnection";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerifactionEmail";
import { date } from "zod";

export async function POST(request: Request) {
    await dbConnect
    try {

        const { username, email, password } = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username Is Already Token"
            }, {
                status: 400
            })
        }


        const existingUserByEmail = await UserModel.findOne({
            email
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User Already Exist With email "
                }, {
                    status: 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10
            )
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMassage: true,
                massage: []
            })
            await newUser.save()
        }

        const emailResponse = await sendVerificationEmail(
            email,
            username, verifyCode
        )

        if (emailResponse) {
            return Response.json({
                success: false,
                message: emailResponse.massage
            }, {
                status: 501
            })
        }

        return Response.json({
            success: true,
            message: "User Registered Succesfully Verify Your Email"
        }, {
            status: 201
        })



    } catch (error) {
        console.error("Error Registering User ", error)
        return Response.json({
            success: false,
            message: "Error Registering User"
        }, {
            status: 500
        })
    }
}