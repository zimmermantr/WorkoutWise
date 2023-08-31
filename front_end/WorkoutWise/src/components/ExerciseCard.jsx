import { useState, useContext } from "react";
import { userContext } from "../App";
import { useLocation } from "react-router-dom";

export default function ExerciseCard(props){
    const [ onWorkoutStatus, setOnWorkoutStatus ] = useState(false);
    const [ expanded, setExpanded ] = useState(false);
    const { addExercise, workout } = useContext(userContext);
    const isOnWorkout = workout.find((exercise) => exercise.name === props.name);
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
        console.log(exerciseToAdd)
        console.log(selectedWorkout)
    };

    return (
        <div className="exercise-card">
            
            <p>{props.exercise_name} </p>
            <p>Targeted muscle: {props.targeted_muscles}</p>
            <p>Equipment needed: {props.equipment} </p>
            <p>Difficulty rating: {props.difficulty} </p>
            <div className={`description ${expanded ? "expanded" : "truncated"}`}>
            <p>{props.description}</p>
            </div>
            <button onClick={toggleExpand}>
                {expanded ? "Show Less" : "Show More"}
            </button>
            {!isOnWorkout && isOnExercisesPage && (
                <>
                    <label>Select Workout:</label>
                    <select onChange={(e) => setSelectedWorkout(e.target.value)}>
                        <option value="">Select a workout</option>
                        {props.availableWorkouts.map((workout) => (
                            <option key={workout.id} value={workout.id}>
                                {workout.workout_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={addExerciseHandler}>Add to workout</button>
                </>
            )}
        </div>
    )
}