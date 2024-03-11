import React, { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const api_base = "http://localhost:4000";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(api_base + "/login", {
                email,
                password
            });
            const token = response.data.accesstoken;

            setError("");
            localStorage.setItem("token", token);
            console.log("Login successful", response.data);
            navigate("/");
        } catch (error) {
            console.error("Login failed", error.response.data);
            setError(error.response.data.message);
        }
    };
    

    return (
        <div className="flex justify-center items-center h-screen bg-zinc-200">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col">
                <h2 className="text-4xl font-bold text-center py-4">
                    All-Jobs.
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col mb-4">
                        <label>Email</label>
                        <input
                            className="border rounded relative bg-zinc-50 p-2"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>Password</label>
                        <input
                            className="border rounded relative bg-zinc-50 p-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative rounded text-white">
                        Sign In
                    </button>
                    <p className="flex items-center mt-2">
                        <input className="mr-2" type="checkbox" />
                        Remember Me
                    </p>
                    <div className="flex justify-center py-6">
                        <p className="border rounded shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                            <FcGoogle className="mr-2" /> Google
                        </p>
                    </div>
                    <p className="text-center mt-2">
                        Not a member? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up now</Link>
                    </p>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-2 rounded relative justify-center" role="alert">
                        <p className="block sm:inline">{error}</p>
                    </div>}
                </form>
            </div>
        </div>
    );
}
