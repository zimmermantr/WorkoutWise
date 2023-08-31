import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";

export const ExercisesPage = () => {

    const [muscleList, setMuscleList] = useState([])
    const { apiKey } = useContext(userContext);
    const { searchParameters } = useParams();
    const navigate = useNavigate();
    const {workouts} = useContext(userContext);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset(0);
        axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${searchParameters}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
        .then((response) =>{
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

    const loadMoreExercises = () => {
        const newOffset = offset + 10;
        setOffset(newOffset);

        axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${searchParameters}&offset=${newOffset}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
        .then((response) => {
            setMuscleList(prevExercises => [...prevExercises, ...response.data]);
        })
        .catch((error) => {
            setError(error);
        });
    };


    return(
        <div>
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
            <div className="flex justify-center pb-3">
            <button onClick={loadMoreExercises} className="bg-green-700 hover:bg-green-750 text-white py-1 px-4 rounded w-64">Load More</button>
            </div>

        </div>
    )
}
