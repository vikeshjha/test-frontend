import React from 'react'
import { useState } from 'react'
import axios from 'axios'



const SignupForm = () => {

    const[form, setForm] = useState({ name: '', password: ''})
    const[msg, setMsg] = useState('');

    const handleChange = (e) =>{
        setForm({...form , [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${API_URL}/signup`, form);

            setMsg(res.data.message);
        }catch (err) {
            setMsg("Error creating user");
        }
    };
  return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder='Name'
            required
            />
            <input
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Password'
            required
            />
            <button type='submit'>Submit</button>
        </form>
        {msg && <p>{msg}</p>}
    </div>
  )
}

export default SignupForm