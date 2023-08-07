'use client'
import Image from 'next/image'
import { PiMagnifyingGlass, PiBellDuotone, PiChatCircleDotsDuotone } from 'react-icons/pi'
import app from '../../../Shared/firebaseConfig'
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { signIn, useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppContext } from './AppContextProvider';
const Header = () => {

    const { setSearch } = useContext(AppContext)

    const [input, setInput] = useState(false)

    function handleInput() {
        setInput(!input)
    }

    const { data: session } = useSession()


    const db = getFirestore(app)

    // visit the link for code https://firebase.google.com/docs/firestore/manage-data/add-data

    const saveUserData = async () => {

        //for storing the data to firestore database
        //secDoc is a method for data storing
        if (session?.user) {
            try {
                await setDoc(doc(db, "user", session.user.email), { //(db, "cities", "LA")==(db,collectionName,id-> it can be email id for uniqueness)
                    userName: session.user.name,
                    email: session.user.email,
                    image: session.user.image
                });
                console.log('database connected');
            } catch (error) {
                console.log("database error", error);
            }

        }
    }

    const router = useRouter()


    useEffect(() => {
        saveUserData()
    }, [session])

    const handleCreate = () => {
        if (session) {
            router.push('/pin-builder')
        }
        else {
            signIn()
        }
    }

    return (
        <div className='flex sm:justify-between justify-around sm:gap-3 md:gap-2 items-center p-2 sm:p-6 fixed z-10 top-0 bg-white w-screen'>
            <Image src='/logo.png' alt='logo'
                width={60} height={60} onClick={() => router.push('/')}
                className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />

            <button className='bg-black text-white p-3 px-6 rounded-full hidden text-[25px]  md:block'
                onClick={() => router.push('/')}>Home</button>
            <button onClick={() => handleCreate()} className='font-semibold p-3 px-6 rounded-full text-base sm:text-[25px]'
            >Create</button>

            <div className='sm:bg-[#e9e9e9] bg-transparent sm:p-3 sm:px-6 p-2  gap-3 items-center rounded-full sm:w-full flex'>
                <PiMagnifyingGlass onClick={handleInput} className='text-[34px]  text-gray-500 w-5 sm:w-8' />
                <input type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)} className={`bg-transparent outline-none w-full text-sm sm:text-[25px] ${input ? 'inline' : 'hidden'}  sm:inline`} />
            </div>

            {/* <PiMagnifyingGlass className='text-[25px] text-gray-500 md:hidden w-5' /> */}
            {/* <div className='flex'> */}
                <PiBellDuotone className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer' />
                <PiChatCircleDotsDuotone className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer' />
            {/* </div> */}

            {session?.user ?
                <Image src={session.user.image}
                    alt='user-image' width={60} height={60}
                    onClick={() => router.push('/' + session.user.email)}
                    className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
                :
                <button className='font-semibold p-2 px-4 rounded-full'
                    onClick={() => signIn('google')}>Login</button>}

        </div>
    )
}

export default Header