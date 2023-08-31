import { useContext } from "react";
import { userContext } from "../App";
import ExerciseCard from "./ExerciseCard";

export default function WorkoutCard({workout}) {
    const { workouts, deleteWorkout } = useContext(userContext);

    return(
        <div>
            <div key={workout.id} className="bg-slate-300 border-2 p-5 m-5 max-w-1000">
                <p className="text-3xl font-bold">{workout.workout_name}</p>
                <div>
                    {workout.exercises.map((exercise) => (
                        <div key={exercise.id} >
                            <ExerciseCard
                                key={exercise.id}
                                workout_id={exercise.parent_workout}
                                exercise_id={exercise.id}
                                exercise_name={exercise.exercise_name}
                                targeted_muscles={exercise.targeted_muscles}
                                equipment={exercise.equipment}
                                difficulty={exercise.difficulty}
                                description={exercise.description}
                            />
                        </div>
                    ))}
                </div>
                <button className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded " onClick={() => deleteWorkout(workout.id)}>Delete</button>
            </div>
        </div>
    )
}