import axios from "axios";
import React from "react";

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

function Signup()  {

  let [name, setname] = React.useState(
    sessionStorage.getItem("name") 
    ? sessionStorage.getItem("name")
    : ""
  );
  let [email, setemail] = React.useState(
    sessionStorage.getItem("email") 
    ? sessionStorage.getItem("email")
    : ""
  );
  let [password, setpassword] = React.useState(
    sessionStorage.getItem("password")
    ? atob(sessionStorage.getItem("password"))
    : ""
  );
  let [passwordr, setpasswordr] = React.useState(
    sessionStorage.getItem("passwordr")
    ? atob(sessionStorage.getItem("passwordr"))
    : ""
  );

  let [submit, setSubmit] = React.useState(true);

  let [resEmailEr, setResEmailEr] = React.useState(false);

  let [requ, setRequ] = React.useState(false);

  let [alert, setAlert] = React.useState(false);

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

          let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
            name: name.toLowerCase(),
            email: email,
            password: password,
            password_confirmation: passwordr,
          });

          if (res.status === 200) {
            document.cookie = await `username=${res.data.data.token}; expires=Sun Jan 08 2050 21:55:19 GMT+0300 (Arabian Standard Time); path=/`;
            window.location.pathname = await `/`;
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
    <div className="ab_signup">
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
            sessionStorage.setItem(`name`, e.target.value);
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
            sessionStorage.setItem(`email`, e.target.value);
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
            sessionStorage.setItem(`password`, btoa(e.target.value));
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
            sessionStorage.setItem(`passwordr`, btoa(e.target.value));
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
            submit
          </button>

        </form>
        <div className="img">
          <img src={require("../../imgs/work-steps.png")} alt="" />
        </div>
      </div>
    </div>
  )
}
export default Signup;