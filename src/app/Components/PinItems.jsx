import React from 'react'
import Image from 'next/image'
import { LuDownload } from 'react-icons/lu'
const PinItems = ({ pin }) => {


  return (
    <div className='break-inside-avoid'>
      <div className='m-2 py-4 ' >
        <div className='relative group text-stone-50 '>
          <Image className='rounded-3xl group-hover:brightness-50 cursor-pointer' src={pin.image} width={400} height={600} alt='image' />
          <a
            className='hidden group-hover:absolute bottom-5 group-hover:inline right-5'
            href={pin.image} download='image.jpg'>
            <LuDownload size={30} color='#d3d3d3' /></a>
        </div>
        <h2 className='py-2 px-3 font-semibold text-lg'>{pin.title}</h2>
        <div className='text-stone-400 text-sm flex items-center justify-start gap-3 px-3 mb-'>
          <Image className='rounded-full' src={pin.userImage} width={40} height={40} alt='userimage' />
          <p>{pin.desc.substr(0, 40) + '...'}</p>
        </div>
      </div>
    </div>

  )
}

export default PinItems


