<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-chart-bar-stacked s-6"></i>
            </span>
            <span class="logo-text h4 text-white-500">Report By Year</span>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-dark" @click.prevent="prevYear">Prev Year</button>
          <button type="button" class="btn btn-secondary pl-10 pr-10" @click.prevent="openPicker">{{labelCurrentYear}}</button>
          <button type="button" class="btn btn-dark" @click.prevent="nextYear">Next Year</button>
        </div>
        <div id="control-date-expense">
          <datepicker
            :minimumView="'year'"
            :maximumView="'year'"
            v-model="calendar"
            @input="changeCalendar"
            ref="programaticOpen">
          </datepicker>
        </div>
      </div>
    </div>

    <div class="page-content-wrapper">
      <div v-show="loading" id="loading">
        <loader-component />
      </div>

      <div v-show="!loading" class="tab-content col-12">
        <div class="tab-pane fade p-3 active show" id="home-tab-pane">
          <div class="widget-group row no-gutters">
            <div class="row col pl-6">
              <div class="col-6 pl-0 pr-0">
                <p class="h6">
                  <span class="small">Date of Report: </span>{{dateReport}}
                </p>
              </div>
              <div class="col-6 pl-0 pr-0 text-right">
                <button type="button" class="btn btn-icon fuse-ripple-ready btn-refresh-data" @click.prevent="createReport">
                  <i class="icon icon-refresh"></i> Update Data
                </button>
              </div>
            </div>

            <div class="col-sm-12 p-3">
              <div class="widget card p-2">
                <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                  <div class="col">
                    <span class="h6">Expense by Situation by Month</span>
                  </div>
                </div>
                <div class="widget-content p-2">
                  <canvas ref="expenseBySituationByMonth"></canvas>
                </div>
              </div>
            </div>

            <div class="col-sm-12 p-3">
              <div class="widget card p-2">
                <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                  <div class="col">
                    <span class="h6">Expense by Type by Month</span>
                  </div>
                </div>
                <div class="widget-content p-2">
                  <canvas ref="expenseByTypeByMonth"></canvas>
                </div>
              </div>
            </div>

            <div class="col-sm-12 p-3">
              <div class="widget card p-2">
                <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                  <div class="col">
                    <span class="h6">Expense by Category by Year</span>
                  </div>
                </div>
                <div class="widget-content p-2">
                  <canvas ref="expenseByCategoryByYear"></canvas>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Moment from 'moment'
import Chart from 'chart.js'
import LoaderComponent from '@/components/Loader'
import {padStart} from '@/services/utilsOldES'

export default {
  name: 'ReportByYear',
  components: {
    Datepicker,
    LoaderComponent
  },
  data () {
    return {
      loading: false,
      calendar: new Date(),
      currentDate: Moment(),
      monthsOfYears: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      report: {},
      charts: {
        bySituationMonth: '',
        byTypeMonth: '',
        byCategoryYear: ''
      }
    }
  },
  computed: {
    idReport () {
      return 'by-year-' + this.labelCurrentYear
    },
    labelCurrentYear () {
      return this.currentDate.format('YYYY')
    },
    dateReport () {
      if (this.loading || !Object.keys(this.report).length) {
        return 'Never generated'
      }
      return Moment(String(this.report.date)).format('YYYY-MM-DD HH:mm')
    },
    dataChartExpenseBySituationByMonth () {
      if (this.loading || !Object.keys(this.report).length) {
        return {}
      }
      let pending = []
      let settled = []
      let total = []
      for (let i = 1; i <= 12; i++) {
        pending.push(this.report[padStart(i.toString(), 2, '0')].situation.price.pending.toFixed(2))
        settled.push(this.report[padStart(i.toString(), 2, '0')].situation.price.settled.toFixed(2))
        total.push((parseFloat(this.report[padStart(i.toString(), 2, '0')].situation.price.pending) + parseFloat(this.report[padStart(i.toString(), 2, '0')].situation.price.settled)).toFixed(2))
      }
      return {
        datasets: [
          {
            label: 'Total',
            data: total,
            backgroundColor: '#69B8EA',
            borderWidth: 0,
            yAxisID: 'y-axis-total'
          },
          {
            label: 'Settled',
            data: settled,
            backgroundColor: '#009688',
            borderWidth: 0,
            yAxisID: 'y-axis-settled'
          },
          {
            label: 'Pending',
            data: pending,
            backgroundColor: '#F44336',
            borderWidth: 0,
            yAxisID: 'y-axis-pending'
          }
        ],
        labels: this.monthsOfYears
      }
    },
    dataChartExpenseByTypeByMonth () {
      if (this.loading || !Object.keys(this.report).length) {
        return {}
      }
      let fixed = []
      let casual = []
      let superfluous = []
      for (let i = 1; i <= 12; i++) {
        fixed.push(this.report[padStart(i.toString(), 2, '0')].type.price.fixed.toFixed(2))
        casual.push(this.report[padStart(i.toString(), 2, '0')].type.price.casual.toFixed(2))
        superfluous.push(this.report[padStart(i.toString(), 2, '0')].type.price.superfluous.toFixed(2))
      }
      return {
        datasets: [
          {
            label: 'Fixed',
            data: fixed,
            backgroundColor: '#2196F3',
            borderWidth: 0,
            yAxisID: 'y-axis-fixed'
          },
          {
            label: 'Casual',
            data: casual,
            backgroundColor: '#FFEB3B',
            borderWidth: 0,
            yAxisID: 'y-axis-casual'
          },
          {
            label: 'Superfluous',
            data: superfluous,
            backgroundColor: '#F44336',
            borderWidth: 0,
            yAxisID: 'y-axis-superfluous'
          }
        ],
        labels: this.monthsOfYears
      }
    },
    dataChartExpenseByCategoryByYear () {
      if (this.loading || !Object.keys(this.report).length) {
        return {}
      }
      let labels = {}
      for (let i = 1; i <= 12; i++) {
        let month = padStart(i.toString(), 2, '0')
        for (let idx in this.report[month].category.price) {
          if (!labels[idx]) {
            labels[idx] = {}
            labels[idx]['data'] = this.report[month].category.price[idx]
            labels[idx]['bg'] = '#' + Math.floor(Math.random() * 16777215).toString(16)
          } else {
            labels[idx]['data'] += this.report[month].category.price[idx]
          }
        }
      }
      let categories = Object.keys(labels)
      let data = []
      let bg = []
      for (let idx in categories) {
        data.push(labels[categories[idx]].data.toFixed(2))
        bg.push(labels[categories[idx]].bg)
      }
      return {
        datasets: [{
          data: data,
          backgroundColor: bg
        }],
        labels: categories
      }
    }
  },
  methods: {
    prevYear () {
      this.currentDate = Moment(this.currentDate).subtract(1, 'year')
      this.calendar = new Date(this.currentDate.toString())
      this.loadData()
    },
    nextYear () {
      this.currentDate = Moment(this.currentDate).add(1, 'year')
      this.calendar = new Date(this.currentDate.toString())
      this.loadData()
    },
    changeCalendar () {
      this.currentDate = Moment(this.calendar)
      this.loadData()
    },
    openPicker () {
      this.$refs.programaticOpen.showCalendar()
    },
    mountCharts () {
      if (typeof this.charts.bySituationMonth !== 'string') {
        this.charts.bySituationMonth.destroy()
        this.charts.byTypeMonth.destroy()
        this.charts.byCategoryYear.destroy()
      }
      let dataChartExpenseBySituationByMonth = this.dataChartExpenseBySituationByMonth
      /* istanbul ignore next */
      let maxBySituation = (!Object.keys(dataChartExpenseBySituationByMonth).length ? 0 : dataChartExpenseBySituationByMonth.datasets[0].data.reduce((prevVal, elem) => (elem > prevVal ? elem : prevVal), 0))
      this.charts.bySituationMonth = new Chart(this.$refs.expenseBySituationByMonth.getContext('2d'), {
        type: 'bar',
        data: dataChartExpenseBySituationByMonth,
        options: {
          legend: {
            position: 'top'
          },
          scales: {
            xAxes: [{
              barPercentage: 1,
              categoryPercentage: 0.6
            }],
            yAxes: [
              { id: 'y-axis-total', ticks: { beginAtZero: true } },
              { id: 'y-axis-settled', display: false, ticks: { beginAtZero: true, suggestedMax: maxBySituation } },
              { id: 'y-axis-pending', display: false, ticks: { beginAtZero: true, suggestedMax: maxBySituation } }
            ]
          }
        }
      })

      let dataChartExpenseByTypeByMonth = this.dataChartExpenseByTypeByMonth
      let maxByType = 0
      /* istanbul ignore if */
      if (Object.keys(dataChartExpenseByTypeByMonth).length) {
        /* istanbul ignore next */
        for (let i = 0; i < 3; i++) {
          maxByType = dataChartExpenseByTypeByMonth.datasets[i].data.reduce((prevVal, elem) => (elem > prevVal ? elem : prevVal), parseFloat(maxByType))
        }
      }
      this.charts.byTypeMonth = new Chart(this.$refs.expenseByTypeByMonth.getContext('2d'), {
        type: 'bar',
        data: dataChartExpenseByTypeByMonth,
        options: {
          legend: {
            position: 'top'
          },
          scales: {
            xAxes: [{
              barPercentage: 1,
              categoryPercentage: 0.6
            }],
            yAxes: [
              { id: 'y-axis-fixed', ticks: { beginAtZero: true, suggestedMax: maxByType } },
              { id: 'y-axis-casual', display: false, ticks: { beginAtZero: true, suggestedMax: maxByType } },
              { id: 'y-axis-superfluous', display: false, ticks: { beginAtZero: true, suggestedMax: maxByType } }
            ]
          }
        }
      })

      this.charts.byCategoryYear = new Chart(this.$refs.expenseByCategoryByYear.getContext('2d'), {
        type: 'pie',
        data: this.dataChartExpenseByCategoryByYear,
        options: {
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: /* istanbul ignore next */(tooltipItems, data) => {
                return ' ' + data.labels[tooltipItems.index] + ': ' + data.datasets[0].data[tooltipItems.index] + ' (' +
                  (((data.datasets[0].data[tooltipItems.index] * 100) / data.datasets[0].data.reduce((prevVal, elem) => prevVal + parseFloat(elem), 0)).toFixed(2)) + '%)'
              }
            }
          },
          legend: {
            display: true,
            position: 'left'
          }
        }
      })
    },
    toProcessDataMonth (expenses, month) {
      let report = {}
      report.situation = {}
      report.situation.price = {}
      report.situation.quantity = {}
      report.type = {}
      report.type.price = {}
      report.type.quantity = {}
      report.category = {}
      report.category.price = {}
      report.category.quantity = {}
      report.situation.price.settled = expenses.reduce((sum, element) => sum + (element.situation === 'Settled' ? element.price : 0), 0)
      report.situation.price.pending = expenses.reduce((sum, element) => sum + (element.situation === 'Pending' ? element.price : 0), 0)
      report.situation.quantity.settled = expenses.filter(element => element.situation === 'Settled').length
      report.situation.quantity.pending = expenses.filter(element => element.situation === 'Pending').length
      report.type.price.fixed = expenses.reduce((sum, element) => sum + (element.type === 'Fixed' ? element.price : 0), 0)
      report.type.price.casual = expenses.reduce((sum, element) => sum + (element.type === 'Casual' ? element.price : 0), 0)
      report.type.price.superfluous = expenses.reduce((sum, element) => sum + (element.type === 'Superfluous' ? element.price : 0), 0)
      report.type.quantity.fixed = expenses.filter(element => element.type === 'Fixed').length
      report.type.quantity.casual = expenses.filter(element => element.type === 'Casual').length
      report.type.quantity.superfluous = expenses.filter(element => element.type === 'Superfluous').length
      for (let idx in this.$store.state.categories) {
        report.category.price[this.$store.state.categories[idx]] = expenses.reduce((sum, element) => sum + (element.category === this.$store.state.categories[idx] ? element.price : 0), 0)
        report.category.quantity[this.$store.state.categories[idx]] = expenses.filter(element => element.category === this.$store.state.categories[idx]).length
      }
      this.report[month] = report
      return report
    },
    getReportMonth (month) {
      return this.$store.dispatch('getExpense', {
        month: month,
        year: this.labelCurrentYear
      })
        .then(data => this.toProcessDataMonth(data, month))
        .catch(/* istanbul ignore next */() => this.toProcessDataMonth([], month))
    },
    createReport () {
      this.loading = true
      this.report = {}
      let reports = []
      for (let i = 1; i <= 12; i++) {
        reports.push(this.getReportMonth(padStart(i.toString(), 2, '0')))
      }
      Promise.all(reports)
        .then(() => {
          this.saveReport()
        })
        .catch(/* istanbul ignore next */error => console.log(error.message))
    },
    saveReport () {
      this.report.date = Moment()
      this.$store.dispatch('updateReport', {id: this.idReport, report: this.report})
        .then(/* istanbul ignore next */() => {
          setTimeout(() => {
            this.successData()
          }, 1000)
        })
        .catch(/* istanbul ignore next */() => { this.loading = false })
    },
    loadData () {
      this.loading = true
      this.$store.dispatch('getReportById', this.idReport)
        .then(/* istanbul ignore next */report => {
          if (!report) {
            throw Error('Not found')
          }
          this.report = report
          setTimeout(() => {
            this.successData()
          }, 1000)
        })
        .catch(/* istanbul ignore next */() => this.createReport())
    },
    successData () {
      this.loading = false
      this.mountCharts()
      window.dispatchEvent(new Event('resize'))
    }
  },
  mounted () {
    const container = document.querySelector('#wrapper-global')
    /* istanbul ignore next */
    if (container && container.scrollTop) {
      container.scrollTop = 0
    }
    this.loadData()
    window.addEventListener('resize', /* istanbul ignore next */() => {
      if (typeof this.charts.byCategoryYear !== 'string') {
        if (window.innerWidth < 550) {
          this.charts.byCategoryYear.options.legend.display = false
        } else {
          this.charts.byCategoryYear.options.legend.display = true
        }
      }
    })
  }
}
</script>

<style scoped>
#loading { width: 100%; margin-top: 30%; text-align: center; }
</style>
<style>
#control-date-expense { margin-left: 16px; }
#control-date-expense .vdp-datepicker input[type="text"] { display: none; }
#control-date-expense .vdp-datepicker__calendar span { color: #000; }
</style>
