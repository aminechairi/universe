import "./Users.css";
import React from "react";
import axios from "axios";
import { AiFillDelete } from 'react-icons/ai';
import { CgEditExposure } from 'react-icons/cg';
import CircularIndeterminate from "../Load/Load";
import Error from "../Error/Error";
import NoFound from "../NoFound/NoFound";
import { Link } from "react-router-dom";

function Users() {

  let [data, setData] = React.useState(null);
  let [deleteUsers , setDeleteUsers] = React.useState(true);

  React.useEffect(() => {

      async function fetchData() {

        try {

          let res = await axios.get(`http://127.0.0.1:8000/api/user/show/`);
          let data = res.data;
          await setData(data);

        } catch (error) {
          
          setData("er");

        }

      }
      fetchData();

  }, [deleteUsers]);

  async function deleteUser(userId) {

    try {
      await setData(null);
      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${userId}`);
      await setDeleteUsers(!deleteUsers);
    } catch (error) {
      setData("er");
    }

  }

  return (
    data === null
    ?
    <CircularIndeterminate />
    : data === "er" 
    ? <Error />
    : data.length === 0
    ? <NoFound />
    :
    <div className="ab_users">
      <table className="table">
        <thead className="thead">
          <tr className="titles">
            <td>user id</td>
            <td>user name</td>
            <td>email</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody className="tbody">
          {
            data.map((el, index) => {
              return (
                <tr className="data" key={el.id}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td className="actions" >
                    <Link to={`${el.id}`}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth"
                        },);
                      }}
                    >
                      <CgEditExposure className="e" />
                    </Link>
                    <AiFillDelete className="d"
                      onClick={() => {
                        if (window.confirm(`delete ${el.email}`)) {
                          deleteUser(el.id);
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                          },);
                        }
                      }}
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
export default Users;