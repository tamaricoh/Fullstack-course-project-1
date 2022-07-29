// @author Tamar Cohen

import { useEffect, useState } from "react";

function Present_info(props) {
  const [user, setUser] = useState(props.info); // user's data
  const [userAddress, setUserAddress] = useState(user.address); // user's address
  const [color, setColor] = useState(); // border color
  const [show, setShow] = useState(false); // true if 'other data' is showen
  const [clicked, setClicked] = useState(false); // true if todos and posts is showen

  // determine color of border (case 1)
  useEffect(() => {
    // check if number of todos equals number of completed todos
    let userTodos = props.todo.filter((x) => x.userId == user.id);
    let completed = userTodos.filter((x) => x.completed);
    userTodos.length == completed.length
      ? setColor("lightgreen")
      : setColor("red");
  });

  useEffect(() => {
    // update user's address *in this level*
    setUser({ ...user, address: userAddress });
  }, [userAddress]);

  return (
    <div
      style={{
        margin: "auto",
        border: `4px solid ${color}`,
        marginTop: "10px",
        width: "80%",
        padding: "10px",
        textAlign: "left",
        backgroundColor: `${clicked ? "#FED8B1" : "white"}`,
      }}
    >
      <label
        onClick={() => {
          // if something is already displayed on the right side of the screen, we will not be able to display
          if (props.canShow) {
            setClicked(!clicked);
            props.presentExtraCallback(user.id);
            props.setIfCanShowCallback(false);
          } else if (clicked) {
            setClicked(!clicked);
            props.presentExtraCallback(user.id);
            props.setIfCanShowCallback(true);
          } else {
            alert("Please close the open tab and try again");
          }
        }}
      >
        {/* on every textbox change - we will update user's data *in this level* */}
        <u
          style={{
            textDecorationColor: "blue",
            textDecorationThickness: "3px",
          }}
        >
          ID :
        </u>
        {user.id}
      </label>
      <br />
      <u
        style={{
          textDecorationColor: "blue",
          textDecorationThickness: "3px",
        }}
      >
        Name :
      </u>
      &nbsp;
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <br />
      <u
        style={{
          textDecorationColor: "blue",
          textDecorationThickness: "3px",
        }}
      >
        Email :{" "}
      </u>
      &nbsp;
      <input
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <br />
      <br />
      {/* (case 3) */}
      <span
        style={{ backgroundColor: "lightgrey" }}
        onMouseOver={() => setShow(true)}
        onClick={() => setShow(false)}
      >
        Other Data
      </span>
      {/* if show is true - present 'other data' */}
      {show && (
        <div
          style={{
            backgroundColor: "lightgray",
            border: "1px solid black",
            borderRadius: "25px",
            padding: "10px",
          }}
        >
          <table>
            <tbody>
              <tr>
                <th style={{ fontWeight: "normal" }}>Street :</th>
                <th>
                  <input
                    type="text"
                    size="15"
                    value={userAddress.street}
                    onChange={(e) =>
                      setUserAddress({ ...userAddress, street: e.target.value })
                    }
                  />
                </th>
              </tr>
              <tr>
                <th style={{ fontWeight: "normal" }}>City :</th>
                <th>
                  <input
                    type="text"
                    size="15"
                    value={userAddress.city}
                    onChange={(e) =>
                      setUserAddress({ ...userAddress, city: e.target.value })
                    }
                  />
                </th>
              </tr>
              <tr>
                <th style={{ fontWeight: "normal" }}>Zip Code :</th>
                <th>
                  <input
                    type="text"
                    size="15"
                    value={userAddress.zipcode}
                    onChange={(e) =>
                      setUserAddress({
                        ...userAddress,
                        zipcode: e.target.value,
                      })
                    }
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      &emsp; &emsp; &emsp;
      {/* update and delete will send the user (from this level , with the changes) to the parent */}
      {/* deletion is done according to the id, so the rest of the transferred data is irrelevant */}
      <input
        type="button"
        value="Update"
        style={{ backgroundColor: "#FFF9A6" }}
        onClick={() => {
          if (props.emailValidCallback(user.email)) props.updateCallback(user);
          else alert("You have entered an invalid email address");
        }}
      />
      <input
        type="button"
        value="Delete"
        style={{ backgroundColor: "#FFF9A6" }}
        onClick={() => props.deletionCallback(user)}
      />
    </div>
  );
}

export default Present_info;

// @author Tamar Cohen
