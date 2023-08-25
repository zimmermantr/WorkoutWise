import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WorkoutCard from "../components/WorkoutCard";
import { userContext } from "../App";
import axios from "axios";
import { api } from "../utilities";
import ExerciseCard from "../components/ExerciseCard";

export const WorkoutListsPage = () => {
    const {workouts, setWorkouts, fetchWorkouts} = useContext(userContext);
    const [newWorkoutName, setNewWorkoutName] = useState("");
    const [newWorkoutDetails, setNewWorkoutDetails] = useState("");

    const createWorkout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                
                let response = await api.post("workouts/",{
                    workout_name: newWorkoutName,
                    workout_details: newWorkoutDetails,
                });
                
                setNewWorkoutName("");
                setNewWorkoutDetails("");
                fetchWorkouts();
            } else {
                console.log("Token not found");
            }
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    };





    return (
        <div>
            <form className="m-3">
                <input className="border rounded mr-2"
                    type="text"
                    placeholder="Workout Name"
                    value={newWorkoutName}
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                />
            
                {/* <input className="border rounded mr-2"
                    type="text"
                    placeholder="Workout Details"
                    value={newWorkoutDetails}
                    onChange={(e) => setNewWorkoutDetails(e.target.value)}
                /> */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded" onClick={createWorkout}>Add workout</button>
            </form>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    );
};

