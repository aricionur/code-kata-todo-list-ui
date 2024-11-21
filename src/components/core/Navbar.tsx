import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../subjectRelated/auth/context/AuthContext"

const Navbar = () => {
  const navigate = useNavigate()
  const { state, logout } = useAuth()
  const { user } = state

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Box sx={{}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              My Todos
            </Link>
          </Typography>

          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <Button
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Login
                </Link>

                <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
