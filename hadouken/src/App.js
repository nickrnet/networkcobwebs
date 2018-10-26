import Main from './ui/main/Main.js';
import Preferences from './ui/preferences/Preferences.js';

let electron, ipcRenderer;
const React = require('react');
const Component = React.Component;

class App extends Component {
  constructor (props) {
    super(props);
    // detect browser for preference storage
    // use file for electron
    // use session storage for browser (Chrome, FF, IE)
    let ua = navigator.userAgent;
    if (ua.indexOf('Electron') !== -1) {
      electron = window.require('electron');
      ipcRenderer = electron.ipcRenderer;

      ipcRenderer.on('openAboutDialog', () => {
        this.openAboutDialog();
      });
      ipcRenderer.on('openPreferencesDialog', () => {
        this.openPreferencesDialog();
      });
      ipcRenderer.on('closePreferencesDialog', () => {
        this.closePreferencesDialog();
      });
    } else {
      electron = false;
      ipcRenderer = false;
    }
    
    this.state = {
      electron: electron,
      about: {
        aboutDialogOpen: false
      },
      preferences: {
        preferencesDialogOpen: false,
        openPreferencesDialog: this.openPreferencesDialog.bind(this),
        closePreferencesDialog: this.closePreferencesDialog.bind(this)
      }
    };
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
        <Main electron = { electron } preferences = { this.state.preferences }/>
        <Preferences electron = { electron } preferences = { this.state.preferences } />
      </div>
    );
  }
}

export default App;
