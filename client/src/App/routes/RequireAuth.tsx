import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "../../lib/hooks/account/useUser";
import { Typography } from "@mui/material";

export default function RequireAuth(){
    const {currentUser,isLoading}=useUser();
    const location=useLocation();
    if(isLoading)  return <Typography textAlign={'center'} color="text.secondary">Loading...</Typography>
    if (!currentUser)  return <Navigate to={'/login'} state={{from:location}}/>
    return (
        <Outlet/>
    )
}