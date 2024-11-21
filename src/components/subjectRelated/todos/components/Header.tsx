import { Box, Typography } from "@mui/material"
import checkIcon from "../../../../assets/group@2x.png"

export const Header = () => {
  return (
    <Box>
      <Box width="100%" m={2}>
        <img src={checkIcon} width="40px" height="32px" object-fit="contain" alt="" />
      </Box>

      <Box width="100%" m={2}>
        <Typography variant="h4">Todo List</Typography>
      </Box>
    </Box>
  )
}
