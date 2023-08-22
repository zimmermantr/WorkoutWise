import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("username:  ",userName);
        console.log("password:  ", password);
    }, [userName, password]);

    const signUp = async (e) => {
        e.preventDefault();
        let response = await api.post("users/register/",{
            email: userName,
            password: password,
        });
        console.log(response)
        let user = response.data.user;
        let token = response.data.token;
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/workouts");
    };

    return(
        <form onSubmit={(e) => signUp(e)}>
            <h1>RegisterPage</h1>
            <h5>Register</h5>
            <input 
                type="email"
                placeholder="email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit"/>
        </form>
    )
}