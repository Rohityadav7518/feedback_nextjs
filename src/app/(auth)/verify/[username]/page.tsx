'use client'

import { useParams, useRouter } from "next/navigation";
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const verifyAccount = () => {
    const router = useRouter()
    const param = useParams<{ username: string }>()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: param.username,
                code: data.code
            })

            toast({
                title: 'success',
                description: response.data.message
            })

            router.replace('/sign-in')
        } catch (error) {
            console.log("USer Sign in Error", error)
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.massage
            toast({
                title: 'signup Failed',
                description: errorMessage,
                variant: "destructive"
            })

        }
    }

    return (
        <>

            <div className="  flex justify-center items-center min-h-screen bg-gray-100 " >
                <div className="w-full   max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md " >
                    <div className="text-center">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Verification Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="code" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default verifyAccount