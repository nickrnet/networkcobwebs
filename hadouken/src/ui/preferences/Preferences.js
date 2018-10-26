import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const Component = React.Component;

const drawerWidth = 200;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minWidth: 0
    },
        menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

class Preferences extends Component {
    constructor (props) {
        super(props);
        this.createPreferences = this.createPreferences.bind(this);
        this.savePreferences = this.savePreferences.bind(this);
        if (props.electron) {}
        this.state = {
            browser: '',
            electron: {}
        }
    }
    createPreferences () {
        let { electron, preferences } = this.props;
        if (electron) {
            const fs = electron.remote.require('fs-extra');
            let app = this.props.electron.remote.app;
            let prefPath = app.getPath('appData');
            let defaultPython = '/Library/Frameworks/Python.framework/Versions/2.7/bin/python';
            console.log(prefPath);
        }
    }
    savePreferences (event) {
        let { electron, preferences } = this.props;
        if (electron) {
            const fs = electron.remote.require('fs-extra');
            let app = this.props.electron.remote.app;
            let ipcMain = this.props.electron.remote.ipcMain;
            let prefPath = app.getPath('appData');
            console.log(prefPath);
            ipcMain.emit('closePreferencesDialog');
        } else {
            // in a browser, not electron
            // use browser session storage
            preferences.closePreferencesDialog();
        }
    }
    render () {
        const { classes } = this.props;
        const { preferences } = this.props;
        return (
            <Dialog
                fullScreen
                open = { preferences.preferencesDialogOpen }>
                <DialogContent>
                    <Drawer
                        variant = "permanent"
                        classes = {{ paper: classes.drawerPaper, }}>
                        <List
                            component = "nav"
                            dense = { Boolean(true) } >
                            <ListItem button onClick = { this.handleClick }>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText inset primary = "Python" />
                                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                        </List>
                    </Drawer>
                    <Typography>Preferences here.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick = { preferences.closePreferencesDialog } color = "primary">
                        Cancel
                    </Button>
                    <Button onClick = { this.savePreferences } color = "primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Preferences.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Preferences);

