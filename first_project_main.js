// @author Tamar Cohen

import { useEffect, useState } from "react";
import util from "./first_project_util";
import Present_info from "./present_info";
import Present_todos_posts from "./present_todos_posts";
import Add_user from "./add_user";

function First_project_main(props) {
  const [usersStatic, setUsersStatic] = useState([]); // all users
  const [users, setUsers] = useState([]); // users to show (according to the search bar)
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false); // in order to present data only when we have all the data. project can work without it but the users will had green border for 0.1 sec.
  const [toDelete, setToDelete] = useState([{}]); // holds the user we want to delete
  const [toPresent, setToPresent] = useState([false]); // [false] if we dont want to show extra info of a specific user, [true , id] if we want
  const [canShow, setCanShow] = useState(true); // true if right side is blank
  const [clicked, setClicked] = useState(false); // true if 'Add' button is clicked and the right side is blank
  const [numOfUsers, setNumOfUsers] = useState(0); // last id used (new user will get this+1 as ID)

  // gets all data
  useEffect(() => {
    const getData = async () => {
      let resp = await util.getUsers();
      setUsersStatic(resp.data);
      setUsers(resp.data);
      setNumOfUsers(resp.data.length);
      resp = await util.getTodos();
      setTodos(resp.data);
      resp = await util.getPosts();
      setPosts(resp.data);
      setIsDataSaved(true);
    };
    getData();
  }, []);

  // search function (case 2)
  const search = (filterBy) => {
    // set Users (not usersStatic) to be the filtered array
    filterBy == ""
      ? setUsers(usersStatic)
      : setUsers(
          usersStatic.filter((x) => {
            if (
              `${x.name}`.toLowerCase().includes(`${filterBy}`.toLowerCase()) |
              `${x.email}`.toLowerCase().includes(`${filterBy}`.toLowerCase())
            )
              return x;
          })
        );
  };

  // update (case 4)
  const updateUser = (e) => {
    // search the user in `users` and `usersStatic` and update its info
    let arr = usersStatic;
    for (let i in arr) {
      if (arr[i].id == e.id) arr[i] = e;
    }
    setUsersStatic(arr);
    arr = users;
    for (let i in arr) {
      if (arr[i].id == e.id) arr[i] = e;
    }
    setUsers(arr);
  };

  // deletion (case 4)
  const deleteUser = (e) => {
    // calls the useEffect below
    // sets toDelete to be [the user we want to delete]
    setToDelete([e]);
  };

  useEffect(() => {
    // filters all arrays by user's id
    if (isDataSaved) {
      let arr = usersStatic.filter((x) => {
        if (x.id != toDelete[0].id) return x;
      });
      setUsersStatic(arr);
      arr = users.filter((x) => {
        if (x.id != toDelete[0].id) return x;
      });
      setUsers(arr);
      arr = todos.filter((x) => {
        if (x.userId != toDelete[0].id) return x;
      });
      setTodos(arr);
      arr = posts.filter((x) => {
        if (x.userId != toDelete[0].id) return x;
      });
      setPosts(arr);
    }
  }, toDelete);

  // present todos and posts (case 5)
  const presentExtraDataUser = (id) => {
    // if we want to show extra info it saves the id of the user
    toPresent[0] ? setToPresent([false]) : setToPresent([true, id]);
  };

  // sets todos to be completed
  const setCompletedTask = (title, id) => {
    // search the task in todos and set it as completed
    let arr = todos;
    for (let x of arr) {
      if ((x.title == title) & (x.userId == id)) {
        x.completed = true;
        break;
      }
    }
    setTodos([...arr]);
  };

  // add todo (case 6)
  const addTodo = (task) => {
    let arr = todos;
    arr.push(task);
    setTodos([...arr]);
  };

  // add post (case 7)
  const addPost = (post) => {
    let arr = posts;
    arr.push(post);
    setPosts([...arr]);
  };

  // handles the "cancel" button
  const cancelAddingUser = () => {
    setCanShow(true);
    setClicked(false);
  };

  // add user (case 8)
  const addingUser = (user) => {
    let arr = usersStatic;
    arr.push(user);
    setUsersStatic(arr);
    if (users.length != usersStatic.length) {
      arr = users;
      arr.push(user);
      setUsers(arr);
    }
    setNumOfUsers(numOfUsers + 1);
  };

  const emailValid = (checkEmail) => {
    return /\S+@\S+\.\S+/.test(checkEmail);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* left side */}
      <div
        style={{
          width: "50%",
          float: "left",
          border: "1px solid black",
          borderRadius: "25px",
          marginRight: "10px",
        }}
      >
        search :&nbsp;
        <input type="text" size="5" onChange={(e) => search(e.target.value)} />
        &emsp;
        <input
          type="button"
          value="Add"
          style={{ backgroundColor: "#FFF9A6" }}
          onClick={() => {
            // if something is already displayed on the right side of the screen, we will not be able to display
            if (canShow) {
              setClicked(!clicked);
              setCanShow(false);
            } else if (clicked) {
              setClicked(!clicked);
              setCanShow(true);
            } else alert("Please close the open tab and try again");
          }}
        />
        <br />
        <br />
        {/* if we have data , present it */}
        {isDataSaved &&
          users.map((item) => {
            return (
              <Present_info
                key={item.id}
                info={item}
                todo={todos}
                updateCallback={updateUser}
                deletionCallback={deleteUser}
                presentExtraCallback={presentExtraDataUser}
                setIfCanShowCallback={(bool) => setCanShow(bool)} // sets false if something is displayed on the right side of the screen
                canShow={canShow} // boolean - false if something is displayed on the right side of the screen
                emailValidCallback={emailValid}
              />
            );
          })}
      </div>
      {/* right side */}
      <div style={{ width: "48%", float: "right" }}>
        {/* presents the todos and posts of a specific user */}
        {toPresent[0] && (
          <Present_todos_posts
            // send the specific user's todos, posts and id
            todo={todos.filter((x) => {
              if (x.userId == toPresent[1]) return x;
            })}
            post={posts.filter((x) => {
              if (x.userId == toPresent[1]) return x;
            })}
            id={toPresent[1]}
            completedCallback={setCompletedTask}
            addTaskCallback={addTodo}
            addPostCallback={addPost}
          />
        )}
        {/* present the 'add user' tab */}
        {clicked && (
          <Add_user
            id={numOfUsers + 1}
            cancelCallback={cancelAddingUser}
            addUserCallback={addingUser}
            emailValidCallback={emailValid}
          />
        )}
      </div>
    </div>
  );
}

export default First_project_main;

// @author Tamar Cohen
