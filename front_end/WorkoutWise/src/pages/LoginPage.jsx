import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";

export const LoginPage = () => {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const login = async (userName, password) => {
    try {
      let response = await api.post("users/login/", {
        email: userName,
        password: password,
      });
      let user = response.data.user;
      let token = response.data.token;
      setUser(user);
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      navigate("/workouts");
    }catch(err){
      alert("Incorrect username or password")
    }  
  };

  return (
    <AuthForm title="Log In" onSubmit={login} />
  );
};
