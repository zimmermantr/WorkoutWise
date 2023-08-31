import { useState } from "react";

export const AuthForm = ({ title, onSubmit }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userName, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h5>{title}</h5>
            <input type="email" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" />
        </form>
    )
}