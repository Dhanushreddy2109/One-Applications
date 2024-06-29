import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./home.scss";
import { useAuth } from "../../api/routeauth/RouteAuth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ConsultantModal from "./ConsultantModal";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./Profile";
import axiosInstance from "../../api/api/axiosInstance";
import { ThreeCircles } from "react-loader-spinner";
import logo from "../../assests/OneApplicationLogo.png";

const pages = [];

function Home() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axiosInstance.interceptors.request.use(
      function (config) {
        setLoading(true);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      function (response) {
        setLoading(false);
        return response;
      },
      function (error) {
        setLoading(false);
        console.log("intercept", error);
        return Promise.reject(error);
      }
    );
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loginModal, setLoginModal] = React.useState(false);
  const [signUpModal, setSignUpModal] = React.useState(false);
  const { logout } = useAuth();
  const user = localStorage.getItem("user");
  const userDetails = user ? JSON.parse(user) : null;
  const [profileModal, setProfileModal] = React.useState(false);

  const navigate = useNavigate();

  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(false);
  };

  const handleSignUp = () => {
    setLoginModal(false);
    setSignUpModal(true);
  };

  const handleSignIn = () => {
    setLoginModal(true);
    setSignUpModal(false);
  };

  const toggleSignUp = () => {
    setSignUpModal(false);
  };

  const toggleLogin = () => {
    setLoginModal(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { isAuthenticated } = useAuth();

  return (
    <>
      {loading && (
        <div class="loader-wrapper">
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="#7a6ad8"
          />
        </div>
      )}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo} alt="logo" style={{ width: "70px" }} />
              One Application
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                alignItems: "center",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                textWrap: "wrap",
              }}
            >
              <img src={logo} alt="logo" style={{ width: "70px" }} />
              One Application
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="consultant-wrapeer"
                    textAlign="center"
                    onClick={() => {
                      if (userDetails?.role === "Admin")
                        navigate("/admindashboard");
                      else navigate("/interview");
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    className="consultant-wrapeer"
                    textAlign="center"
                    onClick={() => {
                      if (userDetails?.role === "Admin") navigate("/jobslist");
                      else navigate("/jobs");
                    }}
                  >
                    Jobs
                  </button>
                  {userDetails?.role === "User" && (
                    <Link
                      to="consultant"
                      className="consultant-wrapeer d-flex align-items-center"
                    >
                      Consultant
                    </Link>
                  )}

                  {userDetails?.role === "Admin" && (
                    <button
                      type="button"
                      className="consultant-wrapeer"
                      textAlign="center"
                      onClick={() => {
                        navigate("/consultants");
                      }}
                    >
                      Consultants
                    </button>
                  )}

                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Temy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        setProfileModal(true);
                        handleCloseUserMenu();
                      }}
                    >
                      <AccountCircleOutlinedIcon />
                      {"  "}
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        logout();
                      }}
                    >
                      <LogoutOutlinedIcon />
                      {"  "}
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <button
                  type="button"
                  className="consultant-wrapeer"
                  textAlign="center"
                  onClick={() => {
                    setLoginModal(true);
                  }}
                >
                  SignIn / SignUp
                </button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {modal && <ConsultantModal isOpen={modal} toggle={toggle} />}
      {profileModal && (
        <ProfileModal
          isOpen={profileModal}
          toggle={() => {
            setProfileModal(false);
          }}
        />
      )}
      {loginModal && (
        <LoginModal
          isOpen={loginModal}
          toggle={toggleLogin}
          signUp={handleSignUp}
        />
      )}
      {signUpModal && (
        <SignUpModal
          isOpen={signUpModal}
          toggle={toggleSignUp}
          signIn={handleSignIn}
        />
      )}
    </>
  );
}
export default Home;
