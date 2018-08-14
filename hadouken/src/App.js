import Main from './ui/main/Main.js';
import Preferences from './ui/preferences/Preferences.js';
const electron = window.require('electron');
const React = require('react');
const Component = React.Component;
const app = electron.app;
const shell = electron.shell
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      about: {
        aboutDialogOpen: false
      },
      preferences: {
        preferencesDialogOpen: false,
        openPreferencesDialog: this.openPreferencesDialog.bind(this),
        closePreferencesDialog: this.closePreferencesDialog.bind(this)
      }
    };
    ipcRenderer.on('openAboutDialog', () => {
      this.openAboutDialog();
    });
    ipcRenderer.on('openPreferencesDialog', () => {
      this.openPreferencesDialog();
    });
    ipcRenderer.on('closePreferencesDialog', () => {
      this.closePreferencesDialog();
    });
  }

  openAboutDialog () {
    let { about } = this.state;
    about.aboutDialogOpen = true;
    this.setState({ about });
  }

  closeAboutDialog () {
    let { about } = this.state;
    about.aboutDialogOpen = false;
    this.setState({ about });
  }

  openPreferencesDialog () {
    let { preferences } = this.state;
    preferences.preferencesDialogOpen = true;
    this.setState({ preferences });
  }

  closePreferencesDialog () {
    let { preferences } = this.state;
    preferences.preferencesDialogOpen = false;
    this.setState({ preferences });
  }

  render () {
    return (
      <div>
        <Main electron = { electron } />
        <Preferences electron = { electron } preferences = { this.state.preferences } />
      </div>
    );
  }
}

export default App;
