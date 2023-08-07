'use client'
import React, { useState } from 'react'
import {signIn} from 'next-auth/react'
// import Link from 'next/link'
const LoginForm = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword]  = useState('')

    const loginHandler = async(e) => {
        e.preventDefault();
        
    //import email password and provider that we are using
    try {
        
        const data = await signIn('credentials' , {
            redirect: false,
            email,
            password
        })

        console.log(data);
          
    } catch (error) {
        console.log("error aya",error);
    }
        
    }
    return (

        <form onSubmit={loginHandler}>

            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        </form>

    )
}

export default LoginForm