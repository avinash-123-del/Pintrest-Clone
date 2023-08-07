'use client'
import { useEffect, useState } from 'react'
import { AiOutlineGooglePlus } from 'react-icons/ai'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginBtn, setLoginBtn] = useState('Login')

    const {data:session} = useSession()
    const router = useRouter()

    useEffect(() => {
        console.log(session);
        if(session?.user){
            router.push('/')
        }
    })
    // const router = useRouter()


    const loginHandler = async (e) => {
        e.preventDefault();

    }


    return (
        <div className='my-8 w-[30%] m-auto'>
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

                <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loginBtn}</button>

                <Link href={'/signup'}>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                </Link>
                <div className='flex justify-center items-center'>
                    <span className='border w-[30%] mx-2'></span>
                    or
                    <span className='border w-[30%] mx-2'></span>
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <button onClick={() => signIn('google')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"><span className='flex  justify-around gap-3'><AiOutlineGooglePlus size={25} />signin with google</span></button>
                </div>


            </form>
        </div>
    )
}

export default LoginForm





