import { Link } from "react-router-dom";
export default function Navbar() {

    return (
    <>
        (<nav>
            <h1>WorkoutWise</h1>
            <Link>Home</Link>
            <Link>Workout</Link>
            <input type="text" placeholder="search" />
            <button >
            <Link >
                Search
            </Link>
            </button>
        </nav>)
    </>
    );
  }