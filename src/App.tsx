import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import { AuthProvider } from "./components/subjectRelated/auth/context/AuthContext"
import Todos from "./components/subjectRelated/todos/components/Todos"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/todos" />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  )
}

export default App
