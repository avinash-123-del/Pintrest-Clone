import React,{useContext} from 'react'

import PinItems from './PinItems';
import { AppContext } from './AppContextProvider';

const PinsLIst = ({listOfPins}) => {
    
  const {search} = useContext(AppContext)

console.log(listOfPins);    
    return (
        <div className=' mt-24 columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4  w-full '>

            {
                listOfPins.filter((item) => (
                    search.toLowerCase() ==='' ? item : 
                    item.title.toLowerCase().includes(search)
                    )).map((item,index) => (
                        <PinItems key={index} pin={item} />
                        ))
                    }
        </div>
    )
}

export default PinsLIst