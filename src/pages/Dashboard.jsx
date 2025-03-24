import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AccountCircle, ExitToApp, Group, Logout, WorkspacePremium } from '@mui/icons-material';
import Admin from './Admin';
import User from './User';
import UserManagement from './UserManagement';
import { Avatar, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery } from '@mui/material';
import "./Dashboard.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/login/Action';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    segment: "users",
    title: 'Users',
    icon: <Group />,
    roles: ["ADMIN"]
  },
  // {
  //   segment: 'reports',
  //   title: 'Reports',
  //   icon: <BarChartIcon />,
  // },
];

function getColorFromEmail(email) {
  const colors = ["red", "blue", "green", "purple", "orange", "pink", "gray"];
  let hash = 0;
  for (let i = 0; i < email?.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const ProfileMenu = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.login?.user);
  // anchorElement stores the reference of HTML element under which Menu should be displayed
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/login");
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ backgroundColor: getColorFromEmail(user?.email) }}>
          {user?.firstName.toUpperCase().charAt(0)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          mt: 1, // Adds margin at the top for better spacing
          '& .MuiPaper-root': {
            padding: '0.5rem', // Adds padding inside the menu
            borderRadius: '10px', // Rounds the corners
            minWidth: '150px', // Ensures a minimum width
            boxShadow: 2
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ borderRadius: '5px', gap: 1 }}>
          <Avatar sx={{ height: 23, width: 23, color: "ButtonFace", marginRight: "0.5rem" }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ borderRadius: '5px', gap: 1}}>
          <Logout sx={{ height: 23, width: 23, marginRight: "0.5rem" }} />
          Logout
        </MenuItem>
      </Menu>

    </div>
  )

}

const SidebarFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.login?.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <Box sx={{ position: "absolute", bottom: 0, width: "100%", pb: 1 }}>
      <Divider />
      <List>
        {/* Profile Option */}
        <ListItemButton sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Avatar sx={{ height: 24, width: 24, backgroundColor: getColorFromEmail(user?.email) }}>
              <p className='text-sm'>{user?.firstName.toUpperCase().charAt(0)}</p>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        {/* Logout Option */}
        <ListItemButton onClick={handleLogout}
         sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

// Components are passes as Arrow functions to acheive lazy loading
const PageComponents = {
  "/dashboard": localStorage.getItem("role") === "ADMIN" ? () => <Admin /> : () => <User />,
  "/users": () => <UserManagement />
}

function DemoPageContent({ pathname }) {
  const PageComponent = PageComponents[pathname] || (() => <div>404 Page Not Found</div>);
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <PageComponent />
    </Box>
  );
}

// Validation for the props passed to DemoPageContent Component
DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const { window } = props;
  const [pathname, setPathname] = useState('/dashboard');
  const role = localStorage.getItem("role") || "USER";
  const filteredNavigation = NAVIGATION.filter((tab) => tab.roles.includes(role));
  const isMobileScreen = useMediaQuery("(max-width:400px)");
  const isLgMobileScreen = useMediaQuery("(max-width:550px)");
  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // // Remove this const when copying and pasting into your project.
  // const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={filteredNavigation}
      router={router}
      theme={{}}
      // window={demoWindow}
      branding={{
        // Certificate Icon
        logo: <WorkspacePremium fontSize={isMobileScreen ? "" : 'large'} color='warning'
          sx={{ display: isMobileScreen ? "none" : "" }}
        />,
        title: (
          <Typography
            variant={isMobileScreen ? "subtitle1" : "h6"}
            sx={{ fontSize: isMobileScreen ? "1.15rem" : "1.25rem", fontWeight: "bold" }}
          >
            Certification Management
          </Typography>
        ),
        homeUrl: "/dashboard"
      }}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: isLgMobileScreen ? () => null : () => <ProfileMenu />,
          sidebarFooter: isLgMobileScreen ? () => <SidebarFooter /> : () => null
        }}
        defaultSidebarCollapsed>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

// Validation for the props recived by Dashboard component
Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
