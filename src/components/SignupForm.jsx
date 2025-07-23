import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SignupForm = () => {
    const[form, setForm] = useState({ name: '', password: ''})
    const[msg, setMsg] = useState('');

    // Debug: Log environment variables
    console.log('Environment variables:', {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
        API_URL: API_URL,
        NODE_ENV: process.env.NODE_ENV
    });

    const handleChange = (e) =>{
        setForm({...form , [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('Making request to:', `${API_URL}/api/signup`);
        console.log('Form data:', form);
        
        try{
            const res = await axios.post(`${API_URL}/api/signup`, form);
            console.log('Success response:', res.data);
            setMsg(res.data.message);
        }catch (err) {
            console.error('Full error object:', err);
            console.error('Error response:', err.response);
            console.error('Error message:', err.message);
            setMsg("Error creating user");
        }
    };
    
    return (
        <div>
            <h2>Sign Up</h2>
            <p>Current API URL: {API_URL}</p> {/* Debug display */}
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
