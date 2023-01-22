import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { SideBarItem } from './SideBarItem'

export const SideBar = ({ drawerWidth }) => {
  const { displayName } = useSelector(state => state.auth)
  const { notes } = useSelector(state => state.journal)

  const userName = `${displayName.charAt(0).toUpperCase()}${displayName.slice(1)}`

  const months = ['January', 'February', 'March', 'April', 'May']

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {userName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map(note => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
