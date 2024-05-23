import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'

import { insert, getdata, update } from './functions';

const Create = () => {
  const navigate = useNavigate();
  const [jsondata, setJsondata] = useState([]);
  const [jsondataid, setjsondataid] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getdata("https://textjsonserver.onrender.com/playlist");
 
        setJsondata(data);
    }
    fetchData();
  }, []);
    
  const actionhandle=(event)=>{

    event.preventDefault();

    const title=event.target.elements.title.value
    const playlist=Array.from(event.target.elements.playlist.options)
                  .filter(option => option.selected)
                  .map(option => option.value)
    const tag=event.target.elements.tag.value
    const color=event.target.elements.color.value
    const des=event.target.elements.des.value
    let realtag=0
    let realplaylist=[]

    if(playlist.length>0)
    {
      realtag=1
      jsondata.map(i=>{

        if(playlist.includes(i.title))
        {
          realplaylist.push(i.id);
        }

      })
    }

    console.log(realtag, "this is realtag")
    const newitem = {
      title:title,
      tag:tag,
      playlist:realtag?realplaylist:[],
      color:color.toLowerCase(),
      des:des
    }

    console.log("insert item is ",newitem);

    if(title == "" || tag == "")
    {
      console.log("you must input");
    }
    else 
    {
      (async () => {
        
        const dataid = await insert("https://textjsonserver.onrender.com/data", newitem, 1);
        
        if(realtag==1) 
        {
          newitem.playlist.map(async i=>await update(`https://textjsonserver.onrender.com/playlist/${i}`, dataid))
          
        }

        toast.success("Successfully created a note");
        navigate("/");
      })()
    }

  }

return (
  <>
    <form className='flex-col mt-5 ml-5 mr-5 text-center' onSubmit={actionhandle}>
        <input className='w-full border-2 border-solid border-black pb-2' placeholder='Title' name='title'></input>
        <div className='flex'>
          <input className='w-full border-2 border-solid border-black pb-2 mt-5 mr-5' placeholder='Tag' name='tag'></input>
          <select className='border-2 border-solid border-black pb-2 mt-5 w-full' name='color'>
            <option>Red</option>
            <option>Green</option>
            <option>Yellow</option>
            <option>Blue</option>
            <option>Orange</option>
            <option>Gray</option>
            <option>Pink</option>
            <option>Cyan</option>
            <option>Brown</option>
            <option>Lime</option>
            <option>Purple</option>
          </select>
        </div>
        <select multiple className='border-2 border-solid border-black pb-8 my-5 mr-5 w-full' name='playlist'>
          {
            jsondata.map((item,key)=>(
            <option key={key}>{item.title}</option>
            ))    
          }
          </select>
        <textarea placeholder='Description' name='des' className='w-full border-2 border-solid border-black pb-80'></textarea>
        <button className='mb-5 border-2 border-solid border-black mt-5 p-1 bg-yellow-300 hover:bg-yellow-400' type='submit'>Create</button>
    </form>   
  </>
)

}

export default Create