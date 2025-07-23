import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// Temporarily hardcode the backend URL
const API_URL = 'https://test-backend-six-delta.vercel.app';

const SignupForm = () => {
    const[form, setForm] = useState({ name: '', password: ''})
    const[msg, setMsg] = useState('');

    const handleChange = (e) =>{
        setForm({...form , [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('🚀 Making request to:', `${API_URL}/api/signup`);
        console.log('📝 Form data:', form);
        
        try{
            const res = await axios.post(`${API_URL}/api/signup`, form);
            console.log('✅ Success response:', res.data);
            setMsg(res.data.message);
        }catch (err) {
            console.error('❌ Full error:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            setMsg("Error creating user");
        }
    };
    
    return (
        <div>
            <h2>Sign Up</h2>
            <div style={{
                background: '#e3f2fd', 
                padding: '10px', 
                margin: '10px 0',
                border: '1px solid #2196f3',
                borderRadius: '4px'
            }}>
                <strong>🔗 Hardcoded API URL:</strong> <code>{API_URL}</code>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Name'
                required
                style={{padding: '8px', margin: '5px', display: 'block', width: '200px'}}
                />
                <input
                name='password'
                type='password'
                value={form.password}
                onChange={handleChange}
                placeholder='Password'
                required
                style={{padding: '8px', margin: '5px', display: 'block', width: '200px'}}
                />
                <button type='submit' style={{padding: '10px 20px', margin: '10px 0'}}>
                    Submit
                </button>
            </form>
            {msg && <p style={{
                padding: '10px', 
                background: msg.includes('Error') ? '#ffebee' : '#e8f5e8',
                color: msg.includes('Error') ? '#c62828' : '#2e7d32',
                borderRadius: '4px'
            }}>{msg}</p>}
        </div>
    )
}

export default SignupForm
