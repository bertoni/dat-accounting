<template>
  <aside id="aside" class="aside aside-left" data-fuse-bar="aside" data-fuse-bar-media-step="md" data-fuse-bar-position="left">
    <div class="aside-content-wrapper">
      <div class="aside-content bg-primary-700 text-auto">
        <div class="aside-toolbar">
          <div class="logo">
            <span class="logo-icon"><img src="/static/image/logo-white.png" /></span>
            <span class="logo-text">DatAccounting</span>
          </div>
          <button id="toggle-fold-aside-button" type="button" class="btn btn-icon d-none d-lg-block" data-fuse-aside-toggle-fold>
            <i class="icon icon-backburger"></i>
          </button>
        </div>

        <ul class="nav flex-column custom-scrollbar" id="sidenav" data-children=".nav-item">
          <!-- <li class="subheader">
            <span>WEBFORCE</span>
          </li> -->

          <li class="nav-item">
            <router-link class="nav-link ripple" :to="{ name: 'dashboard'}"><i class="icon s-4 icon-widgets"></i> <span>Dashboard</span></router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link ripple" :to="{ name: 'categories'}"><i class="icon s-4 icon-label-outline"></i> <span>My Categories</span></router-link>
          </li>

          <li class="nav-item" role="tab" id="heading-expense">
            <a class="nav-link ripple with-arrow collapsed" data-toggle="collapse" data-target="#collapse-expense" href="#" aria-expanded="false" aria-controls="collapse-dashboards" @click="updateScrollbar">
              <i class="icon s-4 icon-barcode-scan"></i>
              <span>Expense</span>
            </a>
            <ul id="collapse-expense" class='collapse show' role="tabpanel" aria-labelledby="heading-expense" data-children=".nav-item">
              <li class="nav-item">
                <router-link class="nav-link ripple" :to="{ name: 'expense-list'}"><span>Expense List</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link ripple" :to="{ name: 'expense-add'}"><span>Add Expense</span></router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item" role="tab" id="heading-report">
            <a class="nav-link ripple with-arrow collapsed" data-toggle="collapse" data-target="#collapse-report" href="#" aria-expanded="false" aria-controls="collapse-report" @click="updateScrollbar">
              <i class="icon s-4 icon-chart-bar-stacked"></i>
              <span>Report</span>
            </a>
            <ul id="collapse-report" class='collapse show' role="tabpanel" aria-labelledby="heading-report" data-children=".nav-item">
              <li class="nav-item">
                <router-link class="nav-link ripple" :to="{ name: 'report-by-year'}"><span>By Year</span></router-link>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
    }
  },
  methods: {
    updateScrollbar () {
      this.$store.dispatch('updateScrollbar')
    }
  }
}
</script>

<style scoped>
.logo-icon { background-color: transparent !important; }
.logo-icon img { height: 28px; }
.logo-text { font-size: 1.2em !important; margin-top: 5px; font-weight: bold !important; color: #fff !important; }
.nav-item a span { color: #fff !important; }
</style>
