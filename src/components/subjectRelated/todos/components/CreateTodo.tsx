import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

import { usePostData } from "../../../../hooks/api/usePostData"

interface TodoData {
  text: string
}

interface ResponseData {
  text: string
}

const appURL = "http://localhost:5000/v1"

export const CreateTodo = () => {
  const [text, setText] = useState("")

  const { postData, responseData } = usePostData<TodoData, ResponseData>({
    url: `${appURL}/notes`,
    data: { text },
  })

  console.log("responseData", responseData)

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(event.target.value)

  const keyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postData()
      setText("")
    }
  }

  return (
    <Box sx={{ marginLeft: 2 }}>
      <TextField
        id="todoCreate"
        label="Add a new todo"
        value={text || ""}
        variant="standard"
        onKeyDown={keyPress}
        onChange={onChange}
      />
    </Box>
  )
}
