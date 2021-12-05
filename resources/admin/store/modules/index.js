import userStore from './user/user'
import appStore from './app/app'
import expenseSource from './expenseSource/expenseSource';
import expense from './expense/expense'

export default {
  user: userStore,
  app: appStore,
  expenseSource: expenseSource,
  expense: expense,
}
