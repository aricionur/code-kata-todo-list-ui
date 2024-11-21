import { Box } from "@mui/material"
import { useAuth } from "../../auth/context/AuthContext"
import { TodosProvider } from "../context/TodosContext"
import { Header } from "./Header"
import { CreateTodo } from "./CreateTodo"
import { useEffect } from "react"

const Todos = () => {
  const { state } = useAuth()
  const { user } = state

  useEffect(() => {
    console.log("user:", user)
  }, [user])

  return (
    <>
      {user ? (
        <TodosProvider>
          <Box sx={{ height: "100vh" }}>
            <Box sx={{ width: 500, height: 500, boxShadow: 3, margin: "auto" }}>
              <Header />
              <CreateTodo />
              {/* <TodoList />
              <Footer /> */}
            </Box>
          </Box>
        </TodosProvider>
      ) : (
        "Please login to start using SimpleDo"
      )}
    </>
  )
}

export default Todos
