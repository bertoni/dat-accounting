<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-label-outline s-6"></i>
            </span>
            <span class="logo-text h4">Categories ({{categories.length}})</span>
          </div>
        </div>
      </div>

      <div class="col search-wrapper">
        <div class="input-group">
          <input type="text" v-model="textCategory" class="form-control" placeholder="Create new category" aria-label="Create new category" @keyup.enter="create">
          <span class="input-group-btn">
            <button type="button" class="btn btn-icon fuse-ripple-ready" @click.prevent="create">
              <i class="icon icon-plus-circle-outline"></i>
            </button>
          </span>
        </div>
      </div>

      <div class="col-auto">
        <button type="button" class="btn btn-icon fuse-ripple-ready" @click.prevent="save">
          <i class="icon icon-checkbox-marked-circle-outline"></i> Save Changes
        </button>
      </div>
    </div>

    <div class="page-content-wrapper">
      <table-striped
        :data="categories"
        :columns="['Name']"
        :actions="[{buttonClass: ['icon', 'icon-delete-circle'], title: 'Remove', method: this.remove}]"
        :resultsPerPage="results_per_page"
        :hideButtonMoreRegisters="true" />
    </div>

  </div>
</template>

<script>
import TableStriped from '@/components/TableStriped'

export default {
  name: 'Categories',
  components: {
    TableStriped
  },
  data () {
    return {
      results_per_page: 10,
      textCategory: '',
      categories: []
    }
  },
  computed: {
    oldCategories () {
      return this.$store.state.categories
    }
  },
  methods: {
    formatRow (data) {
      return { name: data }
    },
    remove (data, event) {
      /* istanbul ignore if  */
      if (event) {
        event.preventDefault()
      }
      let idx = -1
      let i = 0
      while (idx < 0 && i < this.categories.length) {
        if (this.categories[i++].name === data.name) {
          idx = (i - 1)
        }
      }
      if (idx === -1) {
        this.$store.dispatch('notify', {text: 'Category not found'})
        return false
      }
      this.categories.splice(idx, 1)
    },
    compareToSort (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    },
    create () {
      if (!this.textCategory.length) {
        this.$store.dispatch('notify', {text: 'Category name is empty'})
        return false
      }

      const categoryExists = (name, categories) => {
        for (let x in categories) {
          if (categories.hasOwnProperty(x) && categories[x].name === name) {
            return true
          }
        }
        return false
      }

      if (categoryExists(this.textCategory, this.categories)) {
        this.$store.dispatch('notify', {text: 'This category already exists'})
        return false
      }
      this.categories.push(this.formatRow(this.textCategory))
      this.categories = this.categories.sort(this.compareToSort)
      this.textCategory = ''
    },
    save () {
      let categories = []
      for (let idx in this.categories) {
        /* istanbul ignore else  */
        if (this.categories.hasOwnProperty(idx)) {
          categories.push(this.categories[idx].name)
        }
      }
      this.$store.dispatch('setCategories', categories)
        .then(() => {
          this.$store.dispatch('notify', {type: 'success', text: 'Saved'})
        })
        .catch(error => {
          this.$store.dispatch('notify', {text: error.message})
        })
    }
  },
  watch: {
    oldCategories: function (value) {
      this.categories = []
      for (let idx in value) {
        this.categories.push(this.formatRow(value[idx]))
      }
    }
  },
  mounted () {
    this.categories = []
    for (let idx in this.oldCategories) {
      this.categories.push(this.formatRow(this.oldCategories[idx]))
    }
  }
}
</script>

<style scope>
#contacts .page-header .search-wrapper { max-width: 50rem; margin-right: 25rem; }
#contacts .page-header button { color: #fff; }
@media screen and (max-width: 500px) {
  #contacts { max-width: 600px; }
  .page-content-wrapper { width: 100%; overflow: auto; }
  table.table { width: 100%; }
}
</style>
