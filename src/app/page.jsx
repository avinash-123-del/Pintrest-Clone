'use client'
import React, { useEffect,useState } from 'react'
import { collection, getFirestore, query, where ,getDocs} from 'firebase/firestore'
import app from '../../Shared/firebaseConfig'
import PinsLIst from './Components/PinsLIst'

// import { signOut, useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

const MainPage = () => {
  const [listOfPins,setListOfPins] = useState([])
  const db = getFirestore(app)
 const [loading,setLoading] = useState(true)

  // const {data:session} = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   if(!session?.user){
  //     router.push('/login')
  //   }
  // },[session])

  const getUserPins = async() => {
    setLoading(false)
    const q = query(collection(db, 'pinterest-post'));
       
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
          setListOfPins(pins => [...pins,doc.data()])
        });
        setLoading(true)
}
console.log('load status',loading);
useEffect(() => { 
        getUserPins()
},[])

  return (
   <div>
    {
      loading ? 
          <PinsLIst listOfPins={listOfPins}/>
           : <div className='flex flex-col justify-center items-center'>
            <div className="w-20 h-20 rounded-full animate-spin mt-[300px]
           border-x-8 border-solid border-red-800 border-t-transparent m-auto"></div>
           <span className='text-2xl text-center mt-3'>Loading...</span>
           </div>
    }
   </div>
    
  )
}

export default MainPage