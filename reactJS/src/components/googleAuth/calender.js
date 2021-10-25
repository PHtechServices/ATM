import { Box } from "@mui/system";
import React from "react";

export default function CalenderComponent(){

    return(
        <Box style={{marginLeft:-350}}>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&showTitle=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0&src=cG9odWxhYnNAc3Jpc2h0aXdvcmxkc2Nob29scy5pbg&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" style={{border: 0}} width="600" height="600" frameborder="0" scrolling="no"></iframe>
        </Box>
    )
}