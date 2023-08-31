import { useState } from "react";

export const AuthForm = ({ title, onSubmit }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userName, password);
    };

    return (
         <div className="h-screen flex justify-center items-center">
                <div className="bg-slate-600 p-5 text-center">
                <p className=" font-sedgwick text-8xl pr-4 text-lime-400">WorkoutWise</p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <p className="p-5 text-2xl">{title}</p>
                        <input className="border rounded mr-2" type="email" placeholder="email" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input className="border rounded mr-2" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded" >Submit</button>
                    </form>
                </div>
            </div>
    )
}