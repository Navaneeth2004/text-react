import React from 'react'
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className='bg-red-500 pb-4 flex justify-between'>
        <button onClick={()=>(navigate("/playlist"))} className='border-4 border-double border-black ml-8 mt-4 bg-green-500 p-3 hover:bg-green-600'>Playlist</button>
        <button onClick={()=>(navigate("/"))} className='border-4 border-double border-black mt-4 bg-green-500 p-3 hover:bg-green-600'>Home</button>
        <button onClick={()=>(navigate("/options"))} className='border-4 border-double border-black mr-8 mt-4 bg-green-500 p-3 hover:bg-green-600'>Options</button>
    </div>
  )
}

export default Navbar