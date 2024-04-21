
import React from 'react';
import { useState,useEffect} from 'react';
import axios from 'axios';
import './App.css'
function App() {
let baseurl = import.meta.env.VITE_BASE_URL;
const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const AddUser = async()=>{
    const Userdetail = {
      username,
      email
    };
    const json = await axios.post(`${baseurl}/adduser`,Userdetail);
    alert(`${json.data}`);
    setUsername("");
    setEmail("");
}
const [users,setUsers] = useState([]);
    useEffect(function(){
        axios.get(`${baseurl}/getuser`)
        .then((res)=>{
            setUsers(res.data);
        })
        .catch((err)=>console.log(err));
    },[users])
    const handledelete = async(id)=>{ 
        const res = await axios.delete(`${baseurl}/deleteuser${id}`);
        alert(res.data);
    }
    const handleupdate = async(id)=>{ 
        const res = await axios.put(`${baseurl}/updateuser${id}`,{username,email});
        alert(res.data);
        setUsername("");
        setEmail("");
    }

return (
  <>
    <div className='container'>
    <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Name'/>
    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'/>
    <button type='submit' onClick={AddUser}>Add Users</button>
    </div>
    <div className="usercont">
    <h1>ALL Users</h1>
    {users.map((d)=>{return <div key={d._id} className="users">
    <h1>Name: {' ' + d.username + ','} Email: {' ' + d.email + ' '} <button onClick={()=>handleupdate(d._id)}>update</button> <button onClick={()=>handledelete(d._id)}>Delete</button></h1>
    </div>})}
    </div>
  </>
)

}
export default App;
