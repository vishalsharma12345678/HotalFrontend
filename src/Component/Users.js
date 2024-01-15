import { useEffect } from "react";
import { Sidebark } from "./Sidebar";
import axios from 'axios'
import { useState } from "react";


export function User({user}) {
    const [Users, setUsers] = useState([]);
    const [open, setopen] = useState(false)
    async function update(e,id){
      let ids = {
        id:id,
        value:e.target.value
      }
      await axios.post('https://hotelwebsitevishal.onrender.com/user/update',ids)
      console.log(ids)
       
    }
    async function fetch1(){
        let data = await axios.get('https://hotelwebsitevishal.onrender.com/user/')
        setUsers(data.data)
    }
    useEffect(() => {
        fetch1()
    }, [])

  return (
    <>
    {open ? <AddUser fetch1={fetch1} open={setopen} />:null}
    <div style={{ display: "flex" }}>
      <Sidebark user={user}/>

      <div className="rooms inv" style={{ position: "relative", left: "20%" }}>
        <button style={{textAlign:'end'}} onClick={()=>setopen(!open)}>Add User</button>
        <table width='100%'>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>mobileNumber</th>
                <th>address</th>
                <td>Admin</td>
                <th>Action</th>
            </tr>
            {Users.map((user,i)=>{
              return (
                <tr>
                  <td>{i}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.address}</td>
                  <td>
                    <select name="isAdmin" id="" onChange={(e)=>update(e,user._id)}>
                      <option selected={user.isAdmin} value={true}>Admin</option>
                      <option selected={!user.isAdmin} value={false}>Maneger</option>
                    </select>
                  </td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              )
            })}
        </table>
      </div>
    </div>
    </>
  );
}

export function AddUser({fetch1,open}){
  let style = {
    border:'2px solid white',
    borderRadius:'5px',
    height:'35px',
    margin:'5px'

  };
  const [Name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [address, setaddress] = useState("")
  const [isAdmin, setIsAdmin] = useState("")
  async function handleSubmit(e){
    e.preventDefault();

    let data = {
      name : Name,
      username: username,
      password: password,
      mobileNumber: mobileNumber,
      address: address,
      isAdmin: isAdmin,

    }
    await axios.post('https://hotelwebsitevishal.onrender.com/user/createUser', data).then((result)=>{
      open(false)
      fetch1()

    })
    
  }
  return (
    <div style={{width:'100vw',height:'100vh',position:'fixed',top:'0',left:'0',zIndex:'10000000',display:'flex',alignItems:'center',justifyContent:'center' ,backgroundColor:'rgb(255,255,255,0.7)'}}>
     
      <form action="" style={{width:'30%',padding:'2rem',backgroundColor:'black',borderRadius:'10px',opacity:'1'}} onSubmit={(e)=>handleSubmit(e)}>
        <label style={{color:'white'}} htmlFor="" >Name</label>
        <input name="name" value={Name} onChange={(e)=>setName(e.target.value)} style={style} type="text" />
        <label style={{color:'white'}}  htmlFor="" >Username</label>
        <input name="username" value={username} onChange={(e)=>setUsername(e.target.value)} style={style} type="text" />
        <label style={{color:'white'}}   htmlFor="">Password</label>
        <input name="password" style={style} value={password} onChange={(e)=>setPassword(e.target.value)} type="text" />
        <label style={{color:'white'}}  htmlFor="">Mobile Number</label>
        <input name="mobileNumber" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}  style={style} type="number" />
        <label style={{color:'white'}}  htmlFor="">Address</label>
        <input name="address" style={style} type="text" value={address} onChange={(e)=>setaddress(e.target.value)} />
        <label style={{color:'white'}}  htmlFor="">Role</label><br />
        <select style={style} name="isAdmin" defaultChecked={isAdmin} onChange={(e)=>setIsAdmin(e.target.value)}>
          <option value={true}>Admin</option>
          <option value={false}>Maneger</option>
        </select><br />
        <button>Save</button>
      </form>
    </div>
  )
}
