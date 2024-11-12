import { Alert, Button, CircularProgress, Container, Stack, TextField, Typography } from "@mui/material"

import { FC, useState, ChangeEvent, useEffect } from "react"
import { usePostData } from "../../../../hooks/api/usePostData"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface RegisterData {
  username: string
  email: string
  password: string
}

interface RegisterResponseData {
  username: string
  email: string
  password: string
  id: number
  token: string
}

const initialRegisterData: RegisterData = {
  username: "",
  email: "",
  password: "",
}

// const appURL = process.env.APP_URL
const appURL = "http://localhost:5000/v1"

const Register: FC = () => {
  const { login } = useAuth()

  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterData>(initialRegisterData)
  const { error, postData, responseData, loading } = usePostData<RegisterData, RegisterResponseData>({
    url: `${appURL}/users/register`,
    data: formData,
  })

  const onFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof RegisterData) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
        Welcome!
      </Typography>
      <Typography variant="h5" sx={{ color: "text.disabled", mb: 4 }}>
        Sign up to start using Simple do today.
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Username"
          name="username"
          onChange={(e) => onFormChange(e, "username")}
          variant="outlined"
          fullWidth
        />
        <TextField label="Email" name="email" onChange={(e) => onFormChange(e, "email")} variant="outlined" fullWidth />
        <TextField
          label="Password"
          name="password"
          onChange={(e) => onFormChange(e, "password")}
          variant="outlined"
          type="password"
          fullWidth
        />

        {error && (
          <Alert key="registerError" severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={onSubmit}
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
        >
          Register
        </Button>
      </Stack>
    </Container>
  )
}

export default Register
