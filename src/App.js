import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import NoFound from "./Components/NoFound/NoFound";
import Account from "./Components/Account/Account";
import Users from "./Components/Users/Users";
import UserUpdate from "./Components/UserUpdate/UserUpdate";

function App() {

  return (
    document.cookie.length > 0 ? 
    <Routes>
      <Route path="/" element={<Account />} >
        <Route index element={<></>} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserUpdate />} />
        <Route path="*" element={<NoFound />} />
      </Route>
    </Routes>
    :
    <>
      <Routes>
        <Route path="/" element={<Navbar logIN_logOut={false} />} >
          <Route index element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="*" element={<NoFound />} />
        </Route>
      </Routes>
    </>
  );

}
export default App;