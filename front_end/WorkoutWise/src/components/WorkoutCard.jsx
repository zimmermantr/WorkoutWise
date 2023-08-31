import { useContext } from "react";
import { userContext } from "../App";
import ExerciseCard from "./ExerciseCard";

export default function WorkoutCard() {
    const { workout } = useContext(userContext);

    return(
        <div>
            <h2>Workout</h2>
            {workout.length === 0 && <h3>No Exercises Added</h3>}
            {workout.length !== 0 && (
                <div>
                    {workout.map((exercise, index) => (
                        <ExerciseCard
                            key={index}
                            exercise_name={exercise.name}
                            targeted_muscles={exercise.muscle}
                            equipment={exercise.equipment}
                            difficulty={exercise.difficulty}
                            description={exercise.instructions}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}