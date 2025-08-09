import Grid from "@mui/material/Grid";
import RegisterForm from "./form/RegisterForm";
import { Box, Divider, Paper, Typography } from "@mui/material";

export default function Register(){
    return (
       <Paper elevation={3} sx={{flexGrow:1,borderRadius:2}}>
         <Grid container  sx={{
            minHeight:'500px',
         }}>
            <Grid size={6}  sx={{
                backgroundImage:'url(/images/categoryImages/culture.jpg)',
                objectFit:'cover',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                borderTopLeftRadius:8,
                borderBottomLeftRadius:8,
            }}></Grid>
            <Grid size={6} px={2} py={5}>
             <Box
                display="flex"
                flexDirection="column"
                gap={1}
                alignItems="center"
                justifyContent={'center'}
            >
                <Typography variant="h4" color="text.secondary" fontWeight={600}>
                     Create your account 
                </Typography>
                <Divider color="secondary" />
                <RegisterForm />
            </Box>
            </Grid>
        </Grid>
       </Paper>
    )
}