import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import "./UserUpdate.css";
import Error from "../Error/Error";
import Load from "../Load/Load";

let initials = {
  name: false,
  email: false,
  password: false,
  passwordr: false,
}

let data_verefication = {
  name: false,
  email: false,
  password: false,
  passwordr: false,
}

function UserUpdate() {

  let [name, setname] = React.useState("");
  let [email, setemail] = React.useState("");
  let [password, setpassword] = React.useState("");
  let [passwordr, setpasswordr] = React.useState("");

  let [submit, setSubmit] = React.useState(true);

  let [resEmailEr, setResEmailEr] = React.useState(false);

  let [requ, setRequ] = React.useState(false);

  let [alert, setAlert] = React.useState(false);

  let useId = useParams();

    React.useEffect(() =>{

      async function fetchData() {

        try {

          let res = await axios.get(`http://127.0.0.1:8000/api/user/showbyid/${useId.id}`);
          let data = res.data[0];
          await setname(data.name);
          await setemail(data.email);
          
        } catch (error) {
          setname(null);
        }

      }
      fetchData();

    }, [useId.id]);



  async function submitFn (e) {

    e.preventDefault();

    initials.name = true;
    initials.email = true;
    initials.password = true;
    initials.passwordr = true;

    setSubmit(!submit);

      if (
        data_verefication.name === true &&
        data_verefication.email === true &&
        data_verefication.password === true &&
        data_verefication.passwordr === true 
      ) {

        try {

          await setRequ(true);

          let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${useId.id}`, {
            name: name.toLowerCase(),
            email: email,
            password: password,
            password_confirmation: passwordr,
          });


          if (res.status === 200) {
            window.location.pathname = await `/users`;
          }

          await sessionStorage.clear();

          await setRequ(false);

          initials.name = false;
          initials.email = false;
          initials.password = false;
          initials.passwordr = false;

          data_verefication.name = false;
          data_verefication.email = false;
          data_verefication.password = false;
          data_verefication.passwordr = false;

          setname("");
          setemail("");
          setpassword("");
          setpasswordr("");

          setResEmailEr(false);

          setAlert(false);

        } catch (error) {

          await setRequ(false);

          if (error.request.status === 422) {
            setResEmailEr(true);
          }

          if (error.request.status === 0) {
            setAlert(true);
          }

        }
      }
  }

  return (
    name === "" 
    ? <Load />
    :
    name === null 
    ? <Error />
    :
    <div className="ab_update">
      <div className="ctn">
        <form action="" onSubmit={submitFn} >

          <div className="alert" 
          style={{
            display: alert === false 
            ? "none"
            : "block",
          }}>
            Due to technical difficulties we are unable to process your request. Please try again later.
          </div>

          <div className="requ" style={{
            display: requ === true ? "block" : "none" ,
          }}></div>

          {/* user name */}
          <label htmlFor="user_name">user name</label>
          <input
          type={"text"} id="user_name"
          placeholder="user name" value={name}
          maxLength="24"
          onChange={(e) => {
            initials.name = true;
            setname(e.target.value)
          }} />
          {
            initials.name === true 
            ?  name === "" 
              ? <p className="alerts">Enter the username {data_verefication.name = false} </p>
              : data_verefication.name = true
            : null
          }


          {/* email */}
          <label htmlFor="email">email</label>
          <input
          type={"email"}
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            initials.email = true;
            setemail(e.target.value)
          }} />
          {
            initials.email === true 
            ?  email === "" 
              ? <p className="alerts">Enter the username {data_verefication.email = false} </p>
              : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) === false 
                ? <p className="alerts">this is not an email {data_verefication.email = false} </p>
                : data_verefication.email = true
            : null
          }
          {
            resEmailEr === true 
            ? <p className="alerts">This email has already been used</p>
            : null
          }


          {/* password */}
          <label htmlFor="password">password</label>
          <input
          type={"password"}
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            initials.password = true
            setpassword(e.target.value)
          }} />
          {
            initials.password === true 
            ? password.length === 0
              ? <p className="alerts">Enter the password {data_verefication.password = false}</p>
              : password.length < 8 
                ? <p className="alerts">Password must be more than 8 characters {data_verefication.password = false} </p>
                : data_verefication.password = true
            : null
          }

          {/* passwordr */}
          <label htmlFor="repeatPassword">repeat password</label>
          <input
          type={"password"}
          id="repeatPassword"
          placeholder="repeat password"
          value={passwordr} 
          onChange={(e) => {
            initials.passwordr = true;
            setpasswordr(e.target.value)
          }} />
          {
            initials.passwordr === true 
            ? passwordr.length === 0 
              ? <p className="alerts">Re-enter the password {data_verefication.passwordr = false}</p>
              : passwordr !== password && password.length > 0
                ? <p className="alerts">The password does not match the first password {data_verefication.passwordr = false}</p>
                : data_verefication.passwordr = true
            : null
          }

          {/* submit */}
          <button type="submit">
            update
          </button>

        </form>
      </div>
    </div>
  )
}
export default UserUpdate;