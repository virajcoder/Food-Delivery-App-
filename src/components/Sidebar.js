import  {useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';                                      
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person from '@mui/icons-material/Person';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
const Sidebar=() =>{
  const [state, setState] = useState({
   
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const navigate=useNavigate()
  const token=localStorage.getItem('token');
  const user=JSON.parse(token)

  const logoutHandler=()=>{
    localStorage.clear()
    toast('logout successfully')
    window.location.reload()
    navigate('/login')
      
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
          <ListItem sx={{fontSize:'2.5rem'}}>
            <ListItemButton>
              <ListItemIcon>
                 <Person fontSize="xl8" />
              </ListItemIcon >
                 <ListItemText primary={user?.username} />
            </ListItemButton>
          </ListItem>
        
      </List>

      <Divider />


      <List>
        <ListItem >
           { !token?<ListItemButton component={Link} to="/login">
              <ListItemIcon>
                 <LoginTwoToneIcon /> 
              </ListItemIcon>
                 <ListItemText primary="Login" /> 
                 
            </ListItemButton>: 
            <ListItemButton component={Link} to="/login" onClick={logoutHandler}>
              <ListItemIcon>
                 <LoginTwoToneIcon /> 
              </ListItemIcon>
                 <ListItemText primary="logout" /> 
                
            </ListItemButton>      }  
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
          <ListItemButton component={Link} to="/OrderdPage">
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
        <div key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} fontSize="4xl"> <Person  /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;