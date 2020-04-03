export const routes = [
  {
    label: 'Login',
    path: '/login',
    exact: true,
    component: 'login'
  },
  {
    label: 'Register',
    path: '/register',
    exact: true,
    component: 'register'
  },
  {
    label: 'home',
    path: '/',
    private: true,
    exact: true,
    component: 'home',
  },
  {
    label: 'role',
    path: '/role',
    exact: true,
    private: true,
    component: 'role',
  },
]
