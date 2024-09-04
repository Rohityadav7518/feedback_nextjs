'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { signInSchema } from '@/schemas/signInSchemas'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { signUpSchema } from '@/schemas/signUpSchemas'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const page = () => {


    const [username, setUsername] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isChekingUsername, setIsChekingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debounced = useDebounceCallback(setUsername, 300)

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',

        }

    })

    useEffect(() => {
        const chekUsernameUnique = async () => {
            if (username) {
                setIsChekingUsername(true)
                setUsernameMessage('')
                try {
                    const response = await axios.get(`/api/check-username-unique?usernamee=${username}`)
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(
                        axiosError.response?.data.massages ?? "Error Cheking Username"
                    )
                } finally {
                    setIsChekingUsername(false)
                }
            }
        }
        chekUsernameUnique()
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>(`/api/sign-up`, data)
            toast({
                title: 'success',
                description: response.data.massages
            })
            router.replace(`/verify/${username}`)
            setIsSubmitting(false)
        } catch (error) {
            console.log("USer Sign in Error", error)
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.massage
            toast({
                title: 'signup Failed',
                description: errorMessage,
                variant: "destructive"
            })
            setIsSubmitting(false)
        }
    }
    return (

        <>
            <div className="  flex justify-center items-center min-h-screen bg-gray-100 " >

                <div className="w-full   max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md " >
                    <div className="text-center" >
                    </div>
                    < Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6' >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username </FormLabel>
                                        < FormControl >
                                            <Input placeholder="username" {...field} onChange={(e) => {
                                                field.onChange(e)
                                                debounced(e.target.value)
                                            }} />
                                        </FormControl>
                                        {isChekingUsername && <Loader2 className='animate-spin' />}
                                        <p className={` text-sm ${usernameMessage === 'Username is unique' ? 'text-green-505' : 'text-red-500'}`}  >  test {usernameMessage} </p>

                                        < FormMessage />
                                    </FormItem>
                                )}
                            />
                            < FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email </FormLabel>
                                        < FormControl >
                                            <Input placeholder="Email" {...field}
                                            />
                                        </FormControl>

                                        < FormMessage />
                                    </FormItem>
                                )}
                            />
                            < FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password </FormLabel>
                                        < FormControl >
                                            <Input type='password' placeholder="Password" {...field}
                                            />
                                        </FormControl>

                                        < FormMessage />
                                    </FormItem>
                                )}
                            />

                            < Button type='submit' disabled={isSubmitting} >
                                {
                                    isSubmitting ? (<>
                                        <Loader2 className='  mr-2 h-4 w-4 animate-spin ' /> Please Wait </>) : ('SignUp')
                                }                            </Button>
                        </form>

                    </Form>
                    < div className="text-center mt-4  " >
                        <p>Already A Member? {''} <Link href={'/sign-in'} className='text-blue-600 hover:text-blue-800 ' >
                            Sign In <Link />  </p >
                    </div>

                </div>
            </div >
        </>
    )
}

export default page