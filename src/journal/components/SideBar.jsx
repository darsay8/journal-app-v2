import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'

export const SideBar = ({ drawerWidth }) => {
  const { displayName } = useSelector(state => state.auth)

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
          {months.map(text => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={text} />
                  <ListItemText secondary={'Lorem ipsum is placeholder text.'} />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
