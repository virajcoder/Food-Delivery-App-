import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';                                      
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import Person from '@mui/icons-material/Person';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Link } from 'react-router-dom';

const Sidebar=() =>{
  const [state, setState] = React.useState({
   
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                 <Person fontSize="xl8" />
              </ListItemIcon>
                 <ListItemText primary="Acounts"/>
            </ListItemButton>
          </ListItem>
        
      </List>

      <Divider />


      <List>
        <ListItem >
            <ListItemButton component={Link} to="/login">
              <ListItemIcon>
                 <LoginTwoToneIcon /> 
              </ListItemIcon>
                 <ListItemText primary="Login" />
                 {/* <Button variant="contained" color="primary">Login</Button> */}
            </ListItemButton>
          </ListItem>


        <ListItem >
            <ListItemButton component={Link} to="/signup">
              <ListItemIcon>
                 <LockOpenTwoToneIcon /> 
              </ListItemIcon>
                 <ListItemText primary="Signup" />
            </ListItemButton>
        </ListItem>


        <ListItem>
        <ListItemButton>
              <ListItemIcon>
                 <PersonTwoToneIcon /> 
              </ListItemIcon>
                 <ListItemText primary="Profile" />
                 </ListItemButton>
        </ListItem>


        <ListItem>
        <ListItemButton component={Link} to="/AddressForm">
              <ListItemIcon>
                 <HomeTwoToneIcon /> 
              </ListItemIcon>
                 <ListItemText primary="Adress" />
                 </ListItemButton>
        </ListItem>


        <ListItem>
          <ListItemButton>
            <ListItemIcon>
                <GradingTwoToneIcon /> 
            </ListItemIcon>
                <ListItemText primary="My Order" />
          </ListItemButton> 
        </ListItem>


      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}> <Person fontSize="xl4" /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Sidebar;