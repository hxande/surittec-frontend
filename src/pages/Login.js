import React, { useState } from 'react';
import './Login.css';
import logo from '../logo.svg';

export default function Login({history}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();
        // const response = await api.post('/user', {
        //     username,
        //     password
        // });
        // const { role } = response.data;
        history.push('/main');
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img src={ logo } alt='ha' />
                <input 
                    placeholder='Digite seu user'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    placeholder='Digite seu password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}