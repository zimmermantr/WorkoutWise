import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { logout, user } = useContext(userContext);
    const [ searchInput, setSearchInput ] = useState("");
    const navigate = useNavigate();
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setSearchInput("");
        navigate(`/exercises/${searchInput}`);
    };

    const onChangeHandler =(event) => {
        setSearchInput(event.target.value);
    };

    // const handleLogout = async () => {
    //     console.log("Logging out with token:", localStorage.getItem("token"));
    //     await logout();
    // };

    return (
        <>
            <nav>
                <h1>WorkoutWise</h1>
                <Link to={"workouts"}>Workout   </Link>
                <Link to={"myexercises"}>Exercises   </Link>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" placeholder="search" onChange={onChangeHandler} value={searchInput}/>
                    <button type="submit">Search</button>
                </form>
                <button onClick={() => { logout(); }}>Log out</button>
            </nav>
        </>
    );
}