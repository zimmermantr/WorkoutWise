import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";

export const RegisterPage = () => {
    const { setUser } = useContext(userContext);
    const navigate = useNavigate();

    const signUp = async (userName, password) => {
        let response = await api.post("users/register/",{
            email: userName,
            password: password,
        });
        let user = response.data.user;
        let token = response.data.token;
        setUser(user);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        localStorage.setItem("token", token);
        navigate("/workouts");
    };

    return(
        <AuthForm title="Register" onSubmit={signUp} />
    )
}