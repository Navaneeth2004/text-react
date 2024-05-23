import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getdata } from './functions';
import { useState, useEffect } from 'react';

const Homepage = () => {

    const navigate = useNavigate();
    const [jsondata, setJsondata] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          const data = await getdata("https://textjsonserver.onrender.com/data?_limit=10");
   
          setJsondata(data);
      }
      fetchData();
    }, []);

  return (
    <>
      {jsondata.length > 0 && jsondata.map((item, key)=>(
        <button onClick={()=>(navigate(`${item.id}`))} key={key} className='w-screen hover:bg-green-400 flex bg-green-300 pb-3 border-solid border-2 border-gray-500 justify-between'>
            <div className='flex-col ml-2 w-screen'>
                <p className='text-lg mt-2 text-bold'>{item.title.length>32?item.title.substring(0,32)+"...":item.title}</p>
                <div className={`mt-1 p-1 bg-${item.color}-500 rounded-b-lg rounded-tl-lg mr-2`}>{item.tag}</div>
            </div>
        </button>
        ))     
        }
    </>

  )
}

export default Homepage;
