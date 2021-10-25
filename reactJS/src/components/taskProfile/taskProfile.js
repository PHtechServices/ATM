import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import PendingIcon from '@mui/icons-material/Pending';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { TextareaAutosize } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import axios from 'axios';
import ReactDOM from 'react-dom';
import TaskViewer from '../taskView/tasksViewer';
import { useEffect } from 'react';
import { useState } from 'react';


export default function TaskProfile(props) {

  const actions = [
    { icon: <AddAlertIcon />, name: 'Reject Task', operation: 'reject' }
  ];
  const [com, setCom] = useState()

  const steps = [
    {
      label: 'Task Created'
    },
    {
      label: 'Task Started'
    },
    {
      label: 'Task Finished'
    },
    {
      label: 'Task Approved'
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState(false);
  const [comments2, setComments2] = React.useState("");
  const [clearPaper, setClearPaper] = React.useState(true);
  const [showMessage, setShowMessage] = React.useState(false);
  let selectedHigh = false
  let selectedMedium = false
  let selectedLow = false
  let selectedTeaching = false
  let selectedNonTeaching = false
  let resItems = []


  const getDescription = (e) => {
    transferrableData["task description"] = e.target.value

  }

  const getPriority = (e) => {
    transferrableData["task priority"] = e.target.value
  }

  const getDeadline = (e) => {
    transferrableData["task deadline"] = e.target.value
  }

  const getAssignedTo = (e) => {
    transferrableData["task assigned to"] = e.target.value
  }



  if (props.inputPlaceholder[6] == "high") {
    selectedHigh = true
  }
  else if (props.inputPlaceholder[6] == "medium") {
    selectedMedium = true
  }
  else if (props.inputPlaceholder[6] == "low") {
    selectedLow = true
  }

  if (props.inputPlaceholder[9] == "teachingStaff") {
    selectedTeaching = true
  }
  else if (props.inputPlaceholder[9] == "nonTeachingStaff") {
    selectedNonTeaching = true
  }
  const transferrableData = {
    "task description": props.inputPlaceholder[5],
    "task priority": props.inputPlaceholder[7],
    "task deadline": props.inputPlaceholder[3],
    "task assigned to": props.inputPlaceholder[1],
    "task assigned by": props.inputPlaceholder[2],
    "task type": props.inputPlaceholder[10],
    "task responsibility": props.inputPlaceholder[8],
    "task department": props.inputPlaceholder[4],
    "task nature": props.inputPlaceholder[5]
  }

  console.log(props.inputPlaceholder)


  const openTaskEditor = (e) => {
    var inputPlaceholder = []

    {
      const id = e.target.id
      console.log(id)
      const data = JSON.stringify({
        "objid": id
      });

      var config = {
        method: 'POST',
        url: 'http://127.0.0.1:5000/getjson',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(response => {
          const test = response.data["json"]
          const listItems = Object.keys(test).map((key, index) => (
            inputPlaceholder.push(test[key])
          ))
          console.log(inputPlaceholder)
          // ReactDOM.render(
          //   <React.StrictMode>
          //     <EditTask inputPlaceholder={inputPlaceholder} id={id}/>
          //   </React.StrictMode>,
          //   document.getElementById('dLogin'));
        })
        .catch(function (error) {
          console.log("error")
        });
    }
  }

  const openProcesses = (e, operation) => {
    e.preventDefault();
    if (operation === "broadcast") {
      setOpen(true);
    }
  }

  const getComments = (e) => {
    setComments(e.target.value)
  }

  const submitComments = (e) => {
    const data = JSON.stringify({
      "objid": props.id,
      "message": "Rejected",
      "key": "task status"
    }
    );

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/edit',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(response => {
        const data1 = JSON.stringify({
          "data": { "comments": comments },
          "objid": props.id,
          "key": "ManagerComments"
        }
        );

        var config = {
          method: 'POST',
          url: 'http://127.0.0.1:5000/updateComments',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data1
        };
        axios(config)
          .then(response => {
          })
      });


  }

  const sequence = () => {
    submitComments()
    handleClose();
    setClearPaper(false)
    setShowMessage(true)
  }



  const viewTasks = (e) => {
    const mail = props.mail
    const data = JSON.stringify({
      "assigned": mail
    });

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/taskassign',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        var description = response.data["data"]
        var pop = response.data["populator"]
        ReactDOM.render(
          <React.StrictMode>
            <TaskViewer msg={response.data["message"]} it={description} pop={pop} const mail={props.mail} cTask={props.cTask} />
          </React.StrictMode>,
          document.getElementById('dLogin'));
      })

  }
  useEffect(() => {
    const id = props.id
    const data = JSON.stringify({
        "id": id
    });

    var config = {
        method: 'POST',
        url: 'http://127.0.0.1:5000/getComments',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(response => {
            let comments10 = response.data["comments"]
            console.log(comments10)
            if (comments10.length != 0) {
                setCom(comments10.map((item) =>
                    Object.keys(item).map((key, index) => (
                    <Typography variant="body2" gutterBottom>{item[key]}</Typography>)))
                );
            }

        })
});

  const changeStatus = (e) => {
    let messages = ""
    if (props.title==="Start Task") {
      messages = "Update Task Status"
    }
    else if (props.title==="Update Task Status") {
      messages = "Task Completed Successfully"
    }
    else if (props.title==="Finish Task") {
      messages = "Pending Approval"
    }
    else if (props.title==="Approved") {
      messages = "Approved"
    }
    else  {
      messages = "Rejected"
    }
    const data = JSON.stringify({
      "objid": props.id,
      "message": messages,
      "key": "task status"
    }
    );

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/edit',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(response => {
      })
  }
  const approveTask = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      "objid": props.id,
      "message": "Approved",
      "key": "task status"
    }
    );

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/edit',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(response => {
        setClearPaper(false)
        setShowMessage(true)
      })
    console.log(data)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getComments2 = (e) => {
    setComments2(e.target.value)
}
  const storeUpdates = () => {
    const data = JSON.stringify({
      "data": { "comments": comments2 },
      "objid": props.id,
      "key": "task updates"
  }
  );

  var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/updateComments',
      headers: {
          'Content-Type': 'application/json'
      },
      data: data
  };
  axios(config)
      .then(response => {
      })
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 400,
            height: 100,
            marginLeft: -45,
            marginTop: 2.5
          },
        }}
      >
        <Paper elevation={3} style={{ position: "absolute", width: "300px", height: "300px" }}>
          <Box style={{ marginTop: "5%" }}>
            <Avatar alt="Remy Sharp" src="http://bootdey.com/img/Content/avatar/avatar6.png" style={{ position: "absolute", width: "100px", height: "100px", marginLeft: "33%" }} />
            <InputLabel style={{ position: "absolute", marginTop: "35%", marginLeft: "30%" }}>Himanshu Singh </InputLabel>
          </Box>
          <Box style={{ position: "absolute", marginTop: "50%", marginLeft: "8%", textAlign: "center", textAlign: "left" }}>
            <Typography variant="button" display="block" gutterBottom>
              Department: <InputLabel style={{ display: "inline", paddingLeft: "20px", marginTop: "2.1%", float: "right" }} >{props.info["Staff Type"]} </InputLabel>

            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Designation: <InputLabel style={{ display: "inline", paddingLeft: "20px", marginTop: "2.1%", textAlign: "left" }} >{props.info["Designation"]} </InputLabel>
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Reporting To: <InputLabel style={{ display: "inline", paddingLeft: "20px", marginTop: "2.1%", float: "right" }} >{props.info["Reporting Manager Name"]} </InputLabel>
            </Typography>
          </Box>
        </Paper>
        <Paper elevation={3} style={{ position: "absolute", width: "385px", height: "400px", marginLeft: "-12%" }}>
          {props.status === "Yet to Start" ? <Alert severity="info" style={{ marginBottom: "1%" }}>Yet To Start</Alert> : props.status === "Ongoing" ? <Alert severity="warning" icon={<PendingIcon fontSize="inherit" style={{ marginBottom: "1%" }} />}>Ongoing</Alert> :props.status === "Pending Approval"? <Alert severity="success" style={{ marginBottom: "1%" }}>Done</Alert> : <Alert severity="success" style={{ marginBottom: "1%" }}>Approved</Alert>}
          <TextField
            id="outlined-read-only-input"
            label="Task Description"
            defaultValue={transferrableData["task description"]}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: "3%", width: "95%" }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Task Priority"
            defaultValue={transferrableData["task priority"]}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: "3%", width: "95%" }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Assigned By"
            defaultValue={transferrableData["task assigned by"]}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: "3%", width: "95%" }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Task Deadline"
            defaultValue={transferrableData["task deadline"]}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: "3%", width: "95%" }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Task Nature"
            defaultValue={transferrableData["task nature"]}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: "3%", width: "95%" }}
          />
        </Paper>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 400,
            height: 100,
            marginLeft: -45
          },
        }}
      >
        <Paper elevation={3} style={{ position: "absolute", width: "300px", height: "360px", marginTop: "88%" }}>
          <Box style={{ marginLeft: "30%" }}>
            <Typography variant="h5" style={{ marginLeft: "-40%", marginBottom: "5%" }}>Task Timeline</Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
            {/* <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box> */}
            <Box style={{ marginLeft: "-40%", marginTop: "6%" }}>
              <Button variant="outlined" style={{ marginTop: "5%", marginRight: "10%" }}>Edit Task</Button>
              <Button variant="outlined" style={{ marginTop: "5%" }} onClick={changeStatus}>{props.title}</Button>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={3} style={{ position: "absolute", width: "385px", height: "450px", marginLeft: "-12%", marginTop: "115%" }}>
          <Box style={{ float: "left", marginLeft: "5%", marginTop: "2%" }}>
            {com}
          </Box>
          <TextField
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows={10}
            defaultValue="Add Comments"
            style={{ width: "90%", marginTop: "5%" }}
            onChange={getComments2}
          />
          <Button variant="outlined" style={{ marginTop: "5%" }} onClick={storeUpdates}>Add Comment</Button>
        </Paper>
        <Paper elevation={3} style={{ position: "absolute", width: "300px", height: "100px", marginTop: "190%" }}>
          <Box style={{ position: "relative", marginTop: "6%" }}>
            {clearPaper && <Button variant="outlined" style={{ marginTop: "5%", marginRight: "10%" }} color="success" onClick={approveTask}>Approve Task</Button>}
            {clearPaper && <Button variant="outlined" style={{ marginTop: "5%" }} color="error" onClick={setOpen} >Reject Task</Button>}
            {showMessage && <Typography style={{ marginTop: "5%" }}>Nothing To Do</Typography>}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Comments</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-multiline-static"
                  label="Comments"
                  type="text"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={getComments}
                />
              </DialogContent>
              <DialogActions>
                <Button color="error" onClick={sequence}>Reject</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
