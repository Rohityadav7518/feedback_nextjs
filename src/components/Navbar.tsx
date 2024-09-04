'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User } from "next-auth"
import { Button } from "@react-email/components"

const Navbar = () => {
    const { data: session } = useSession()
    const user: User = session?.user as User



    return (
        <>
            <nav>
                <div>
                    <a href="#">
                        mysterymassage

                    </a>{
                        session ? (
                            <>

                                <span>welcome,{user?.username || user?.email}</span>
                                <Button onClick={() => signOut()}  > Log Out</Button></>
                        ) : (<Link href='/sign-in' > <Button>Login</Button> </Link>)
                    }
                </div>

            </nav>

        </>
    )



}

export default Navbar