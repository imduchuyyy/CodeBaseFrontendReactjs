export const routersNotAuth = [
  {
    exact: true,
    path: '/login',
    component: 'login'
  }
]
export const routersAuth = [
  {
    exact: true,
    path: '/home',
    component: 'home',
    root: true
  },
  {
    exact: true,
    path: '/role',
    component: 'role',
    name: 'Phân quyền'
  }
]