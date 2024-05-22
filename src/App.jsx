import React from 'react';
import Homepage from './homepage.jsx';
import Navbar from './navbar.jsx';
import Create from './create.jsx';
import Playlist from './playlist.jsx';
import Options from './options.jsx';
import Createplay from './createplay.jsx';
import Playlistitems from './playlistitems.jsx';
import Note from './note.jsx';
import Editnote from './editnote.jsx';
import Editplaylist from './editplaylist.jsx';
import All from './all.jsx';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



function Home() 
{
  const navigate = useNavigate();

  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Homepage/>
      <button onClick={() =>(navigate("/create"))} className='opacity-70 fixed bottom-5 right-6 border-4 border-double border-black bg-blue-500 p-3 pl-5 pr-5 hover:bg-blue-700'>+</button>
      <ToastContainer/>
    </div>

  )
}

function Createnote() 
{
  return(
    <div className='h-full bg-yellow-100'>
      <Navbar/>
      <Create/>
      <ToastContainer/>
    </div>
  )
}

function List() 
{
  const navigate = useNavigate();
  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Playlist/>
      <button onClick={() =>(navigate("/createplaylist"))} className='opacity-70 fixed bottom-5 right-6 border-4 border-double border-black bg-red-500 p-3 pl-5 pr-5 hover:bg-red-700'>+</button>
      <ToastContainer/>
    </div>
  )
}

function Option() 
{
  const navigate = useNavigate();
  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Options/>
      <button onClick={() =>(navigate("/create"))} className='opacity-70 fixed bottom-5 right-6 border-4 border-double border-black bg-blue-500 p-3 pl-5 pr-5 hover:bg-blue-700'>+</button>
    </div>
  )
}

function CreatePlaylist() 
{
  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Createplay/>
      <ToastContainer/>
    </div>
  )
}

function PlaylistItem() 
{
  const navigate = useNavigate();
  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Playlistitems/>
      <button onClick={() =>(navigate("editplaylist"))} className='opacity-70 fixed bottom-5 right-6 border-4 border-double border-black bg-red-500 p-3 pl-5 pr-5 hover:bg-red-700'>Edit</button>
    </div>
  )
}

function Notetake() 
{
  const navigate = useNavigate();
  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Note/>
      <button onClick={() =>(navigate("editnote"))} className='opacity-70 fixed bottom-5 right-6 border-4 border-double border-black bg-blue-500 p-3 pl-5 pr-5 hover:bg-blue-700'>Edit</button>
    </div>
  )
}

function NotetakeEdit() 
{
  return(
    <div className='h-screen bg-yellow-100'>
      <Navbar/>
      <Editnote/>
    </div>
  )
}

function Editnotelist() 
{
  return(
    <div className='h-full bg-yellow-100'>
      <Navbar/>
      <Editplaylist/>
    </div>
  )
}


function App() {

  const router = createBrowserRouter([

    {
     path:"/",
     element:<Home/>,
    },
    {
     path:"/create",
     element:<Createnote/>,
    },
    {
     path:"/playlist",
     element:<List/>,
    },
    {
     path:"/options",
     element:<Option/>,
    },
    {
     path:"/createplaylist",
     element:<CreatePlaylist/>,
    },
    {
     path:"/playlist/:id",
     element:<PlaylistItem/>,
    },
    {
     path:"/:id",
     element:<Notetake/>,
    },
    {
     path:"/:id/editnote",
     element:<NotetakeEdit/>,
    },
    {
     path:"/playlist/:id/editplaylist",
     element:<Editnotelist/>,
    },
    {
     path:"/playlist/all",
     element:<All/>,
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
