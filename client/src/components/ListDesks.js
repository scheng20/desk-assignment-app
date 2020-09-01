import React, { Fragment, useEffect, useState } from "react";

import EditDesk from "./EditDesk";

const ListDesks = () => {
  const [desks, setDesks] = useState([]);
  const [searchDeskNum, setSearchDeskNum] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchManagerName, setSearchManagerName] = useState("");

  //delete todo function

  /*
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  */

  const searchDesk = async (e, deskNum, firstName, lastName, managerName) => {

    e.preventDefault();
    getDesks();

    try {
      if (searchDeskNum !== "" || searchFirstName !== "" || searchLastName !== "" || searchManagerName !== "") {
        setDesks(desks.filter(desk => (desk.desk_num === deskNum) || (desk.first_name === firstName) || (desk.last_name === lastName) || (desk.manager_name === managerName)));
      }
      
      // TODO: Improve search function. Currently everything has to be exact matches

      /*
        setDesks(desks.filter(desk => (desk.desk_num.includes(deskNum) || 
                                       desk.first_name.includes(firstName) || 
                                       desk.last_name.includes(lastName) || 
                                       desk.manager_name.includes(managerName))));

      */

    } catch (err) {
      console.error(err.message);
    }
  }

  const getDesks = async () => {

    try {
      if (searchDeskNum === "" && searchFirstName === "" && searchLastName === "" && searchManagerName === "") {
        const response = await fetch("http://localhost:5000/desks");
        const jsonData = await response.json();
        setDesks(jsonData);
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDesks();
  }, []);

  return (
    <Fragment>
      <div onClick = {() => getDesks()}>
        <form class = "mt-5" >
          <div class="form-row">
            <div class="form-group col">
              <input type="text" class="form-control" id="inputDeskNumber" placeholder="Desk-Number" onChange={e => setSearchDeskNum(e.target.value)}/>
            </div>
            <div class="form-group col">
              <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" onChange={e => setSearchFirstName(e.target.value)}/>
            </div>
            <div class="form-group col">
              <input type="text" class="form-control" id="inputLastName" placeholder="Last Name" onChange={e => setSearchLastName(e.target.value)}/>
            </div>
            <div class="form-group col">
              <input type="text" class="form-control" id="inputManagerName" placeholder="Manager Name" onChange={e => setSearchManagerName(e.target.value)}/>
            </div>
            <div class = "form-group col-1">
              <button className="btn btn-success" onClick={(e) => searchDesk(e, searchDeskNum, searchFirstName, searchLastName, searchManagerName)}>Search</button>
            </div>
          </div>
        </form>

        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Desk Number</th>
              <th>I Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Manager Name</th>
              <th>Is Intern</th>
              <th>Is Vacant</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {desks.map(desk => (
              <tr key={desk.entry_id}>
                <td>{desk.desk_num}</td>
                <td>{desk.i_num}</td>
                <td>{desk.first_name}</td>
                <td>{desk.last_name}</td>
                <td>{desk.manager_name}</td>
                <td>{desk.intern.toString()}</td>
                <td>{desk.vacancy.toString()}</td>
                <td>
                  <EditDesk desk={desk}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListDesks;