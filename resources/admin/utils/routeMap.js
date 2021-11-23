const routeMap = {

  auth: {

    login: {
      name: 'Login',
      title: 'Login',
      path: '/login',
      icon: 'mdi mdi-home',
      permission: {

      },
    },

    register: {
      name: 'Register',
      title: 'Register',
      path: '/register',
      icon: 'mdi mdi-home',
      permission: {

      },
    }
  },
    home: {
        name: 'Dashboard',
        title: 'Dashboard',
        path: '/',
        icon: 'mdi mdi-home',
        permission: {

        },
    },
  expenseSource: {
        name: 'ExpenseSource',
        title: 'Expense Source',
        path: '/expense-source',
        icon: 'mdi mdi-database',
        permission: {

        },
    }
}

export default routeMap;
