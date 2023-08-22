import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { logout, user } = useContext(userContext);
    const [ searchInput, setSearchInput ] = useState("");
    
    const onChangeHandler =(event) => {
        setSearchInput(event.target.value);
    };
    return (
        <>
            <nav>
                <h1>WorkoutWise</h1>
                {/* <Link to="/">Home  </Link> */}
                <Link to={"workouts"}>Workout   </Link>
                <Link to={"myexercises"}>Exercises   </Link>
                <input type="text" placeholder="search" onChange={onChangeHandler} value={searchInput}/>
                <button onClick={() => {setSearchInput("")}}>
                    <Link to={`/exercises/${searchInput}`}>
                        Search
                    </Link>
                </button>
                <button onClick={logout}>
                    Log out
                </button>
            </nav>
        </>
    );
}