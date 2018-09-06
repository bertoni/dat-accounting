import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => import(/* webpackChunkName: "group-common" */ '@/components/pages/Dashboard')
const ExpenseList = () => import(/* webpackChunkName: "group-common" */ '@/components/pages/ExpenseList')
const ExpenseAdd = () => import(/* webpackChunkName: "group-common" */ '@/components/pages/ExpenseAdd')
const ExpenseEdit = () => import(/* webpackChunkName: "group-common" */ '@/components/pages/ExpenseEdit')
const Categories = () => import(/* webpackChunkName: "group-manage" */ '@/components/pages/Categories')
const MyAccounts = () => import(/* webpackChunkName: "group-manage" */ '@/components/pages/MyAccounts')
const ReportByYear = () => import(/* webpackChunkName: "group-report" */ '@/components/pages/ReportByYear')

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
    },
    {
      path: '/my-accounts',
      name: 'my-accounts',
      component: MyAccounts
    },
    {
      path: '/report/by-year',
      name: 'report-by-year',
      component: ReportByYear
    }
  ]
})
