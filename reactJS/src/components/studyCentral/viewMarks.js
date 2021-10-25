import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

export default function MarksComponent() {
    const att = {
        "data": {
            "3c36qskj8p": "present",
            "6djlc8p9j5": "absent",
            "caha6jivwc": "absent",
            "et4vl160j0": "absent",
            "fp52yzwc6d": "present",
            "hu3gnbuj3p": "present",
            "jy9vmhkptf": "present",
            "n2gnbqht3j": "present",
            "n9gp3fr10t": "absent",
            "q7htwo1b5l": "present"
        }
    }
    const [students, setStudents] = useState()
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }))
    const [foptionval, setfoptionval] = useState("");
    const [soptionval, setsoptionval] = useState("");
    const [classn, setClassn] = useState("");
    const [value, setValue] = React.useState(new Date());
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const getAttendance = (s) => (e) =>{
        const cc = s
        console.log(s)
        const data = JSON.stringify({
            "data": {
                "cc":cc,
                "date":"10-11-2021",
                "sub": "science"
            }
          });
      
          var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/marksfilter',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
      
          axios(config)
            .then(response => {
              var rs = response.data["data"]
              console.log(response.data)
              setStudents(Object.keys(rs).map((key, index) => (
                <TableRow>
                    <TableCell align="left">{key}</TableCell>
                    <TableCell align="left">{rs[key]}</TableCell>
                </TableRow>
        
            )))
            })
    }

    let x = 
        <Paper elevation={4} style={{ width:700}}>
            <Box marginTop={1} style={{ marginBottom: "1%" }}>
                <Button variant="contained" style={{ width: 100, marginRight: "1%" }} onClick={() => setsoptionval("pre-primary")}>PrePrimary</Button>
                <Button variant="contained" style={{ width: 100, marginRight: "1%" }} onClick={() => setsoptionval("primary")}>Primary</Button>
                <Button variant="contained" style={{ width: 100 }} onClick={() => setsoptionval("secondary")}>secondary</Button>
            </Box>
        </Paper>
    let y = '';
    if (soptionval === "pre-primary") {
        y = <Box >
            <Paper elevation={3} style={{ width: 700, height: 50, justifyItems: "center", marginTop: 5 }}>
                <Box style={{ paddingTop: 7 }}>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("lkg")}>Lkg</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={getAttendance("1a")}>1A</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={getAttendance("1b")}>1B</Button>
                </Box>
            </Paper>
        </Box>;
    }
    else if (soptionval === "primary") {
        y = <Box>
            <Paper elevation={3} style={{ width: 700, height: 50, justifyItems: "center" }}>
                <Box style={{ paddingTop: 7 }}>
                    <Button variant="contained" style={{ width: 100, marginRight: 2 }} onClick={getAttendance("2a")}>2A</Button>
                    <Button variant="contained" style={{ width: 100, marginRight: 2 }} onClick={getAttendance("2b")}>2B</Button>
                    <Button variant="contained" style={{ width: 100, marginRight: 2 }} onClick={getAttendance("3a")}>3A</Button>
                    <Button variant="contained" style={{ width: 100, marginTop: 2 }} onClick={getAttendance("3b")}>3B</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={{ width: 700, height: 50, justifyItems: "center", marginTop: 5 }}>
                <Box style={{ paddingTop: 7 }}>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={getAttendance("4a")}>4A</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={getAttendance("4b")}>4B</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("5A")}>5A</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={{ width: 700, height: 50, justifyItems: "center", marginTop: 5 }}>
                <Box style={{ paddingTop: 7 }}>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("5B")}>5B</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("6A")}>6A</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("6B")}>6B</Button>
                </Box>
            </Paper>
        </Box>;
    }
    else {
        y = <Box>
            <Paper elevation={3} style={{ width: 700, height: 50, justifyItems: "center" }}>
                <Box style={{ paddingTop: 7 }}>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("7A")}>7A</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("7B")}>7B</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("8A")}>8A</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={{ width: 700, height: 50, marginTop: 10 }}>
                <Box style={{ paddingTop: 7 }}>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("8B")}>8B</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("9")}>9</Button>
                    <Button variant="contained" style={{ width: 135, marginRight: 2 }} onClick={() => setClassn("10")}>10</Button>
                </Box>
            </Paper>
        </Box>
    }
    const finalSubmit = () => {
        console.log(foptionval);
        console.log(soptionval);
        console.log(classn);
        console.log(value);
    }

    // const absent = Object.keys(att["data"]).map((key, index) => (
    //     <TableCell align="right">{att["data"][key]}</TableCell>
    // ))

    return (
        <Box style={{ marginTop: 40, alignContent: "center", marginLeft: -350 }}>
            <Grid container spacing={2}>
        
                    <Grid item xs={12} style={{marginRight:"1.5%"}}>
                    <Box style={{width:700,marginRight:"1.5%"}}>
                            {x}
                    </Box>
                    </Grid>
            <Grid item xs={12} style={{marginBottom:"2%"}}>
            {y}
                </Grid>
            <Grid item xs={12}  >
                <Grid container spacing={2}>
                   
                    <Grid item xs={7} alignContent={"center"} style={{ marginLeft: 55 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Select Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" style={{ display: "inline", width: 135, marginTop: 9 }} onClick={() => finalSubmit()}>Submit</Button>

                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "5%", width: 700, marginLeft: "-33%" }}>
                    <Paper style={{ maxHeight: 352, overflow: 'auto', width: 940 }}>
                        <TableContainer component={Paper} style={{ width: 900, position: "relative" }}>
                            <Table sx={{ minWidth: 900, width: 900 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={40} style={{ fontWeight: "bold", fontSize: 18 }}>Student Name</TableCell>
                                        <TableCell width={40} style={{ fontWeight: "bold", fontSize: 18 }}>Status</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>

        </Box >
    )
}