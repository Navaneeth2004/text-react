import React from 'react'
import { json, useNavigate } from 'react-router-dom';
import { getdata } from './functions';
import { useState, useEffect } from 'react';
import Navbar from './navbar.jsx';

const All = () => {

    const navigate = useNavigate();
    const [jsondata, setJsondata] = useState([]);
    const [changedata, setchangedata] = useState(0);
    const [jsondatadisplayed, setjsondatadisplayed] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          const data = await getdata("http://localhost:8000/data");
   
          setJsondata(data);

      }
      fetchData();
    }, []);
    
    useEffect(()=>{

        const displaythings = [];

        if(jsondata.length>0)
        {

            for(let i=changedata;i<changedata+10;i++)
            {
                if(jsondata[i])
                {
                    console.log(jsondata[i])
                    displaythings.push(jsondata[i])
                }

            }
    
            setjsondatadisplayed(displaythings);
        }


    },[changedata,jsondata])

    console.log(jsondatadisplayed, " this is jsondatadisplayed")


    //to go to next page or below page
    const handlechangenumber = (number) =>{

        if(number==0)
        {
            if(changedata-10<0)
            {
                console.log("beelow 0 items doesnt exist")
            }
            else
            {
                setchangedata(changedata-10)
                console.log(changedata, " you clicked to go below");
            }

        }
        if(number==1)
        {
            if(changedata+10>jsondata.length)
            {
                console.log("above jsondata.length items doesnt exist")
            }
            else
            {
                setchangedata(changedata+10)
                console.log(changedata, " you clicked to go above");
            }

        }
    }

  return (
    <div className='flex flex-col justify-between h-screen bg-yellow-100'>
        <div>
            <Navbar/>
            <div className={`font-bold bg-white-300 border-4 border-solid border-black text-center`}>
                <p className='text-wrap break-words mt-3 text-2xl ml-2 mr-2 mb-3'>All</p>
            </div>
            {
            jsondatadisplayed.map((item, key)=>
            (
            <button onClick={()=>(navigate(`/${item.id}`))} key={key} className='w-screen hover:bg-green-400 flex bg-green-300 pb-3 border-solid border-2 border-gray-500 justify-between'>
                <div className='flex-col ml-2 w-screen'>
                    <p className='text-lg mt-2 text-bold'>{item.title.length>32?item.title.substring(0,32)+"...":item.title}</p>
                    <div className={`mt-1 p-1 bg-${item.color}-500 rounded-b-lg rounded-tl-lg mr-2`}>{item.tag}</div>
                </div>
            </button>
            ))  
            }
        </div>
        <div>
            {
                jsondata.length>10?
                <div className='flex justify-center'>
                    <div className='mt-2 mb-2 flex w-20 justify-between '>
                        <button onClick={()=>handlechangenumber(0)} className='text-2xl hover:bg-blue-200'>←</button>
                        <button className='text-2xl'>{changedata}</button>
                        <button onClick={()=>handlechangenumber(1)} className='text-2xl hover:bg-blue-200'>→</button>
                    </div>
                </div>
                :""
            }
        </div>

    </div>

  )
}

export default All;