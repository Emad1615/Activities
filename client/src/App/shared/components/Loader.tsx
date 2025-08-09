import { Box, CircularProgress } from "@mui/material";

export default function Loader(){
    return (
        <Box sx={{
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#845ec2'
        }}>
            <CircularProgress  size={'3rem'}  color="inherit"/>

        </Box>
    )
}