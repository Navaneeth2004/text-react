import React from 'react'
import { getdata } from './functions'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Playlistitems = () => {

  const navigate = useNavigate();
  const [jsondata, setJsondata] = useState([]);
  const [changedata, setchangedata] = useState(0);
  const [jsondatadisplayed, setjsondatadisplayed] = useState([]);
  const [jsonplaylistdata, setjsonplaylistdata] = useState([]);
  const [jsoncolor, setjsoncolor] = useState([]);
  const [jsontitle, setjsontitle] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
        let dataitem = []
        const data = await getdata("http://localhost:8000/data");
        const data1 = await getdata(`http://localhost:8000/playlist/${id}`);
 
        setJsondata(data);
        setjsoncolor(data1.color);
        setjsontitle(data1.title);

        dataitem = data.filter(i=>(data1.items.includes(i.id)))
        console.log(dataitem, " this is dataitem")
        setjsonplaylistdata(dataitem)

    }
    fetchData();
  }, []);
  
  useEffect(()=>{

      const displaythings = [];

      if(jsonplaylistdata.length>0)
      {

          for(let i=changedata;i<changedata+10;i++)
          {
              if(jsonplaylistdata[i])
              {
                  console.log(jsonplaylistdata[i])
                  displaythings.push(jsonplaylistdata[i])
              }

          }
  
          setjsondatadisplayed(displaythings);
      }


  },[changedata,jsondata])

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
        if(changedata+10>jsonplaylistdata.length)
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
    <div>
      <div>
        <div className={`font-bold bg-${jsoncolor}-300 border-4 border-solid border-black text-center`}>
          <p className='text-wrap break-words mt-3 text-2xl ml-2 mr-2 mb-3'>{jsontitle}</p>
        </div>
        {
        jsondatadisplayed.map((item,key)=>
        (
        <button onClick={()=>(navigate(`/${item.id}`))} key={key} className='w-screen hover:bg-green-400 flex bg-green-300 pb-3 border-solid border-2 border-gray-500 justify-between'>
            <div className='flex-col ml-2 w-screen'>
                <p className='text-lg mt-2'>{item.title.length>32?item.title.substring(0,32)+"...":item.title}</p>
                <div className={`mt-1 p-1 bg-${item.color}-500 rounded-b-lg rounded-tl-lg mr-2`}>{item.tag}</div>
            </div>
        </button>
        ))     
        }
      </div>
      <div>
          {
            jsonplaylistdata.length>10?
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

export default Playlistitems