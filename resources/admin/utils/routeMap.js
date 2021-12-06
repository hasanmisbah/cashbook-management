const routeMap = {

  auth: {

    login: {
      name: 'Login',
      title: 'Login',
      path: '/admin/login',
      icon: 'mdi mdi-home',
      permission: {

      },
    },

    register: {
      name: 'Register',
      title: 'Register',
      path: '/admin/register',
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
        path: 'admin/expense-source',
        icon: 'mdi mdi-database',
        permission: {

        },
    },

  expense: {
    name: 'Expense',
    title: 'Expense',
    path: 'admin/expense',
    icon: 'mdi mdi-account-convert',
    permission: {

    },
  }
}

export default routeMap;
