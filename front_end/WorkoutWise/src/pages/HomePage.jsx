import { Link } from "react-router-dom"
export const HomePage = () => {
    return(
        <div className="h-screen flex justify-center items-center">
                <div className="bg-slate-600 p-5 text-center">
                <p className=" font-sedgwick text-8xl pr-4 text-lime-400">WorkoutWise</p>
                <div className="p-5 pb-0">
                    <p>New User? Sign up here!</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white mt-2 py-1 px-4 rounded ml-auto">
                        <Link to="register">
                            Register
                        </Link>
                    </button>
                </div>
                <div className="p-5">
                    <p>Returning User? Sign in here!</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white mt-2 py-1 px-4 rounded">
                        <Link to="login">
                            Login
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}