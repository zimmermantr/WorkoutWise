import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WorkoutCard from "../components/WorkoutCard";
import { userContext } from "../App";
import axios from "axios";
import { api } from "../utilities";
import ExerciseCard from "../components/ExerciseCard";

export const WorkoutListsPage = () => {
    const {workouts, setWorkouts} = useContext(userContext);
    const [newWorkoutName, setNewWorkoutName] = useState("");
    const [newWorkoutDetails, setNewWorkoutDetails] = useState("");


   
    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                
                let response = await api.get("workouts/");
                setWorkouts(response.data);
            } else {
                console.log("Token not found in localStorage");
            }
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };
    
    useEffect(() => {
        fetchWorkouts();
    }, []);

    const createWorkout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                
                let response = await api.post("workouts/",{
                    workout_name: newWorkoutName,
                    workout_details: newWorkoutDetails,
                });
                fetchWorkouts();
                setNewWorkoutName("");
                setNewWorkoutDetails("");
            } else {
                console.log("Token not found");
            }
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    };




    return (
        <div>
            <input
                type="text"
                placeholder="Workout Name"
                value={newWorkoutName}
                onChange={(e) => setNewWorkoutName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Workout Details"
                value={newWorkoutDetails}
                onChange={(e) => setNewWorkoutDetails(e.target.value)}
            />
            <button onClick={createWorkout}>Add workout</button>
            {workouts.map((workout) => (
            <div key={workout.id}>
                <p>{workout.workout_name}</p>
                <div>
                    {workout.exercises.map((exercise) => (
                        <div key={exercise.id}>
                            <ExerciseCard
                                exercise_name={exercise.exercise_name}
                                targeted_muscles={exercise.targeted_muscles}
                                equipment={exercise.equipment}
                                difficulty={exercise.difficulty}
                                description={exercise.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ))}
        </div>
    );
};

