import axios from 'axios'
import React, { useState } from 'react'
import "./login.css"
const Login = () => {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [err, setError] = useState(false)
    const [user, setUser] = useState({})

    const handleClick = async(e)=>{
        e.preventDefault();
        setLoading(!loading)
        try{
            const data = await axios.get('https://jsonplaceholder.typicode.com/users/1');
            setUser(data.data);
            
           
        }
        catch{
            setError(true)
        }
        setLoading(false)
    }
    
  return (
    <div className='container'>
    <span>{user.name}</span>
      <form>
        <input type='text' placeholder='username'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}></input>
        <input type='password' placeholder='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>{loading ? "please wait...": "Login"}</button>
        <span data-testid='error' style={{visibility: err? "visible": "hidden"}}>Something went wrong</span>
      </form>
    </div>
  )
}

export default Login
