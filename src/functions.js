async function insert(address,insertlist,want)
{
  const response = await fetch((address),{
    method:"POST",
    body:JSON.stringify(insertlist)
  })

  if(want==1)
  {
    const responsedata = await response.json();
    return responsedata.id;
  }
  else
  {
    return 0;
  }
}

async function deletenote(deletething,deletelist)
{
  const response3 = await fetch((`http://localhost:8000/data/${deletething}`),{
    method:"DELETE",
  })

  deletelist.map(async item=>{

    const response1 = await fetch(`http://localhost:8000/playlist/${item}`);
    const response2 = await response1.json();

    let arr = response2.items
    const index = arr.indexOf(deletething);

    if(index!=-1)
    { 
      arr.splice(index,1);

      const actualdata = {
        id: response2.id,
        title: response2.title,
        color: response2.color,
        items: arr,
      };

    const response = await fetch((`http://localhost:8000/playlist/${item}`),{
      method:"PUT",
      body:JSON.stringify(actualdata)
    })

    }
  })
}

async function deleteplaylist(deletething,deletelist)
{
  const response3 = await fetch((`http://localhost:8000/playlist/${deletething}`),{
    method:"DELETE",
  })

  deletelist.map(async item=>{

    const response1 = await fetch(`http://localhost:8000/data/${item}`);
    const response2 = await response1.json();

    let arr = response2.playlist
    const index = arr.indexOf(deletething);

    if(index!=-1)
    { 
      arr.splice(index,1);

      const actualdata = {
        id: response2.id,
        title: response2.title,
        tag: response2.tag,
        playlist: arr,
        color: response2.color,
        des: response2.des,
      };

    const response = await fetch((`http://localhost:8000/data/${item}`),{
      method:"PUT",
      body:JSON.stringify(actualdata)
    })

    }
  })
}

async function update(address,updatelist)
{
  const response1 = await fetch(address);
  const response2 = await response1.json();

  response2.items.push(updatelist)

  console.log(response2.id+" this is ur shit and "+updatelist)
  const actualdata = {
    id: response2.id,
    title: response2.title,
    color: response2.color,
    items: response2.items,
};

  const response = await fetch((address),{
    method:"PUT",
    body:JSON.stringify(actualdata)
  })
}

async function updatenote(address,updatelist,play)
{
  const response1 = await fetch(address);
  const response2 = await response1.json();

  if(play==1)
  {
    const actualdata = {
      id: response2.id,
      title: updatelist.title,
      tag: updatelist.tag,
      playlist:response2.playlist,
      color: updatelist.color,
      des: updatelist.des,
  };
  
  console.log(actualdata, " actualdata")
  
    const response = await fetch((address),{
      method:"PUT",
      body:JSON.stringify(actualdata)
    })
  }
  else if(play==2)
  {
    const playupdate = response2.playlist;
    playupdate.push(updatelist);

    const actualdata = {
      id: response2.id,
      title: response2.title,
      tag: response2.tag,
      playlist:playupdate,
      color: response2.color,
      des: response2.des,
  };
  
  console.log(actualdata, " actualdata")
  
    const response = await fetch((address),{
      method:"PUT",
      body:JSON.stringify(actualdata)
    })
  }

}

async function updateplaylist(updatelist,play)
{

  if(play==1)
  {
    console.log("play is 1")
    let idlist=updatelist.items;

    console.log(idlist)

    const response1 = await fetch(`http://localhost:8000/playlist/${updatelist.id}`);
    const response2 = await response1.json();
    const response11 = await fetch(`http://localhost:8000/data`);
    const response22 = await response11.json();

    let arr = response2.items

    console.log(arr, " this is arr")

    updatelist.items.map(i=>{

      arr.push(i);
    })


    const actualdata = {
      id: updatelist.id,
      title: updatelist.title,
      color: updatelist.color,
      items: arr,
    };

    console.log("this is inserted in playlist ",actualdata);
    
    const response = await fetch((`http://localhost:8000/playlist/${updatelist.id}`),{
      method:"PUT",
      body:JSON.stringify(actualdata)
    })

    response22.map(async i=>{

      if(idlist.includes(i.id))
      {
        const response111 = await fetch(`http://localhost:8000/data/${i.id}`);
        const response222 = await response111.json();

        let playlistids = response222.playlist;
        console.log(playlistids)
        playlistids.push(updatelist.id)

        const actualdataindata = {
          id: response222.id,
          title: response222.title,
          tag: response222.tag,
          playlist:playlistids,
          color: response222.color,
          des: response222.des,
        };

        console.log(actualdataindata, "this is the actual data to be in data")

        await fetch((`http://localhost:8000/data/${response222.id}`),{
          method:"PUT",
          body:JSON.stringify(actualdataindata)
        })
  
      }

    })

  }
  else if(play==2)
  {
    console.log("play is 2")
    let idlist=updatelist.items;

    console.log(idlist, " this is idlist")

    const response1 = await fetch(`http://localhost:8000/playlist/${updatelist.id}`);
    const response2 = await response1.json();
    const response11 = await fetch(`http://localhost:8000/data`);
    const response22 = await response11.json();

    let arr = response2.items

    arr = arr.filter(i => !idlist.includes(i));

    const actualdata = {
      id: updatelist.id,
      title: updatelist.title,
      color: updatelist.color,
      items: arr,
    };
     
    console.log("this is inserted in playlist ",actualdata);

    const response = await fetch((`http://localhost:8000/playlist/${updatelist.id}`),{
      method:"PUT",
      body:JSON.stringify(actualdata)
    })

    response22.map(async i=>{

      if(idlist.includes(i.id))
      {
        const response111 = await fetch(`http://localhost:8000/data/${i.id}`);
        const response222 = await response111.json();

        let playlistids = response222.playlist;
        console.log(playlistids)
        
        playlistids.forEach(element => {
          
          if(element==updatelist.id)
          {
            const index = playlistids.indexOf(element);
            playlistids.splice(index,1)
          }
        });

        const actualdataindata = {
          id: response222.id,
          title: response222.title,
          tag: response222.tag,
          playlist:playlistids,
          color: response222.color,
          des: response222.des,
        };

        console.log(actualdataindata, "this is the actual data to be in data")

        await fetch((`http://localhost:8000/data/${response222.id}`),{
          method:"PUT",
          body:JSON.stringify(actualdataindata)
        })
  
      }

    })

  }

  else if(play==3)
  {
    await fetch((`http://localhost:8000/playlist/${updatelist.id}`),{
      method:"PUT",
      body:JSON.stringify(updatelist)
    })
  }

}

async function updateatcreate(nowaddress,toaddress,id,nowid,toid)
{
  const response1 = await fetch(nowaddress);
  const actualresponse1 = await response1.json();

  const response2 = await fetch(toaddress);
  const actualresponse2 = await response1.json();

  let xlist = actualresponse1.items;
  const index = xlist.indexOf(nowid);
  xlist = xlist.splice(index,nowid);

  let ylist = actualresponse1.items;
  const index1 = ylist.indexOf(toid);
  ylist = ylist.splice(index1,toid);

  const actualdata1 = {
    id: actualresponse1.id,
    title: actualresponse1.title,
    color: actualresponse1.color,
    items: xlist,
  };

  const actualdata2 = {
    id: actualresponse2.id,
    title: actualresponse2.title,
    color: actualresponse2.color,
    items: ylist,
  };

console.log(actualdata1, " actualdata ", actualdata2, "actualdata2")
}

async function getdata(address)
{
  const response = await fetch(address);
  const data = await response.json();
  return data;
}

function capitalizeFirstLetter(string) {
  if(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}


export{capitalizeFirstLetter, insert,getdata,update, updatenote, updateplaylist, updateatcreate, deletenote, deleteplaylist}