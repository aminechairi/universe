import axios from "axios";
import React from "react";

let initials = {
  email: false,
  password: false,
}

let data_verefication = {
  email: false,
  password: false,
}

function Login()  {

  let [email, setemail] = React.useState(
    sessionStorage.getItem("login_email") 
    ? sessionStorage.getItem("login_email")
    : ""
  );
  let [password, setpassword] = React.useState(
    sessionStorage.getItem("login_password")
    ? atob(sessionStorage.getItem("login_password"))
    : ""
  );

  let [submit, setSubmit] = React.useState(true);

  let [requ, setRequ] = React.useState(false);

  let [emps, setEmsp] = React.useState(false);

  let [alert, setAlert] = React.useState(false);

  async function submitFn (e) {

    e.preventDefault();

    initials.email = true;
    initials.password = true;

    setSubmit(!submit);

      if (
        data_verefication.email === true &&
        data_verefication.password === true
      ) {

        try {

          await setRequ(true);

          let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password,
          });

          if (res.status === 200) {
            document.cookie = await `username=${res.data.data.token}; expires=Sun Jan 08 2050 21:55:19 GMT+0300 (Arabian Standard Time); path=/`;
            window.location.pathname = await `/`;
          }

          await sessionStorage.clear();

          await setRequ(false);

          initials.email = false;
          initials.password = false;

          data_verefication.email = false;
          data_verefication.password = false;

          setemail("");
          setpassword("");

          setEmsp(false);

          setAlert(false);

        } catch (error) {

          await setRequ(false);

          if (error.request.status === 401) {
            setEmsp(true);
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
          display: emps === false 
          ? "none"
          : "block",
        }}>
          The email or password is incorrect
        </div>

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
            sessionStorage.setItem("login_email", e.target.value)
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
            sessionStorage.setItem("login_password", btoa(e.target.value))
          }} />
          {
            initials.password === true 
            ? password.length === 0
              ? <p className="alerts">Enter the password {data_verefication.password = false}</p>
              : data_verefication.password = true
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

export default Login;