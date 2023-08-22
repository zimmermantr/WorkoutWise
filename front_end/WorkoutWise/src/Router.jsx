import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage"; 
import { WorkoutListsPage } from "./pages/WorkoutListsPage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { ExercisesPage } from "./pages/ExercisesPage";
import { Error404Page } from "./pages/Error404Page";
import App from "./App";
import { MyExercises } from "./pages/MyExercises";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "workouts",
                element: <WorkoutListsPage />
            },
            {
                path: "workout",
                element: <WorkoutPage />
            },
            {
                path: "exercises/:searchParameters",
                element: <ExercisesPage />
            },
            {
                path: "myexercises",
                element: <MyExercises />
            },
            {
                path: "*",
                element: <Error404Page />
            }
        ]
    }
]);