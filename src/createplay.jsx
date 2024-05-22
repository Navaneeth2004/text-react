import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getdata, insert } from './functions';
import {toast} from 'react-toastify'
import { updatenote } from './functions';

const Createplay = () => {

    const [jsonplaydata,setjsonplaydata] = useState([]);
    const [jsondata,setjsondata] = useState([]);

    useEffect(() => {
      
      async function gotdata() 
      {
          const data = await getdata("http://localhost:8000/playlist");
          const data1 = await getdata("http://localhost:8000/data");
          setjsonplaydata(data); 
          setjsondata(data1); 
      }

      gotdata();

    }, [])

    const navigate = useNavigate();

    const actionhandle = (event) => {

        event.preventDefault();

        const title=event.target.elements.title.value
        const color=event.target.elements.color.value
        const items=Array.from(event.target.elements.list.options)
                    .filter(option => option.selected)
                    .map(option => option.value)
        const realitem=[];

        console.log("items is ", items)

        items.forEach(i => {

          console.log("items is ",i)

          jsondata.forEach(j => {

            console.log(j)
            if(j.title.toLowerCase()==i.toLowerCase())
            {
              realitem.push(j.id);
            }
            
          });
          
        });
    
        const newitem = {
          title:title,
          color:color.toLowerCase(),
          items:realitem
        }

        console.log("so the realitem is ",newitem)
    
        if(title == "")
        {
          console.log("you must input");
        }
        else if(title.length > 20)
        {
          console.log("title length too great"); 
        }
        else
        {

          async function get() 
          {
            const playid = await insert("http://localhost:8000/playlist",newitem,1);

            console.log(playid, " this is a playlistid just created")

            realitem.map((itema)=>{ 
              updatenote(`http://localhost:8000/data/${itema}`,playid,2)
            })

  
            toast.success("Successfully created a tag");
  
            return navigate("/playlist");
          }

          get();

        }


    }

    return (
        <>
          <form className='flex-col mt-5 ml-5 mr-5 text-center' onSubmit={actionhandle}>
              <input className='w-full border-2 border-solid border-black pb-3' placeholder='Title' name='title'></input>
              <select className='border-2 border-solid border-black h-10 mt-5 w-full' name='color'>
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
                <select multiple className='border-2 border-solid border-black h-32 my-5 w-full mr-5' name='list'>
                  {
                      jsondata.map((item)=>(
                          <option key={item.title}>{item.title}</option>
                      ))
                  }
                </select>
              <button className='border-2 border-solid border-black mt-5 p-1 bg-yellow-300 hover:bg-yellow-400' type='submit'>Create</button>
          </form>   
        </>
      )
}

export default Createplay