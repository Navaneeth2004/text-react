import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getdata, insert, deleteplaylist, updateplaylist,capitalizeFirstLetter } from './functions';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';

const Editplaylist = () => {

    const [jsonplaylist,setjsonplaylist] = useState([]);
    const [dataofmain,setdataofmain] = useState([]);
    const [jsondata,setjsondata] = useState([]);
    const [jsontitle,setjsontitle] = useState([]);
    const [clickedButton, setClickedButton] = useState(null);
    const [addlist, setaddlist] = useState(null);
    const {id} = useParams();


    useEffect(() => {
      
      async function gotdata() 
      {
        let containlist=[];
        const removelist=[];
        let newar;

        const data = await getdata(`http://localhost:8000/playlist/${id}`);
        const data1 = await getdata("http://localhost:8000/data");
        setjsondata(data1); 
        setdataofmain(data);
        setjsontitle(data);

        data1.forEach(element => {

          containlist.push({id:element.id,value:element.title});
          
        });

        console.log("initial contain list ", containlist)

        //removelist items
        data1.map(item=>{

          data.items.map(i=>{

            if(item.id==i)
            {
              removelist.push({id:item.id,value:item.title});
            }

          })

        })

        console.log(removelist, "this is the remove list")
        setjsonplaylist(removelist);

        //addlist items
        containlist = containlist.filter(item => !removelist.some(removeItem => removeItem.id == item.id));

        console.log(containlist, " this is the containlist")

        setaddlist(containlist)
      }

      gotdata();

    }, [])

    console.log(capitalizeFirstLetter(jsontitle.color), "is this the fucking color")

    const navigate = useNavigate();

    const actionhandle = (event) => {


      event.preventDefault();

      if(clickedButton==1)
      {

        const title=event.target.elements.title.value
        const color=event.target.elements.color.value
        const additems=Array.from(event.target.elements.addlist.options)
                    .filter(option => option.selected)
                    .map(option => option.value)
        const removeitems=Array.from(event.target.elements.removelist.options)
                    .filter(option => option.selected)
                    .map(option => option.value)

        const realadditem=[];
        const realremoveitem=[];

        console.log("additems ",additems)
        console.log("removeitems ",removeitems)

        if(additems.length!=0)
        {
          console.log("you clicked add")
          addlist.map(i=>{

            additems.map(j=>{
  
              if(i.value==j)
              {
                realadditem.push(i.id);
              }
  
            })
  
          })

          const actualdata = {
            id: id,
            title: title,
            color: color,
            items: realadditem,
          };

          updateplaylist(actualdata, 1);
        }

        if(removeitems.length!=0)
        {
          console.log("you clicked remove")
          jsonplaylist.map(i=>{

            removeitems.map(j=>{
  
              console.log("duck if",i.value,"==",j)

              if(i.value==j)
              {
                realremoveitem.push(i.id);
              }
  
            })
  
          })

          const actualdata = {
            id: id,
            title: title,
            color: color,
            items: realremoveitem,
          };


          console.log("actualbata is ", actualdata)
          updateplaylist(actualdata, 2);
        }

        if(removeitems.length==0 && additems.length==0)
        {
          const actualdata = {
            id: id,
            title: title,
            color: color,
            items: dataofmain.items,
          };

          updateplaylist(actualdata, 3);
        }

        return navigate("/playlist");

      }
      else
      {
        let containarray = [];

        if(jsondata)
        {
          jsondata.forEach(item => {
            console.log("this is fucking item ",item)
            if (Array.isArray(item.playlist)) {
              item.playlist.forEach(itemId => {
                if (itemId == id) {
                  containarray.push(item.id);
                }
              });
            }
          });
        }

        deleteplaylist(id,containarray)

        toast.error("Successfully deleted a playlist");

        return navigate("/playlist");
      }

    }

    const handleButtonClick = (buttonId) => {
      setClickedButton(buttonId);
      console.log(`Button ${buttonId} clicked`);
    };

    return (
        <>
          <form className='flex-col mt-5 ml-5 mr-5 text-center' onSubmit={actionhandle}>
              <input onChange={(event)=>setjsontitle({ ...jsontitle, title: event.target.value })} className='w-full border-2 border-solid border-black pb-3' placeholder='Title' name='title' value={jsontitle.title || ''}></input>
              <select defaultValue={jsontitle.color ?? 'Yellow'} className='border-2 border-solid border-black h-10 mt-5 w-full' name='color'>
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
                <p className='mt-5'>Add</p>              
                <select multiple className='border-2 border-solid border-black h-32 mt-1 w-full mr-5' name='addlist'>
                  {
                    addlist?
                        addlist.map((item,key)=>(
                          <option key={key}>{item.value}</option>
                      ))
                    :<p>Nothing to add here</p>
                  }
                </select>
                <p className='mt-5'>Remove</p>                
                <select multiple className='border-2 border-solid border-black h-32 mt-1 w-full mr-5' name='removelist'>
                  {
                    jsonplaylist?
                      jsonplaylist.map((item,key)=>(
                          <option key={key}>{item.value}</option>
                      ))
                    :<p>Nothing to add here</p>
                  }
                </select>
                <button onClick={() => handleButtonClick(1)} className='mb-5 border-2 border-solid border-black mt-5 p-1 bg-yellow-300 hover:bg-yellow-400' type='submit' name='create'>Update</button>
                <button onClick={() => handleButtonClick(2)} className='ml-10 border-2 border-solid border-black mt-5 p-1 bg-red-300 hover:bg-red-400' type='submit' name='delete'>Delete</button>
          </form>   
        </>
      )
}

export default Editplaylist