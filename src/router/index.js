import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/pages/Dashboard'
import Categories from '@/components/pages/Categories'
import ExpenseList from '@/components/pages/ExpenseList'
import ExpenseAdd from '@/components/pages/ExpenseAdd'
import ExpenseEdit from '@/components/pages/ExpenseEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/expense-list',
      name: 'expense-list',
      component: ExpenseList
    },
    {
      path: '/add-expense',
      name: 'expense-add',
      component: ExpenseAdd
    },
    {
      path: '/expense/:id',
      name: 'expense-edit',
      component: ExpenseEdit
    }
  ]
})
