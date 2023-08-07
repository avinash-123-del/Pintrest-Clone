'use client'
import React from 'react'
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const UserInfo = ({userInfo}) => {
  
  const router = useRouter()
  const {data:session} = useSession()
  function handleLogOut(){
    signOut()
    router.push('/')
    router.refresh()
  }
    console.log("data og user",userInfo);
  return (
    <div className='flex flex-col items-center'>
        <Image src={userInfo.image}
        className='rounded-full ' 
        alt='userImage' width={100} height={100}/>
        <h2 className='text-[30px] font-semibold'>{userInfo.userName}</h2>
        <h2 className='text-gray-400'>{userInfo.email}</h2>

        <div className='flex justify-around items-center gap-4'>
        <button className='bg-gray-300 p-2 px-3 rounded-full mt-5 font-semibold'>Share</button>
        {session?.user.email == userInfo.email ? 
        <button onClick={() => handleLogOut()} className='bg-gray-300 p-2 px-3 rounded-full mt-5 font-semibold'>Logout</button> : null}
        </div> 
    </div>
  )
}

export default UserInfo