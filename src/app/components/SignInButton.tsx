"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import Button from 'react-bootstrap/Button';
// import "./globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const SignInButton = () => {
    const {data:session} = useSession();
        return (
            <div>
                 <Button variant="primary"  onClick={() => session?.user ? signOut() : signIn()}>
                    {session?.user ? "Se deconnecter" : "Se connecter"}
                </Button>
        </div>
        )
}


export default SignInButton