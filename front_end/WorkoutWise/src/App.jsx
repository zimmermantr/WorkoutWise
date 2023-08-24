import { useState, useEffect } from 'react'
import  Navbar  from "./components/Navbar"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { api } from './utilities'
import { createContext } from 'react'

export const userContext = createContext();

function App() {

  const [user, setUser] = useState(null);
  const apiKey = import.meta.env.VITE_NINJA_API_KEY;
  const navigate = useNavigate();
  const [exercise, setExercise] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const addExercise = async (exerciseData, workoutId) => {
    try{
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.post(`workouts/${workoutId}/exercises/`, exerciseData); 
      }else {
        console.log("Token not found")
      }
    }catch (error) {
      console.error("Error adding exercise to workout:", error)
    }
  }

  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/");
      setUser(response.data);
      navigate("/workouts");
    } else {
      setUser(null);
      navigate("/");
    }
  };

  useEffect(() => {
    whoAmI();
  }, []);

  const logout = async () => {
    let response = await api.post("users/logout/");
    if(response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"];
      navigate("/")
    }
  }

  return (
    <>
      
        {
        user?
        (<userContext.Provider value={{logout}}>
          <Navbar />
        </userContext.Provider>)
        :
        null
        }
      
      <userContext.Provider value={{user, setUser, apiKey, workout, setWorkout, addExercise, workouts, setWorkouts }}>
        <Outlet />
      </userContext.Provider>
    </>
  )
}

export default App
