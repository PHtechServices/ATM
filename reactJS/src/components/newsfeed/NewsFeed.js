import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import NewsResultcomponent from "./NewsResults";
import ReactDOM from 'react-dom';
import Grid from '@mui/material/Grid';
import axios from "axios";
export default function NewsComponent() {
    const [searchval, setSearchVal] = useState("");
    const changeVal = (e) => {
        setSearchVal(e.target.value)
    }
    const key = "74e56abca00e44e29b598074efad3c8c";
    const searchSubmit = () => {
        var data = ''
        var config = {
            method: 'get',
            url: 'https://newsapi.org/v2/everything?q=' + searchval + '&sortBy=publishedAt&apiKey=74e56abca00e44e29b598074efad3c8c',
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                const json = response.data
                ReactDOM.render(
                    <React.StrictMode>
                        <NewsResultcomponent articles={json["articles"]} />
                    </React.StrictMode>,
                    document.getElementById('dLogin')
                );
            })

    }

    return (
        <Box style={{ marginTop: "5%" }}>
            <TextField id="standard-basic" label="Seach for News Feeds" variant="standard" onChange={changeVal} />
            <Button variant="contained" style={{ width: 135, marginRight: 2, marginTop: 12 }} onClick={() => searchSubmit()}>Search</Button>
        </Box>
    )
}