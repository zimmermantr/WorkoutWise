import { Link } from "react-router-dom"
export const HomePage = () => {
    return(
        <>
            <h1>HomePage</h1>
            <p>New User? Sign up here!</p>
            <button>
                <Link to="register">
                    Register
                </Link>
            </button>
            <p>Returning User? Sign in here!</p>
            <button>
                <Link to="login">
                    Login
                </Link>
            </button>
        </>
    )
}