import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/model/User.model";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";


export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    const userId = user._id
    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMassage: acceptMessages },
            {
                new: true
            })
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed To Update User to accept Message"
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "Messsage aceeptance status updated Successfully",
            updatedUser
        }, { status: 500 })

    } catch (error) {
        console.log("failed To Update User to accept Message");
        return Response.json({
            success: false,
            message: "failed To Update User to accept Message"
        }, { status: 500 })
    }
}


export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    const userId = user._id
    try {
        const foundUser = await UserModel.findById(userId)

        if (!foundUser) {
            return Response.json({
                success: false,

                message: "User Not Found"
            }, {
                status: 202
            })
        }
        return Response.json({
            success: false,
            isAcceptingMessages: foundUser.isAcceptingMassage
        }, {
            status: 202
        })
    } catch (error) {
        console.log("failed To Update User to accept Message");
        return Response.json({
            success: false,
            message: " Error is getting message acceptance status"
        }, { status: 500 })
    }
}
