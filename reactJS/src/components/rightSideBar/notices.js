import "./notices.scss"
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClassIcon from '@mui/icons-material/Class';
import CreateTask from "../createTask/createTask"
import ReactDOM from 'react-dom';
import CreateUser from "../createUser/createUser";
import Meeting from "../meeting/meetings";
import axios from "axios";
import AssignTeacher from "../assignTasks/assignTeacher";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Notices(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState("");

  const toBeApproved = (e) => {
    const mail = props.mail
    const data = JSON.stringify({
      "assigned": mail
    });

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/taskToBeApproved',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        var description = response.data["data"]
        var pop = response.data["populator"]
        let listItemsApproved
        console.log(description)
        listItemsApproved = Object.keys(description["toBeApprovedTask"][0]).map((key, index) => (
          <div class="notice info"><p>{key}</p></div>
        ))
        setMessageList(listItemsApproved)
      })

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actions = [
    { icon: <AddTaskIcon />, name: 'Create Task', operation: 'task' },
    { icon: <PersonAddIcon />, name: 'Create User', operation: 'user' },
    { icon: <MeetingRoomIcon />, name: 'Schedule Meetings', operation: 'meeting' },
    { icon: <ClassIcon />, name: 'Assign Classes', operation: 'classes' },
    { icon: <AddAlertIcon />, name: 'Broadcast Message', operation: 'broadcast' }
  ];
  const openProcesses = (e, operation) => {
    e.preventDefault();
    if (operation == "task") {
      ReactDOM.render(
        <React.StrictMode>
          <CreateTask assignee={props.mail} name={props.name} />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else if (operation == "user") {
      ReactDOM.render(
        <React.StrictMode>
          <CreateUser name={props.name} />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else if (operation == "meeting") {
      ReactDOM.render(
        <React.StrictMode>
          <Meeting />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else if (operation == "classes") {
      var config = {
        method: 'GET',
        url: 'http://127.0.0.1:5000/classInfo',
        headers: {
          'Content-Type': 'application/json'
        },
      };

      axios(config)
        .then(response => {
          var classInfo = response.data["xx"]
          var subjectInfo = response.data["yy"]
          ReactDOM.render(
            <React.StrictMode>
              <AssignTeacher classInfo={classInfo} subjectInfo={subjectInfo} />
            </React.StrictMode>,
            document.getElementById('dLogin'));
        })
    }
    else if (operation === "broadcast") {
      setOpen(true);
    }
  }

  const submitBroadcastMessage = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      "message": message
    });

    console.log(data)

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/broadcast',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        console.log(response.data)
        handleClose();
      })
  }

  const saveMessage = (e) => {
    setMessage(e.target.value)
  }

  const getNotifications = (e) => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:5000/getBroadcast',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios(config)
      .then(response => {
        const data1 = response.data["data"]
        let items = []
        for (var i = 0, l = data1.length; i < l; i++) {
          console.log(data1[i]["message"])
          items.push(<div class="notice info"><p>{data1[i]["message"]}</p></div>)
        }
        setMessageList(items)
      })
  }

  return (
    <div class="col-sm noticess">
      <button class="draw meet overall" style={{ width: "58%", maxHeight: "15%", marginTop: "-20%", marginLeft: "-15%" }} onClick={getNotifications}>Circulars</button>
      <button class="draw meet overall" style={{ width: "58%", maxHeight: "15%", marginTop: "-20%", marginLeft: "50%" }} onClick={toBeApproved}>Approvals</button>
      {/* <h6 style={{width:"100%", fontSize:"12px", marginLeft:"-25%", textDecoration:"underline"}}>Notices and Announcements</h6> */}
      <div style={{ marginTop: "40%" }}>
        {messageList}
      </div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 275,
            height: 100,
            marginLeft: -5,
            position: "absolute"
          },
        }}
      >
        <Paper elevation={3} >
          <Typography sx={{ fontSize: 15, textAlign: "center" }} color="text.primary" gutterBottom>
            This Week
          </Typography>
        </Paper>

      </Box>
      <Button variant="outlined" sx={{ position: "absolute", marginTop: 15, marginLeft: 5 }}>View Calendar</Button>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 100, right: -100 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => {
                openProcesses(e, action.operation)
              }}
            />
          ))}
        </SpeedDial>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Send Broadcast Message</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="outlined-multiline-static"
              label="Message"
              type="text"
              multiline
              rows={4}
              fullWidth
              onChange={saveMessage}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitBroadcastMessage}>Send Message</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Notices;
