'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
const SignupForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signBTn, setSignBtn] = useState(true)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSignBtn(!signBTn)

    try {

      if (password === confirmPassword) {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ email, password, confirmPassword })
        })

        if (res.ok) {
          console.log('user registered');
          toast.success('user registered');
          router.push('/login')
        }
      }
      else {
        toast.error('Password did not match')
      }


    } catch (error) {
      console.log(error);
    }

  }


  return (

    <form onSubmit={handleSubmit}>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="youremail@mail.com" required />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='.................' required />
      </div>

      <div className="mb-6">
        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
        <input type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          id="repeat-password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='.................' required />
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mr-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{setSignBtn ? 'Sign up ' : 'Sign up ...'}</button>

      <Link href={'/login'}>
        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
      </Link>
    </form>
  )
}

export default SignupForm