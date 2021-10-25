import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TimeTable() {

    const data = {
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
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell align="right">10-11</TableCell>
                        <TableCell align="right">11-12</TableCell>
                        <TableCell align="right">12-1</TableCell>
                        <TableCell align="right">Lunch</TableCell>
                        <TableCell align="right">1-2</TableCell>
                        <TableCell align="right">2-3</TableCell>
                        <TableCell align="right">3-4</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Attendance</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    {/* <TableRow>
                        <TableCell>Tuesday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Wednessday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Thursday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Friday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Saturday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

