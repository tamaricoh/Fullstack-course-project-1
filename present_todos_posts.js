// @author Tamar Cohen

import { useState } from "react";

function Present_todos_posts(props) {
  const [posts, setPosts] = useState(props.post); // user's posts
  const [todos, setTodos] = useState(props.todo); // user's todos
  const [id] = useState(props.id); // user's id
  const [toAdd, setToAdd] = useState(false); //true if we want to add a todo
  const [poAdd, setPoAdd] = useState(false); //true if we want to add a post
  const [newTodo, setNewTodo] = useState(); // the title of the new todo
  const [newPost, setNewPost] = useState({ title: "", body: "" }); //the title and body of the new post

  return (
    <div>
      {/* todos section */}
      {!toAdd ? (
        // todos list
        <div>
          <label style={{ float: "left" }}>Todos - User {id}</label>
          <input
            type="button"
            value="Add"
            style={{
              backgroundColor: "#FFF9A6",
              float: "right",
            }}
            onClick={() => setToAdd(true)}
          />
          <br />
          <div
            style={{
              marginTop: "10px",
              border: "1px solid black",
            }}
          >
            {todos.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: "49%",
                    border: "1px solid purple",
                    marginTop: "10px",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  <u
                    style={{
                      textDecorationColor: "blue",
                      textDecorationThickness: "3px",
                    }}
                  >
                    Title :
                  </u>
                  &nbsp;
                  {x.title}
                  <br />
                  <u
                    style={{
                      textDecorationColor: "blue",
                      textDecorationThickness: "3px",
                    }}
                  >
                    Completed :
                  </u>
                  &nbsp;
                  {x.completed.toString()}
                  {/* if false - add 'mark completed' button  */}
                  {!x.completed && (
                    <input
                      type="button"
                      value="Mark Completed"
                      style={{ backgroundColor: "#FFF9A6", float: "right" }}
                      onClick={() => {
                        props.completedCallback(x.title, id);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // add new todo
        <div>
          <label style={{ float: "left" }}>New Todo - User {id}</label>
          <br />
          <div
            style={{
              marginTop: "10px",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <u
              style={{
                textDecorationColor: "blue",
                textDecorationThickness: "3px",
              }}
            >
              Title :
            </u>
            &nbsp;
            <input type="text" onChange={(e) => setNewTodo(e.target.value)} />
            <br />
            <input
              type="button"
              value="Add"
              style={{ backgroundColor: "#FFF9A6", float: "right" }}
              onClick={() => {
                // add new task to this level todos array , and send it to the parent
                let task = {
                  userId: id,
                  title: newTodo,
                  completed: false,
                };
                let arr = todos;
                arr.push(task);
                setTodos(arr);
                setToAdd(false);
                props.addTaskCallback(task);
              }}
            />
            <input
              type="button"
              value="Cancel"
              style={{ backgroundColor: "#FFF9A6", float: "right" }}
              onClick={() => setToAdd(false)}
            />
            &nbsp;
          </div>
        </div>
      )}
      <br />
      {/* posts section */}
      {!poAdd ? (
        // posts list
        <div>
          <br />
          <label style={{ float: "left" }}>Posts - User {id}</label>
          <input
            type="button"
            value="Add"
            style={{
              backgroundColor: "#FFF9A6",
              float: "right",
            }}
            onClick={() => setPoAdd(true)}
          />
          <br />
          <div
            style={{
              marginTop: "10px",
              border: "1px solid black",
            }}
          >
            {posts.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{
                    margin: "0px auto",
                    height: "49%",
                    border: "1px solid purple",
                    marginTop: "10px",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  <u
                    style={{
                      textDecorationColor: "blue",
                      textDecorationThickness: "3px",
                    }}
                  >
                    Title :
                  </u>
                  &nbsp;
                  {x.title}
                  <br />
                  <u
                    style={{
                      textDecorationColor: "blue",
                      textDecorationThickness: "3px",
                    }}
                  >
                    Body :
                  </u>
                  &nbsp;
                  {x.body}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // add new post
        <div>
          <label style={{ float: "left" }}>New Post - User {id}</label>
          <br />
          <div
            style={{
              marginTop: "10px",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <u
              style={{
                textDecorationColor: "blue",
                textDecorationThickness: "3px",
              }}
            >
              Title :
            </u>
            &nbsp;
            <input
              type="text"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <br />
            <u
              style={{
                textDecorationColor: "blue",
                textDecorationThickness: "3px",
              }}
            >
              Body :
            </u>
            &nbsp;
            <input
              type="text"
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <br />
            <input
              type="button"
              value="Add"
              style={{ backgroundColor: "#FFF9A6", float: "right" }}
              onClick={() => {
                // add new post to this level posts array , and send it to the parent
                let post = {
                  uderId: id,
                  title: newPost.title,
                  body: newPost.body,
                };
                let arr = posts;
                arr.push(post);
                setPosts(arr);
                props.addPostCallback(post);
                setPoAdd(false);
              }}
            />
            <input
              type="button"
              value="Cancel"
              style={{ backgroundColor: "#FFF9A6", float: "right" }}
              onClick={() => setPoAdd(false)}
            />
            &nbsp;
          </div>
        </div>
      )}
    </div>
  );
}

export default Present_todos_posts;

// @author Tamar Cohen
