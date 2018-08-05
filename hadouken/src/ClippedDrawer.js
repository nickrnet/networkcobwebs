import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import FileIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  tabbar: {
    backgroundColor: theme.palette.primary,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ClippedDrawer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fileMenu: null,
            editMenu: null,
            runMenu: null,
            helpMenu: null,
            openDocuments: {
                currentlyDisplayed: 0
            }
        };
    }

    openFileMenu = event => {
        this.setState({ fileMenu: event.currentTarget });
    };

    closeFileMenu = () => {
        this.setState({ fileMenu: null });
    };

    openEditMenu = event => {
        this.setState({ editMenu: event.currentTarget });
    };

    closeEditMenu = () => {
        this.setState({ editMenu: null });
    };

    openRunMenu = event => {
        this.setState({ runMenu: event.currentTarget });
    };

    closeRunMenu = () => {
        this.setState({ runMenu: null });
    };

    openHelpMenu = event => {
        this.setState({ helpMenu: event.currentTarget });
    };

    closeHelpMenu = () => {
        this.setState({ helpMenu: null });
    };

    changeEditor = (event, value) => {
        let { openDocuments } = this.state;
        openDocuments.currentlyDisplayed = value;
        this.setState({ openDocuments });
    };

    render () {
        const { classes } = this.props;
        const { fileMenu, editMenu, runMenu, helpMenu } = this.state;
        let { openDocuments } = this.state;

        return (
            <div className = { classes.root }>
                <Menu
                    id = "file-menu"
                    anchorEl = { fileMenu }
                    open = { Boolean(fileMenu) }
                    onClose = { this.closeFileMenu }>
                    <MenuItem onClick = { this.closeFileMenu }>New</MenuItem>
                    <MenuItem onClick = { this.closeFileMenu }>Open</MenuItem>
                    <MenuItem onClick = { this.closeFileMenu }>Quit</MenuItem>
                </Menu>
                <Menu
                    id = "edit-menu"
                    anchorEl = { editMenu }
                    open = { Boolean(editMenu) }
                    onClose = { this.closeEditMenu }>
                    <MenuItem onClick = { this.closeEditMenu }>Undo</MenuItem>
                    <MenuItem onClick = { this.closeEditMenu }>Redo</MenuItem>
                    <MenuItem onClick = { this.closeEditMenu }>Cut</MenuItem>
                    <MenuItem onClick = { this.closeEditMenu }>Copy</MenuItem>
                    <MenuItem onClick = { this.closeEditMenu }>Paste</MenuItem>
                </Menu>
                <Menu
                    id = "run-menu"
                    anchorEl = { runMenu }
                    open = { Boolean(runMenu) }
                    onClose = { this.closeRunMenu }>
                    <MenuItem onClick = { this.closeRunMenu }>Run</MenuItem>
                </Menu>
                <Menu
                    id = "help-menu"
                    anchorEl = { helpMenu }
                    open = { Boolean(helpMenu) }
                    onClose = { this.closeHelpMenu }>
                    <MenuItem onClick = { this.closeHelpMenu }>Search</MenuItem>
                </Menu>
                <AppBar position = "absolute" className = { classes.appBar }>
                    <Toolbar variant="dense">
                        <Button color = "inherit" aria-label = "File"
                            aria-owns = { fileMenu ? 'file-menu' : null }
                            aria-haspopup = "true"
                            onClick = { this.openFileMenu }>
                            File
                        </Button>
                        <Button color = "inherit" aria-label = "Edit"
                            aria-owns = { editMenu ? 'edit-menu' : null }
                            aria-haspopup = "true"
                            onClick = { this.openEditMenu }>
                            Edit
                        </Button>
                        <Button color = "inherit" aria-label = "Run"
                            aria-owns = { runMenu ? 'run-menu' : null }
                            aria-haspopup = "true"
                            onClick = { this.openRunMenu }>
                            Run
                        </Button>
                        <Button color = "inherit" aria-label = "Help"
                            aria-owns = { helpMenu ? 'help-menu' : null }
                            aria-haspopup = "true"
                            onClick = { this.openHelpMenu }>
                            Help
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant = "permanent"
                    classes = {{ paper: classes.drawerPaper, }}>
                    <div className = { classes.toolbar } />
                    <List
                        component = "nav"
                        subheader = { <ListSubheader component = "div">Project</ListSubheader>}
                        dense = { Boolean(true) } >
                        <ListItem button onClick={this.handleClick}>
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Inventory" />
                          {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <FileIcon />
                              </ListItemIcon>
                              <ListItemText inset primary="hosts" />
                            </ListItem>
                          </List>
                        </Collapse>
                        <ListItem button onClick={this.handleClick}>
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Playbooks" />
                          {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <FileIcon />
                              </ListItemIcon>
                              <ListItemText inset primary="hosts" />
                            </ListItem>
                          </List>
                        </Collapse>
                        <ListItem button onClick={this.handleClick}>
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Roles" />
                          {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <FileIcon />
                              </ListItemIcon>
                              <ListItemText inset primary="hosts" />
                            </ListItem>
                          </List>
                        </Collapse>
                    </List>
                </Drawer>
                <main className = { classes.content }>
                    <div className = { classes.toolbar } />
                    <Tabs
                        value = { openDocuments.currentlyDisplayed }
                        onChange = { this.changeEditor }
                        indicatorColor = "primary"
                        textColor = "primary"
                        scrollable
                        scrollButtons = "auto"
                        className = { classes.tabbar }>
                        <Tab label = "inventory/testing/hosts" />
                        <Tab label = "inventory/testing/group_vars/all.yml" />
                        <Tab label = "playbooks/testing/deploy.yml" />
                        <Tab label = "roles/db/main.yml" />
                        <Tab label = "roles/db/upgrade.yml" />
                        <Tab label = "roles/web/main.yml" />
                        <Tab label = "roles/web/vars/main.yml" />
                    </Tabs>
                    { openDocuments.currentlyDisplayed === 0 && <Typography noWrap>{ 'This will be a code editor for inventory/testing/hosts.' }</Typography> }
                    { openDocuments.currentlyDisplayed === 1 && <Typography noWrap>{ 'This will be a code editor for inventory/testing/group_vars/all.yml' }</Typography> }
                    { openDocuments.currentlyDisplayed === 2 && <Typography noWrap>{ 'This will be a code editor for playbooks/testing/deploy.yml' }</Typography> }
                    { openDocuments.currentlyDisplayed === 3 && <Typography noWrap>{ 'This will be a code editor for roles/db/main.yml' }</Typography> }
                    { openDocuments.currentlyDisplayed === 4 && <Typography noWrap>{ 'This will be a code editor for roles/db/upgrade.yml' }</Typography> }
                    { openDocuments.currentlyDisplayed === 5 && <Typography noWrap>{ 'This will be a code editor for roles/web/main.yml' }</Typography> }
                    { openDocuments.currentlyDisplayed === 6 && <Typography noWrap>{ 'This will be a code editor for roles/web/vars/main.yml' }</Typography> }
                </main>
            </div>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
