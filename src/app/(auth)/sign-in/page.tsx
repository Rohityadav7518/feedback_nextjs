'use client'

import { useSession, signIn, signOut } from "next-auth/react"


export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed as{session.user.email} <br />
                <button onClick={() => signOut()}> Sign out</button>

            </>
        )
    }
}