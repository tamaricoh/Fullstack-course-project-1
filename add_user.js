// @author Tamar Cohen

import { useState } from "react";

function Add_user(props) {
  const [addUser, setAddUser] = useState({
    id: props.id,
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  }); // sets the new user's Json , updating when inputs changes

  return (
    <div>
      <label style={{ float: "left" }}>Add New User </label>
      <br />
      <div
        style={{
          border: "1px solid black",
          textAlign: "left",
          padding: "10px",
          height: "110px",
        }}
      >
        <br />
        <u
          style={{
            textDecorationColor: "blue",
            textDecorationThickness: "3px",
          }}
        >
          Name :
        </u>
        <input
          type="text"
          onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
        />
        <br />
        <u
          style={{
            textDecorationColor: "blue",
            textDecorationThickness: "3px",
          }}
        >
          Email :
        </u>
        &nbsp;
        <input
          type="text"
          onChange={(e) => setAddUser({ ...addUser, email: e.target.value })}
        />
        <br />
        <br />
        {/* each button close the 'add new user' tab. */}
        <span style={{ float: "right" }}>
          <input
            type="button"
            value="Cancel"
            style={{ backgroundColor: "#FFF9A6" }}
            onClick={() => props.cancelCallback()}
          />
          <input
            type="button"
            value="Add"
            style={{ backgroundColor: "#FFF9A6" }}
            onClick={() => {
              if (props.emailValidCallback(addUser.email)) {
                props.addUserCallback(addUser);
                props.cancelCallback();
              } else alert("You have entered an invalid email address");
            }}
          />
        </span>
      </div>
    </div>
  );
}

export default Add_user;

// @author Tamar Cohen
