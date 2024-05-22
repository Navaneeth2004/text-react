import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';

import { insert, getdata, update, updatenote, updateatcreate, deletenote } from './functions';

const Editnote = () => {
  const navigate = useNavigate();
  const [jsondata, setJsondata] = useState([]);
  const [jsonplaydata, setjsonplaydata] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getdata(`http://localhost:8000/data/${id}`);
      const data1 = await getdata(`http://localhost:8000/playlist`);
  
      setJsondata(data);
      setjsonplaydata(data1);
    };
  
    fetchData();
  }, []);

  const actionhandle = (event) => {

    event.preventDefault();

    if(clickedButton==1)
    {
      const title=event.target.elements.title.value
      const tag=event.target.elements.tag.value
      const color=event.target.elements.color.value
      const des=event.target.elements.des.value
  
      const newitem = {
        title:title,
        tag:tag,
        color:color.toLowerCase(),
        des:des
      }

      console.log("u pressed update ", newitem)
  
      updatenote(`http://localhost:8000/data/${id}`,newitem,1);
  
      navigate("/");
  
    }
    else
    {
      let containarray = [];

      jsonplaydata.forEach(item => {
        if (Array.isArray(item.items)) {
          item.items.forEach(itemId => {
            if (itemId == id) {
              containarray.push(item.id);
            }
          });
        }
      });

      console.log(containarray, " this is a array")

      deletenote(id,containarray);
        
      navigate("/");
    }

    }

    const handleButtonClick = (buttonId) => {
      setClickedButton(buttonId);
      console.log(`Button ${buttonId} clicked`);
    };



return (
  <>
    <form className='flex-col mt-5 ml-5 mr-5 text-center' onSubmit={actionhandle}>
        <input className='w-full border-2 border-solid border-black pb-2' placeholder='Title' name='title' onChange={(event)=>setJsondata({ ...jsondata, title: event.target.value })} value={jsondata.title || ''}></input>
        <div className='flex'>
          <input onChange={(event)=>setJsondata({ ...jsondata, tag: event.target.value })}  className='border-2 border-solid border-black pb-2 my-5 mr-5 w-full' placeholder='Tag' name='tag' value={jsondata.tag || ''}></input>
          <select onChange={(event)=>setJsondata({ ...jsondata, color: event.target.value })} value={jsondata.color} className='border-2 border-solid border-black pb-2 my-5 w-full' name='color'>
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
        <textarea onChange={(event)=>setJsondata({ ...jsondata, des: event.target.value })}  value={jsondata.des || ''} placeholder='Description' name='des' className='w-full border-2 border-solid border-black pb-80'></textarea>
        <button onClick={() => handleButtonClick(1)} className='border-2 border-solid border-black mt-5 p-1 bg-yellow-300 hover:bg-yellow-400' type='submit'>Update</button>
        <button onClick={() => handleButtonClick(2)} className='ml-10 border-2 border-solid border-black mt-5 p-1 bg-red-300 hover:bg-yellow-400' type='submit'>Delete</button>
    </form>   
  </>
)

}

export default Editnote