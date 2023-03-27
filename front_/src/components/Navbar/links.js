let id = 1

export const links = [
  {
    id: id++,
    path: '/',
    name: 'Home',
    icon: 'HomeIcon',
    isConnected: false
  }, {
    id: id++,
    path: '/my-files',
    name: 'My files',
    icon: 'FolderIcon',
    isConnected: true
  }, {
    id: id++,
    path: '/shared',
    name: 'Shared',
    icon: 'ShareIcon',
    isConnected: true
  }, {
    id: id++,
    path: '/deleted',
    name: 'Deleted',
    icon: 'TrashIcon',
    isConnected: true
  }, {
    id: id++,
    path: '/settings',
    name: 'Settings',
    icon: 'Cog6ToothIcon',
    isConnected: false
  }
]