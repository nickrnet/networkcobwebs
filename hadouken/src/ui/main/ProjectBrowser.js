import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import FileIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
    toolbar: theme.mixins.toolbar
  });

class ProjectBrowser extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            open: true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        let { open } = this.state;

        if (open) {
            this.setState({ open: false });
        } else {
            this.setState({ open: true });
        }
    }

    render () {
        const { classes } = this.props;
        return (
            <Drawer
                variant = "permanent"
                classes = {{ paper: classes.drawerPaper, }}>
                <div className = { classes.toolbar } />
                <List
                    component = "nav"
                    subheader = { <ListSubheader component = "div">Project</ListSubheader>}
                    dense = { Boolean(true) } >
                    <ListItem button onClick = { this.handleClick }>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText inset primary = "Inventory" />
                      {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in = { this.state.open } timeout = "auto" unmountOnExit>
                      <List dense = { Boolean(true) } component = "div" disablePadding>
                        <ListItem button className = { classes.nested }>
                          <ListItemIcon>
                            <FileIcon />
                          </ListItemIcon>
                          <ListItemText inset primary = "hosts" />
                        </ListItem>
                      </List>
                    </Collapse>
                    <ListItem button onClick = { this.handleClick }>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText inset primary = "Playbooks" />
                      {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in = { this.state.open } timeout = "auto" unmountOnExit>
                    <List dense = { Boolean(true) } component = "div" disablePadding>
                        <ListItem button className = { classes.nested }>
                            <ListItemIcon>
                            <FileIcon />
                            </ListItemIcon>
                            <ListItemText inset primary = "web.yml" />
                        </ListItem>
                    </List>
                    </Collapse>
                    <ListItem button onClick = { this.handleClick }>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText inset primary = "Roles" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in = { this.state.open } timeout = "auto" unmountOnExit>
                      <List dense = { Boolean(true) } component = "div" disablePadding>
                        <ListItem button className = { classes.nested }>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText inset primary = "web" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in = { this.state.open } timeout = "auto" unmountOnExit>
                                <List dense = { Boolean(true) } component = "div" disablePadding>
                                    <ListItem button className = { classes.nested }>
                                        <ListItemIcon>
                                        <FileIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary = "main.yml" />
                                    </ListItem>
                                </List>
                            </Collapse>
                      </List>
                    </Collapse>
                </List>
            </Drawer>
        );
    }
}

ProjectBrowser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectBrowser);
