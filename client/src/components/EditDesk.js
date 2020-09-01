import React, { Fragment, useState, useEffect} from "react";

const EditDesk = ({ desk }) => {
  const [inumber, setINumber] = useState(desk.i_num);
  const [firstname, setFirstName] = useState(desk.first_name);
  const [lastname, setLastName] = useState(desk.last_name);
  const [managername, setManagerName] = useState(desk.manager_name);
  const [intern, setIntern] = useState(desk.intern);
  const [vacant, setVacancy] = useState(desk.vacancy);
  const [notes, setNotes] = useState(desk.notes);

  //edit desk info function
  const updateDesk = async e => {

    e.preventDefault();

    try {

      const body = { inumber, firstname, lastname, managername, intern, vacant, notes};
      const response = await fetch(
        `http://localhost:5000/desk/${desk.entry_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  // check for non-vacant desks
  useEffect(() => {
    if (inumber !== "NA" || 
       firstname !== "NA" ||
       lastname !== "NA" ||
       managername !== "NA") {
      setVacancy(false);
    }
  }, [updateDesk]);

  const updateInfo = () => {

    setINumber(desk.i_num);
    setFirstName(desk.first_name);
    setLastName(desk.last_name);
    setManagerName(desk.manager_name);
    setIntern(desk.intern);
    setVacancy(desk.vacancy);
  }

  const clearDesk = () => {

    setINumber("NA");
    setFirstName("NA");
    setLastName("NA");
    setManagerName("NA");
    setIntern(false);
    setVacancy(true);
  }

  const updateInternStatus = (e) => {
    if (e === "Yes") {
      setIntern(true);
    } else if (e === "No") {
      setIntern(false);
    }
  }

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${desk.entry_id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      
      <div
        class="modal"
        id={`id${desk.entry_id}`}
        //onClick={() => updateInfo()}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => updateInfo()}
              >
                &times;
              </button>
            </div>
            
            <div class="modal-body text-left">

              <form>
                <div class="form-row">
                  <div class="form-group col">
                    <label for="inputINumber">I-Number</label>
                    <input type="text" class="form-control" id="inputINumber" placeholder="I-Number" value={inumber} onChange={e => setINumber(e.target.value)}/>
                  </div>
                  <div class="form-group col">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" value={firstname} onChange={e => setFirstName(e.target.value)}/>
                  </div>
                  <div class="form-group col">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" class="form-control" id="inputLastName" placeholder="Last Name" value={lastname} onChange={e => setLastName(e.target.value)}/>
                  </div>
                </div>
                <div class="form-row">
                   <div class="form-group col-md-8">
                      <label for="inputManagerName">Manager Name</label>
                      <input type="text" class="form-control" id="inputManagerName" placeholder="Manager Name" value={managername} onChange={e => setManagerName(e.target.value)}/>
                   </div>
                   <div class="form-group col-md-4">
                      <label for="inputInternStatus">Is Intern</label>
                      <select id="inputInternStatus" class="form-control" onClick={e => updateInternStatus(e.target.value)}>
                        <option value="" selected disabled hidden>Choose here</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                   </div>
                </div>
              </form>

              {/*
              <input
                type="text"
                className="form-control"
                value={inumber}
                onChange={e => setINumber(e.target.value)}
              />
              */}
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                onClick={e => clearDesk(e)}
              >
                Vacant Desk
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => updateDesk(e)}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => updateInfo()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditDesk;