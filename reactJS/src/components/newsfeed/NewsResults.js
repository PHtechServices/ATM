import { Box } from "@mui/system";
import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";


export default function NewsResultcomponent(props){
    console.log(props.articles[1]["title"])
    const searchResult = Object.keys(props.articles).map((key, index) => (
        <div>
        <img src={props.articles[index]["urlToImage"]}/>
{        props.articles[index]["title"] === "Javascript - Uncaught ReferenceError: $ is not defined" ? null :<Paper elevation={3} style={{marginBottom:"3%",marginTop:"1%"}}><a href={props.articles[index]["url"]} target="_blank"><Typography variant="h6" gutterBottom component="div">{props.articles[index]["title"]}</Typography></a></Paper>
}        </div>
     
    
    
        
    ))
    console.log(searchResult)
    return(
        <Box style={{marginLeft:"-90%"}}>
            <Grid container spacing={2}>
                <Paper style={{maxHeight: 600, overflow: 'auto',width:700}}>
                {searchResult}
                </Paper>
            </Grid>
        </Box>
    )
}