// icons are from heroicons library

// defines first id and then increment it for each other item
// id is just for key attribute
let id = 1

export const links = [
  {
    id: id++,
    path: '/',
    name: 'Home',
    icon: 'HomeIcon'
  }, {
    id: id++,
    path: '/my-files',
    name: 'My files',
    icon: 'FolderIcon'
  }, {
    id: id++,
    path: '/shared',
    name: 'Shared',
    icon: 'ShareIcon'
  }, {
    id: id++,
    path: '/deleted',
    name: 'Deleted',
    icon: 'TrashIcon'
  }, {
    id: id++,
    path: '/settings',
    name: 'Settings',
    icon: 'Cog6ToothIcon'
  }
]

export const authLinks = [
  {
    id: id++,
    path: '/sign-up',
    name: 'Sign up',
    icon: 'UserPlusIcon'
  }, {
    id: id++,
    path: '/log-in',
    name: 'Log in',
    icon: 'ArrowRightOnRectangleIcon'
  }
]

export const logOut = {
  id: id++,
  name: 'Log out',
  icon: 'ArrowLeftOnRectangleIcon'
}