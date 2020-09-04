import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BlurOnSharpIcon from '@material-ui/icons/BlurOnSharp';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import Board from '../Components/Board/Board'
import Divider from '@material-ui/core/Divider'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: "#424242" 
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


export default function PermanentDrawerLeft() {
  const { forwardRef, useRef, useImperativeHandle } = React;
  const classes = useStyles();
  const childRef = useRef();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Target Acquired - Pathfinding Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Visuilize BFS', 'Visuilize A*'].map((text, index) => (
            <ListItem button key={text} onClick={() => childRef.current.animatePath(index)}>
              <ListItemIcon><BlurOnSharpIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Clear Path', 'Clear Walls', 'Clear Board', 'Generate Pixel Art'].map((text, index) => (
            <ListItem button key={text} onClick={() => {console.log(index)}}>
              <ListItemIcon><HighlightOffOutlinedIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Welcome to Target Acquired! This website was inspired by Clement. (Visit his here). 
          My goal here was to understand the basis of path finding algorithms, and to have a better understanding of how these simple programs work.
          Currently you can view BFS but I will be updating the site with more!
        </Typography>
        <Board ref={childRef}/>
      </main>
    </div>
  );
}