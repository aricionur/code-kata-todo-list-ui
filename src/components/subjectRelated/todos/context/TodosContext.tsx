import { createContext, ReactNode, useContext, useState } from "react"

const initialState = { state: {}, onChange: (newstateProps: object) => {} }

const TodosContext = createContext(initialState)

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<object>({})

  const onChange = (newstateProps: object) => {
    setState({ ...state, ...newstateProps })
  }

  return <TodosContext.Provider value={{ state, onChange }}>{children}</TodosContext.Provider>
}

export const useTodos = () => {
  const { state, onChange } = useContext(TodosContext)

  return { state, onChange }
}
