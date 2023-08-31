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
  const [workout, setWorkout] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [addedToWorkout, setAddedToWorkout] = useState(false);

  const addExercise = async (exerciseData, workoutId) => {
    try{
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.post(`workouts/${workoutId}/exercises/`, exerciseData);
        
        fetchWorkouts();
        
      }
    }catch (error) {
      console.error("Error adding exercise to workout:", error)
    }
  }

  const fetchWorkouts = async () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            let response = await api.get("workouts/");
            setWorkouts(response.data);
        }
    } catch (error) {
        console.error("Error fetching workouts:", error);
    }
};

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
    setWorkouts([]);
    fetchWorkouts();
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

  const deleteWorkout = async (workoutId) => {
    try{
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.delete(`workouts/${workoutId}/`);
        fetchWorkouts();
      }
    }catch (error) {
      console.error("Error deleting workout:", error)
    }
  }

  const deleteExercise = async (workoutId, exerciseId) => {
    try{
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.delete(`workouts/${workoutId}/exercises/${exerciseId}`);
        fetchWorkouts();
      }
    }catch (error) {
      console.error("Error deleting exercise:", error)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      
        {
        user?
        (<userContext.Provider value={{logout,setAddedToWorkout}}>
          <Navbar />
        </userContext.Provider>)
        :
        null
        }
      
      <userContext.Provider value={{user, setUser, apiKey, workout, setWorkout, addExercise, workouts, setWorkouts, deleteWorkout, fetchWorkouts, deleteExercise,addedToWorkout, setAddedToWorkout }}>
        <Outlet />
      </userContext.Provider>
      <div className="mt-auto flex justify-center" >
        <p className="font-serif text-white rounded "> © 2023 Tristan Zimmerman</p>
      </div>
    </div>
  )
}

export default App
