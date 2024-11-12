import React, { useEffect, useState } from "react"

import { TextField, Button, Container, Stack, Alert, Typography, CircularProgress } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { usePostData } from "../../../../hooks/api/usePostData"

interface LoginData {
  email: string
  password: string
}

interface ResponseData {
  id: number
  success: boolean
}

const appURL = "http://localhost:5000/v1"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" })
  const { responseData, loading, error, postData } = usePostData<LoginData, ResponseData>({
    url: `${appURL}/users/login`,
    data: formData,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    postData()
  }

  useEffect(() => {
    if (responseData) {
      login(responseData)
      navigate("/")
    }
  }, [responseData])

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ color: "text.primary", mb: 1 }}>
        Welcome Back!
      </Typography>
      <Typography variant="h5" sx={{ color: "text.disabled", mb: 4 }}>
        Log in to continue
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Email"
          name="email"
          onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
          variant="outlined"
          type="password"
          fullWidth
        />
      </Stack>

      {error && (
        <Alert key="registerError" severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading} // Disable the button when loading
        startIcon={
          loading ? <CircularProgress size={24} color="inherit" /> : null // Show spinner when loading is true
        }
      >
        Log In
      </Button>
    </Container>
  )
}

export default Login
