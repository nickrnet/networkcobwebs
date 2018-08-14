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
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
const electron = window.require('electron');
const app = electron.remote.app;
const shell = electron.remote.shell;
const ipcMain = electron.remote.ipcMain;

const drawerWidth = 240;

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
        padding: theme.spacing.unit * 3,
        minWidth: 0
    },
        menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

class Preferences extends React.Component {
    constructor (props) {
        super(props);
        this.createPreferences = this.createPreferences.bind(this);
        this.savePreferences = this.savePreferences.bind(this);
    }
    createPreferences () {
        let prefPath = app.getPath('userData');
        console.log(prefPath);
    }
    savePreferences (event) {
        let prefPath = app.getPath('userData');
        console.log(prefPath);
        ipcMain.emit('closePreferencesDialog');
    }
    render () {
        const { preferences } = this.props;
        return (
            <Dialog open = { preferences.preferencesDialogOpen }>
                <DialogContent>
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

