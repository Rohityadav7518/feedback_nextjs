import dbConnect from "@/lib/dbConnection";
import mongoose from "mongoose";
import { authOptions } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import UserModel from "@/model/User.model";
import { User } from "next-auth";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {

    const messageId = params.messageid
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    try {
        const updateResult = await UserModel.updateOne({
            _id: user._id
        },
            { $pull: { message: { _id: messageId } } })
        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: "Mesage not Found or Already Deleted"
            }, { status: 404 })
        }
        return Response.json({
            success: true,
            message: "Mesage  Deleted Successfully "
        }, { status: 200 })

    } catch (error) {
        console.log("Errror Deleting Message")
        return Response.json({
            success: false,
            message: "Eroor Deleting Message"
        }, { status: 500 })
    }
}
