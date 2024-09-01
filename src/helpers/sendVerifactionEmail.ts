import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";
import { Resend } from "resend";



export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {

    try {
        await resend.emails.send({
            from: "",
            to: '',
            subject: "",
            react: VerificationEmail({ username, otp: verifyCode })
        })

        return {
            success: true, massages: 'Verification Email Send Successfully'
        }
    } catch (emailError) {
        console.error("Error Sending Verification Email  ", emailError)
        return { success: false, massages: 'failed to send Verification Email ' }

    }
}