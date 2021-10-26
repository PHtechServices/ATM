import axios from 'axios';
import { useState } from 'react';
import './loginScreen.css'
import ReactDOM from 'react-dom';
import React from 'react';
import HomeScreen from '../home/homeScreen';
import MenuButtons from '../home/menuButtons';
import Notices from '../rightSideBar/notices';
import ChatBar from '../sideChatBar/chatBar';

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onUserChange = (e) => {
    setUserName(e.target.value);
  }

  const onPassChange = (e) => {
    setPassword(e.target.value);
  }

  const validateUser = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      "userDetails": {
        "userName": userName,
        "password": password,
        "isParent":"0"
      }
    });

    var config = {
      method: 'POST',
      url: 'http://34.136.41.197:5000/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        var status = response.data.message
        const dd = response.data.uName
        var mail = response.data.mailID[0]
        var role = response.data.role[0]
        var designation = response.data.designation
        let cTask = true
        let cUser = true
        if (role === "dean" || role === "director" || role === "principal" || role === "vicePrincipal") {
          cTask = true
          cUser = true
        }
        else if (role === "studentCoordinator" || role === "teacherCoordinator") {
          cTask = true
          cUser = false
        }
        else {
          cTask = false
          cUser = false
        }

        if (status === "UserName or Password is Incorrect") {
          ReactDOM.render(
            <React.StrictMode>
              <HomeScreen name={dd} mail={mail} designation={designation}/>
            </React.StrictMode>,
            document.getElementById('dLogin'));
        }

        else {
          var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/getProfileInfo',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              "mail": mail
            }
          };

          axios(config)
            .then(response => {
              var profileInformation = response.data
              let classTeacher
              let rmEmail
              let rmName
              let subjects
              Object.keys(profileInformation).map((key, index) => {

                if (key === "classTeacher") {
                  classTeacher = profileInformation[key]
                }
                if (key === "reportingManagerEmail") {
                  rmEmail = profileInformation[key]
                }
                if (key === "reportingManagerName") {
                  rmName = profileInformation[key]
                }
                if (key === "subjects") {
                  subjects = profileInformation[key]
                }
                ReactDOM.render(
                  <React.StrictMode>
                    <MenuButtons role={dd} mail={mail} cTask={cTask} cUser={cUser} name={dd} classTeacher={classTeacher} rmEmail={rmEmail} rmName={rmName} subjects={subjects} />
                  </React.StrictMode>,
                  document.getElementById('root')
                );
              })
              const data = JSON.stringify({
                "assigned": mail
              });

              var config = {
                method: 'POST',
                url: 'http://34.136.41.197:5000/taskassign',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              };

              axios(config)
                .then(response => {
                  var description = response.data["data"]
                  const completedTasksLength = Object.keys(description["completedTask"][0]).length
                  const incompleteTasks = Object.keys(description["activeTask"][0]).length+Object.keys(description["backlogTask"][0]).length+Object.keys(description["futureTask"][0]).length+Object.keys(description["urgentTask"][0]).length
                  ReactDOM.render(
                    <React.StrictMode>
                      <ChatBar designation={designation} name={dd} mail={mail} classTeacher={classTeacher} rmEmail={rmEmail}
                        rmName={rmName} subjects={subjects} completedTasksLength={completedTasksLength} incompleteTasks={incompleteTasks}/>
                    </React.StrictMode>,
                    document.getElementById('sideb'));

                })

              ReactDOM.render(
                <React.StrictMode>
                  <HomeScreen name={dd} mail={mail} />
                </React.StrictMode>,
                document.getElementById('dLogin'));
              ReactDOM.render(
                <React.StrictMode>
                  <Notices mail={mail} name={dd} cTask={cTask} cUser={cUser} />
                </React.StrictMode>,
                document.getElementById('notices'));


            }
            )
        }
      })

  }

  return (
    <div id="loginScreen" style={{ width: "80%", marginLeft: "-30%", marginTop: "20%" }}>
      <form id="contact" onSubmit={validateUser}>
        <h3>Log In</h3>
        <fieldset>
          <input placeholder="User Name" type="text" tabindex="1" onChange={onUserChange} required autofocus />
        </fieldset>
        <fieldset>
          <input placeholder="Password" type="password" tabindex="2" onChange={onPassChange} required />
        </fieldset>
        <fieldset>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
