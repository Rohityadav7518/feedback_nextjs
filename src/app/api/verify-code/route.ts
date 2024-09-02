import dbConnect from "@/lib/dbConnection";
import UserModel from "@/model/User.model";


export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json({
                success: false,
                messaage: "User Not Found"
            }, {
                status: 500
            })
        }

        const isCodeValid = user.verifyCode == code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true,
                await user.save()

            return Response.json({
                success: true,
                messaage: "Account Verified Succesfully"
            }, {
                status: 200
            })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                messaage: "Verification Code has Expired Please Sign-Up Again"
            }, {
                status: 400
            })
        } else {
            return Response.json({
                success: false,
                messaage: "Incorrect Verification Code"
            }, {
                status: 400
            })
        }

    } catch (error) {
        console.error("Error Verifying User", error)
        return Response.json({
            success: false,
            messaage: "Erro Verifying User"
        }, {
            status: 500
        })
    }
}