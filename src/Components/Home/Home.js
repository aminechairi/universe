import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="ab_home">
      <div className="ctn">
        <div className="t">
          <h1 className="h1">universe</h1>
          <p>
            WebLog into  universe to start sharing and connecting with your friends, family, and people you know. Connect with friends and the world around you on  universe
          </p>
          <Link to="/sign-up">
            <button>
              get start now
            </button>
          </Link>
        </div>
        <div className="i">
          <img src={require('../../imgs/full-stack.webp')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Home;