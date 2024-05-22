import React from 'react'
import { getdata } from './functions'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Note = () => {
  const [jsondata, setJsondata] = useState([]);
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
        const data = await getdata(`http://localhost:8000/data/${param.id}`);
        console.log(data);
        setJsondata([data]);
    }
    fetchData();  
  }, [param.id]);

  return (
  <>
    {
      jsondata.map((item,index)=>(
        <div key={index}>
          <div className='font-bold bg-green-300 border-4 border-solid border-black text-center'>
            <p className='mt-3 text-2xl ml-2 mr-2 mb-2'>{item.title}</p>
          </div>
          <div className={`ml-5 mr-5 bg-${item.color}-200 border-4 border-solid border-black text-center`}>
            <p>{item.tag}</p>
          </div>
          <div className='mt-8 mr-3 ml-4 text-wrap overflow-x'>
            <p className='w-full text-wrap break-words'>{item.des}</p>
          </div>
          </div>  

      ))
    }
  </>

  )
}

export default Note