import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";

export const ExercisesPage = () => {
    const [exerciseName, setExerciseName] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [equipment, setEquipment] = useState("")
    const [description, setDescription] = useState("")
    const [muscle, setMuscle] = useState("")
    const [muscleList, setMuscleList] = useState([])
    const { apiKey } = useContext(userContext);
    const { searchParameters } = useParams();
    const navigate = useNavigate();
    const {workouts, setWorkouts} = useContext(userContext);
    useEffect(() => {
        axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${searchParameters}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
        .then((response) =>{
            console.log(response.data)
            if (response.data.length === 0) {
                navigate("/*")
            }else{
            setMuscleList(response.data)
            }
        })
        .catch((error) => {
            setError(error);
        });
    }, [searchParameters]);

    return(
        <>
            <h1>ExercisesPage</h1>
            <ol>
                {muscleList.map((lift,index) => (
                    
                    <ExerciseCard
                        key={index}
                        exercise_name={lift.name}
                        targeted_muscles={lift.muscle}
                        equipment={lift.equipment}
                        difficulty={lift.difficulty}
                        description={lift.instructions}
                        availableWorkouts={workouts}
                    />
                ))}
            
            </ol>
        </>
    )
}
