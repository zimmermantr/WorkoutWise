import { useContext } from "react"
import { userContext } from "../App"
import ExerciseCard from "../components/ExerciseCard"
import { useOutletContext } from "react-router-dom"
import WorkoutCard from "../components/WorkoutCard"

export const WorkoutPage = () => {
    const { workout } = useContext(userContext)

    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleExerciseAddition = ({ exercise, workout }) => {
        setSelectedExercises([...selectedExercises, { exercise, workout }]);
    };


    return (
        <div>
            <div>
                {selectedExercises.map((selectedExercise, index) => (
                    <div key={index}>
                        <p>{selectedExercise.exercise.name} - {selectedExercise.workout.workout_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}