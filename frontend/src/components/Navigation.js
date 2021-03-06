import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings"; 
import { useNavigate, useLocation } from "react-router-dom";
import { connect,useSelector } from "react-redux";
import authActions from "../redux/actions/authActions";
import logo from "../assets/joystick.png";
import Swal from "sweetalert2";

const drawerWidth = 240;



const list = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "About us", icon: <SportsEsportsIcon />, path: "/about" },
    { name: "Games", icon: <MenuBookIcon />, path: "/games" },
    { name: "Cart", icon: <LocalGroceryStoreIcon />, path: "/cart" },
];
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

function Navigation(props) {
    localStorage.getItem("token") && !props.user && props.signToken();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    let location = useLocation();
    const ruta = props.user.role === "admin" ? '/admin' : '/profile'
    const totalAmount = useSelector(store => store.cartReducer.totalAmount)
    console.log(totalAmount);

    function logOut() {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            background: "#343744",
            iconColor: "#11edd3",
            color: "#fff",
            confirmButtonText: "Accept",
            denyButtonText: `Don't accept`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                props.signOut();
                navigate("/");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Closed account',
                    background: '#343744',
                    iconColor: '#11edd3',
                    color: '#fff',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else if (result.isDenied) {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Closed account',
                    background: '#343744',
                    iconColor: '#af3181',
                    color: '#fff',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <img src={logo} className="icon-logo" />
                    </IconButton>
                    <Divider />
                    <div className="cont-icons">
                        <List className="nav-icons">
                            {list.map((text, index) => (
                                <ListItem
                                    button
                                    onClick={() => {
                                        navigate(text.path);
                                    }}
                                    key={index}
                                    className={
                                        location.pathname === text.path &&
                                        "active"
                                    }
                                >
                                    <ListItemIcon className="icon">
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.name} />
                                </ListItem>
                            ))}
                        </List>
                        <List className="nav-icons">
                            {!props.user ? (
                                <>
                                    <ListItem
                                        button
                                        onClick={() => {
                                            navigate("/signIn");
                                        }}
                                        className={
                                            location.pathname === "/signIn" &&
                                            "active"
                                        }
                                    >
                                        <ListItemIcon className="icon">
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign In" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        onClick={() => {
                                            navigate("/signUp");
                                        }}
                                        className={
                                            location.pathname === "/signUp" &&
                                            "active"
                                        }
                                    >
                                        <ListItemIcon className="icon">
                                            <PersonAddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign Up" />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem
                                        button
                                        onClick={() => {
                                            navigate("/support");
                                        }}
                                        className={
                                            location.pathname === "/support" &&
                                            "active"
                                        }
                                    >
                                        <ListItemIcon className="icon">
                                            <SupportAgentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Support" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        onClick={() => {
                                            logOut();
                                        }}
                                    >
                                        <ListItemIcon className="icon">
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign Out" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        onClick={() => {
                                            navigate(ruta);
                                        }}
                                        className={
                                            location.pathname === ruta &&
                                            "active"
                                        }
                                    >
                                        <ListItemIcon>
                                            <img
                                                src={props.user.image}
                                                className="nav-img"
                                                alt="user_image"
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className="icon-image"
                                            primary="Profile"
                                        />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </div>
                </Drawer>
            </Box>
        </div>
    );
}

const mapDispatchToProps = {
    signToken: authActions.signInWithToken,
    signOut: authActions.logOut,
};
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
