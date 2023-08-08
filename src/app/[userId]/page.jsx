'use client'
import React, { useEffect, useState } from 'react'
import app from '../../../Shared/firebaseConfig'
import { collection, getFirestore, query, where ,getDocs} from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";
import UserInfo from '../Components/UserInfo';
import PinsLIst from '../Components/PinsLIst';
const UserId = ({ params }) => {

    const [userInfo,setUserInfo] = useState(null)
    const [listOfPins,setListOfPins] = useState([])
    const [loading,setLoading] = useState(true)

    const db = getFirestore(app)


    useEffect(() => {
        console.log(params.userId.replace('%40', '@'));    //using regex
        if(params){
            getUserInfo(params.userId.replace('%40', '@')) //passing email id 
        }
    }, [])

    const getUserInfo = async (email) => {
        setLoading(false)

        const docRef = doc(db, 'user', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserInfo( docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const getUserPins = async() => {
        setLoading(false)
        const q = query(collection(db, 'pinterest-post')
            , where("email", "==", userInfo.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
              setListOfPins(pins => [...pins,doc.data()])
            });
        setLoading(true)

    }
    useEffect(() => { 
        if(userInfo){
            getUserPins()
        }
  },[userInfo])

    return (
        <div className='mt-[150px]'>
            {
      loading ? 
      <div>
        {userInfo ? <UserInfo userInfo={userInfo}/> : null}
          <PinsLIst listOfPins={listOfPins}/>
      </div>
            
           : <div className='flex flex-col justify-center items-center'>
            <div className="w-20 h-20 rounded-full animate-spin mt-[200px]
           border-x-8 border-solid border-red-800 border-t-transparent m-auto"></div>
           <span className='text-2xl text-center mt-3'>Loading...</span>
           </div>
    }
{/* <PinsLIst listOfPins = {listOfPins}/> */}

        </div>
    )
}

export default UserId