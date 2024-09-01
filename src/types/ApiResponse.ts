import { Massage } from "@/model/User.model";

export interface ApiResponse {
    success: boolean,
    massages: string,
    isAcceptinMassage?: boolean,
    massage?: Array<Massage>
}