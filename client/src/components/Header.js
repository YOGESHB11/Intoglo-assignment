import React , { useState } from 'react'
import {AppBar, Button, Toolbar, Typography , Box ,Tab , Tabs} from '@mui/material'
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from './../store/index';

 const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [value, setValue] = useState();
  return (
  <AppBar position = "sticky" sx={{
    background:
      "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
  }}>
    <Toolbar>
        <Typography variant = "h4">
            DocumentViewer
        </Typography>
        { isLoggedIn && <Box display = "flex" marginLeft='auto' marginRight='auto'>
            <Tabs textColor = 'inherit' value = {value} onChange={(e,val)=>setValue(val)}>
                <Tab LinkComponent = {Link} to="/docs" label = "All Docs"/>
                <Tab LinkComponent = {Link} to="/myDocs"label = "My Docs"/>
            </Tabs>
        </Box>}
        <Box display = "flex" marginLeft = "auto">
           {!isLoggedIn && <><Button LinkComponent = {Link} to="/auth" variant = 'contained' sx = {{margin : 1}} color = "warning">Login</Button>
            <Button LinkComponent = {Link} to="/auth" variant = 'contained' sx = {{margin : 1}} color = "warning">Signup</Button> </>}
            {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout())} LinkComponent = {Link} to="/auth" variant = 'contained' sx = {{margin : 1}} color = "warning">LogOut</Button>}
        </Box>
    </Toolbar>
  </AppBar>)
}

export default Header