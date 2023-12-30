"use client"

import Brand from '@/components/Brand';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
    const router = useRouter();

    const token = Cookies.get('token');
    if(token) {
        router.push('/');
    }

    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
    })

    // handle change
    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res =  await fetch('https://dummyjson.com/auth/login', {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              username: userInput.username,
              password: userInput.password
            })
        })

        const res2 = await res.json();

        if(res2.error) console.log(res2.error);
        else Cookies.set('token', res.token)

        if(res.ok) router.push('/')
    }

    //form inputs
    const Inputs = [
        { id: 1, type: "text", placeholder: "Username", value: `${userInput.username}`, name: 'username' },
        { id: 2, type: "password", placeholder: "Password", value: `${userInput.password}`, name: 'password' },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {/* image  */}
            <div className="hidden md:flex lg:flex flex-col justify-center items-center w-full h-screen">
                <img className="w-4/4 mx-auto" src="/assets/signin.png" alt="signin" />
            </div>

            {/* form  */}
            <div className="flex flex-col justify-center items-center h-screen">
                {/* logo  */}
                <Brand />
                {/* sign in form  */}
                <form className="bg-white w-3/5 mt-6 p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6">
                        {Inputs.map(input => (
                            <TextField
                                key={input.id}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={input.value}
                                name={input.name}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    <Button text="Log In" />

                </form>
            </div>
        </div>
    )
}

export default Login
