import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import AttendanceComponent from './viewSC';
import MarksComponent from './viewMarks';
import ClassComponent from './viewClass';

export default function StudyCentralHome() {

    const [view, setView] = React.useState("")

   const submitAttendance = () => {
        setView("attendance")
   }
   const submitMarks = () => {
    setView("marks")
   }
   const submitClass = () => {
    setView("class")
}
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group" style={{marginLeft:-320}}>
        <Button onClick={submitAttendance}>Attendance Report</Button>
        <Button onClick={submitMarks}>Marks Report</Button>
        <Button onClick={submitClass}>Class Report</Button>
      </ButtonGroup>
      {view === "attendance" ? <AttendanceComponent/> : view === "marks" ? <MarksComponent /> : view === "class" ? <ClassComponent /> : null}
    </Box>
  );
}
