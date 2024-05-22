import React from 'react'
import { useEffect, useState } from 'react'
import { getdata } from './functions';
import { useNavigate } from 'react-router-dom';

const Playlist = () => {
    const navigate = useNavigate();
    const [jsonplaylist,setjsonplaylist] = useState([]);
    const [jsondata,setjsondata] = useState([]);

    useEffect(() => {
      
        async function gotdata() 
        {
            const data = await getdata("http://localhost:8000/playlist");
            setjsonplaylist(data);

            const data1 = await getdata("http://localhost:8000/data");
            setjsondata(data1);

            

        }
 
        gotdata();

    }, [])
    

  return (
    <>              
        <button onClick={()=>(navigate(`all`))} className={`w-screen hover:bg-white-400 flex bg-white-300 pb-3 border-solid border-2 border-gray-500`}>
            <div className='flex ml-2 w-screen justify-between'>
                <p className='text-lg mt-4'>All ({jsondata.length})</p>
            </div>
        </button>
        {
            jsonplaylist.map((item)=>
            (

              <button onClick={()=>(navigate(`${item.id}`))} key={item.id} className={`w-screen hover:bg-${item.color}-400 flex bg-${item.color}-300 pb-3 border-solid border-2 border-gray-500`}>
                  <div className='flex ml-2 w-screen justify-between'>
                      <p className='text-lg mt-4'>{item.title} ({item.items.length})</p>
                  </div>
              </button>
            ))     
        }
    </>

  )
}

export default Playlist