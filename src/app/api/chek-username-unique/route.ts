import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnection";
import { z } from "zod"
import { usernameValidation } from "@/schemas/signUpSchemas";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {


    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParams)
        console.log(result)

        if (!result.success) {
            const usernameErrors = result.error.format()
                .username?._errors || []
            return Response.json({
                success: false,
                message: "Invalid Query Parameter"
            }, {
                status: 400
            })
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username Is Already Taken"
            }, {
                status: 400
            })
        }


        return Response.json({
            success: true,
            message: "Username Is Unique"
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Error cheking Username", error)
        return Response.json({
            success: false,
            message: "Error cheking Username"
        }, {
            status: 500
        })
    }


}