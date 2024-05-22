import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'

import { insert, getdata, update } from './functions';

const Create = () => {
  const navigate = useNavigate();
  const [jsondata, setJsondata] = useState([]);
  const [jsondata1, setJsondata1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getdata("http://localhost:8000/playlist");
 
        setJsondata(data);
    }
    fetchData();
  }, []);
    
  const actionhandle=(event)=>{

    event.preventDefault();

    const title=event.target.elements.title.value
    const playlist=event.target.elements.playlist.value
    const tag=event.target.elements.tag.value
    const color=event.target.elements.color.value
    const des=event.target.elements.des.value
    let realtag=[]

    if(playlist)
    {
      console.log("yess mannnnn this is fire  ")
      jsondata.forEach(i => {

        if(playlist==i.title)
        {
          realtag={id:i.id,value:playlist};
        }
  
      });
    }

    console.log(realtag)
    const newitem = {
      title:title,
      tag:tag,
      playlist:[realtag.id]==null?[realtag.id]:[],
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
        const dataid = await insert("http://localhost:8000/data", newitem, 1);
        
        if(newitem.playlist)
        {
          await update(`http://localhost:8000/playlist/${realtag.id}`, dataid);
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
          <select className='border-2 border-solid border-black pb-2 my-5 mr-5 w-full' name='playlist'>
            <option>None</option>
          {
            jsondata.map((item,key)=>(
            <option key={key}>{item.title}</option>
            ))    
          }
          </select>
          <select className='border-2 border-solid border-black pb-2 my-5 w-full' name='color'>
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
        <input className='w-full border-2 border-solid border-black pb-2 mb-5' placeholder='Tag' name='tag'></input>
        <textarea placeholder='Description' name='des' className='w-full border-2 border-solid border-black pb-80'></textarea>
        <button className='mb-5 border-2 border-solid border-black mt-5 p-1 bg-yellow-300 hover:bg-yellow-400' type='submit'>Create</button>
    </form>   
  </>
)

}

export default Create