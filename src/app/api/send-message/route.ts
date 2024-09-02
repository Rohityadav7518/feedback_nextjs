import dbConnect from "@/lib/dbConnection";
import UserModel from "@/model/User.model";
import { Massage } from "@/model/User.model"


export async function POST(request: Request) {
    await dbConnect()
    const { username, content } = await request.json()

    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                message: "User Not Found"

            }, {
                status: 404
            })
        }

        if (!user.isAcceptingMassage) {
            return Response.json({
                success: false,
                message: " user is  Not accepting message"
            }, { status: 403 })
        }


        const newMessage = { content, createdAt: new Date() }
        user.massage.push(newMessage as Massage)
        await user.save()

        return Response.json({
            success: true,
            message: "  Message Sent SUccessfully"
        }, { status: 200 })

    } catch (error) {
        console.log("Errro Adding messsage", error)
        return Response.json({
            success: false,
            message: "  Internal server Error"
        }, { status: 500 })
    }
}