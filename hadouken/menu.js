const { app, shell, ipcMain } = require('electron');

let menuItems = function() {
  return [
    {
        label: 'Ansible IDE',
        submenu: [
        {
          label: 'About',
          click: function () {
              ipcMain.emit('openAboutDialog')
          }
        },
        {
          label: 'Preferences', accelerator: 'CmdOrCtrl+,',
          click: function () {
              ipcMain.emit('openPreferencesDialog');
          }
        },
        {
          label: 'Quit', accelerator: 'CmdOrCtrl+Q',
          click: function () {
            app.quit();
          }
        }]
    },
    {
      label: 'File',
      submenu: [
        { 
          label: 'New', accelerator: 'CmdOrCtrl+N',
          submenu: [
            {
              label: 'Inventory',
              submenu: [
                { label: 'Hosts file...' },
                { label: 'Group variables file...' },
                { label: 'Host variables file...' }
              ]
            },
            {
              label: 'Playbook',
              submenu: [
                { label: 'Playbook file...' },
                { label: 'Group variables file...' },
                { label: 'Host variables file...' }
              ]
            }
          ]
        },
        { label: 'Open', accelerator: 'CmdOrCtrl+O' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload', accelerator: 'CmdOrCtrl+R',
          click: function (item, focusedWindow) {
            focusedWindow.reload();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Ansible Documentation...',
          click: function() {
            shell.openExternal('https://docs.ansible.com/ansible/latest/index.html');
          }
        },
        { type: 'separator' },
        { label: 'Version 1.0.0-alpha.6', enabled: 'FALSE' }
      ]
    }
  ]
}

module.exports = menuItems;
