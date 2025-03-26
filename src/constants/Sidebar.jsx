import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import BeachAccessRoundedIcon from '@mui/icons-material/BeachAccessRounded';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Logo from "../assets/images/Logo.svg";
import { useTheme } from '../components/Theme/ThemeContext';

const Sidebar = ({ selected, setSelected, selectedChildId, setSelectedChildId, data }) => {
  const [openAccordionId, setOpenAccordionId] = useState(null);

  const handleSelect = (text) => {
    setSelected(text);
    setOpenAccordionId(openAccordionId === text ? null : text);
    sessionStorage.setItem('selectedMenu', text);
  };

  const handleChildSelect = (childId) => {
    setSelectedChildId(childId);
    sessionStorage.setItem('selectedChildMenu', childId);
  };

  const menuItems = [
    { text: 'Department', icon: <CorporateFareRoundedIcon />, link: '/department' },
    { text: 'Designation', icon: <BadgeRoundedIcon />, link: '/designation' },
    { text: 'Schedule Management', icon: <EventNoteRoundedIcon />, link: '/schedule' },
    { text: 'Holiday Management', icon: <BeachAccessRoundedIcon />, link: '/holiday' },
    { text: 'Leave Management', icon: <EventIcon />, link: '/leave' },
    { text: 'Profile Settings', icon: <SettingsIcon />, link: '/leave' },
    // { text: 'Task Management', icon: <AssignmentOutlinedIcon />, link: '#', hasChildren: true },
    // { text: 'Doctor Management', icon: <BadgeOutlinedIcon />, link: '#', hasChildren: true },
    // { text: 'Dental Chair Management', icon: <ManageAccountsOutlinedIcon />, link: '#', hasChildren: true }
  ];

  const { mode } = useTheme();

  return (
    <section className='bg-bgColorLight dark:bg-darkColor'>
      <div className='h-svh text-3xl flex flex-col gap-4 items-center px-3'>
        <div className='p-4'>
          <img src={Logo} alt="Logo" />
          {/* <img src={data?.logo || Logo} alt={data?.name || Logo} className='h-20 w-80'/> */}
        </div>
        <List className='flex flex-col justify-center gap-2 xs:gap-0 w-full'>
          {menuItems.map(({ text, icon, link, hasChildren }) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton
                  component={hasChildren ? 'div' : Link}
                  to={hasChildren ? '#' : link}
                  className='flex gap-4'
                  style={{
                    backgroundColor: selected === text ? '#008000' : 'transparent',
                    borderRadius: selected === text ? '2rem' : '',
                    color: selected === text
                      ? mode === 'dark' ? '#151513' : 'white'
                      : mode === 'dark' ? '#808080' : '#151513',
                    marginLeft: selected === text ? '0.5rem' : '',
                    marginRight: selected === text ? '0.5rem' : ''
                  }}
                  onClick={() => handleSelect(text)}
                >
                  <ListItemIcon style={{
                    minWidth: 0,
                    color: selected === text
                      ? mode === 'dark' ? '#151513' : 'white'
                      : mode === 'dark' ? '#808080' : '#151513',
                  }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={<span className='text-lg font-Albert Sans font-bold w-4'>{text}</span>} />
                  {hasChildren && (openAccordionId === text ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              {hasChildren && text === 'Task Management' && (
                <Collapse in={openAccordionId === 'Task Management'} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/addTask" onClick={() => handleChildSelect('addTask')}>
                      <ListItemText primary={<Typography sx={{ pl: 6, fontSize: '1rem', fontWeight: 'Bold', fontFamily: 'Albert Sans' }} style={{ color: selectedChildId === 'addTask' ? '#4CA884' : '#808080' }}>Add Task</Typography>} />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/manageTask" onClick={() => handleChildSelect('manageTask')}>
                      <ListItemText primary={<Typography sx={{ pl: 6, fontSize: '1rem', fontWeight: 'Bold', fontFamily: 'Albert Sans' }} style={{ color: selectedChildId === 'manageTask' ? '#4CA884' : '#808080' }}>Manage Tasks</Typography>} />
                    </ListItemButton>
                  </List>
                </Collapse>
              )}

              {hasChildren && text === 'Doctor Management' && (
                <Collapse in={openAccordionId === 'Doctor Management'} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/addDoctor" onClick={() => handleChildSelect('doctorManagement')}>
                      <ListItemText primary={<Typography sx={{ pl: 6, fontSize: '1rem', fontWeight: 'Bold', fontFamily: 'Albert Sans' }} style={{ color: selectedChildId === 'doctorManagement' ? '#4CA884' : '#808080' }}>Add Doctor</Typography>} />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/patientEntry" onClick={() => handleChildSelect('patientManagement')}>
                      <ListItemText primary={<Typography sx={{ pl: 6, fontSize: '1rem', fontWeight: 'Bold', fontFamily: 'Albert Sans' }} style={{ color: selectedChildId === 'patientManagement' ? '#4CA884' : '#808080' }}>Patient Visit Records</Typography>} />
                    </ListItemButton>
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </div>
    </section>
  );
};

export default Sidebar;
