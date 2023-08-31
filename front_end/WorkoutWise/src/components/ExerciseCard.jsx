import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { useLocation } from "react-router-dom";

export default function ExerciseCard(props){
    const [ expanded, setExpanded ] = useState(false);
    const { addExercise, workout, deleteExercise,addedToWorkout, setAddedToWorkout } = useContext(userContext);
    const isOnWorkout = workout.find((exercise) => exercise.exercise_name === props.exercise_name);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const location = useLocation();
    const isOnExercisesPage = location.pathname.includes("/exercises");



    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const addExerciseHandler = () => {
        if (!selectedWorkout) {
            alert("Please select a workout before adding the exercise.");
            return;
        }
        const exerciseToAdd = {
            ...props
        };
        delete exerciseToAdd.availableWorkouts;
        addExercise(exerciseToAdd, selectedWorkout);
        setAddedToWorkout(true);
    };

    return (
        <div className="bg-slate-400 border-2 p-5 m-5">
            
            <p className="font-bold underline pb-3">{props.exercise_name} </p>
            <li>Targeted muscle: {props.targeted_muscles}</li>
            <li>Equipment needed: {props.equipment} </li>
            <li>Difficulty rating: {props.difficulty} </li>
            <div className={`description ${expanded ? "block" : "truncate"} mt-2`}>
            <li>{props.description}</li>
            </div>
            <button onClick={toggleExpand} className="mt-2 text-blue-600 hover:underline">
                {expanded ? "Show Less" : "Show More"}
            </button>
            {!isOnWorkout && isOnExercisesPage && (
                <div className="flex">
                    <label className="block mt-2">Select Workout:</label>
                    <select onChange={(e) => {setSelectedWorkout(e.target.value);}}  
                    className="m-2 border border-gray-300 rounded">
                        <option value="">Select a workout</option>
                        {props.availableWorkouts.map((workout) => (
                            <option key={workout.id} value={workout.id}>
                                {workout.workout_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={addExerciseHandler}  className="mx-2 bg-blue-500 hover:bg-blue-600 text-white px-2 rounded">Add to workout</button>
                </div>
            )}
            {addedToWorkout && (
                <p className="text-green-500 mt-2">{`${props.exercise_name} added to selected workout!`}</p>
            )}
            {!isOnExercisesPage && (
                <div className="flex justify-center items-center">
                    <button className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded " onClick={() => {deleteExercise(props.workout_id, props.exercise_id)}}>Delete</button>
                </div>
            )}
        </div>
    )
}