import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';

import ProjectBrowser from './ProjectBrowser.js';

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
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});

class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            openDocuments: {
                currentlyDisplayed: 0
            }
        };
    }

    changeEditor = (event, value) => {
        let { openDocuments } = this.state;
        openDocuments.currentlyDisplayed = value;
        this.setState({ openDocuments });
    };

    render () {
        const { classes } = this.props;
        let { openDocuments } = this.state;

        return (
            <div className = { classes.root }>
                <AppBar position = "absolute" className = { classes.appBar }>
                    <Toolbar variant = "dense">
                      <IconButton className = { classes.menuButton } color = "inherit" aria-label = "Run...">
                        <PlayArrow />
                      </IconButton>
                    </Toolbar>
                </AppBar>
                <ProjectBrowser />
                <main className = { classes.content }>
                    <div className = { classes.toolbar } />
                    <Tabs
                        value = { openDocuments.currentlyDisplayed }
                        onChange = { this.changeEditor }
                        indicatorColor = "primary"
                        textColor = "primary"
                        scrollable>
                        <Tab label = "inventory / hosts" />
                        <Tab label = "playbooks / web.yml" />
                        <Tab label = "roles / web / main.yml" />
                    </Tabs>
                    { openDocuments.currentlyDisplayed === 0 && <Typography noWrap>{ 'This will be a code editor for inventory/hosts.' }</Typography> }
                    { openDocuments.currentlyDisplayed === 1 && <Typography noWrap>{ 'This will be a code editor for playbooks/web.yml' }</Typography> }
                    { openDocuments.currentlyDisplayed === 2 && <Typography noWrap>{ 'This will be a code editor for roles/web/main.yml' }</Typography> }
                </main>
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
