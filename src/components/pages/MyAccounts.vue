<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-barcode-scan s-6"></i>
            </span>
            <span class="logo-text h4">My Accounts</span>
          </div>
        </div>
      </div>

      <div class="col search-wrapper">
        <div class="input-group">
          <input type="text" v-model="repositoryLink" class="form-control" placeholder="Add an existing account" aria-label="Add an existing account" @keyup.enter="importAccount">
          <span class="input-group-btn">
            <button type="button" class="btn btn-icon fuse-ripple-ready" @click.prevent="importAccount">
              <i class="icon icon-plus-circle-outline"></i>
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="page-content-wrapper">
      <table-striped
        v-show="!loading"
        :data="accounts"
        :columns="['Title', 'Description', 'Size', 'Url']"
        :actions="[
          {buttonClass: ['icon', 'icon-delete-circle'], title: 'Remove', method: this.remove},
          {buttonClass: ['icon', 'icon-check-circle'], title: 'Active', method: this.active}
        ]"
        :hideButtonMoreRegisters="true" />
      <loader-component
        v-show="loading" />
    </div>

    <a href="#" id="add-new-account" class="btn btn-secondary btn-fab" title="Add new Account" @click.prevent="newAccount"><i class="icon-plus"></i></a>
  </div>
</template>

<script>
import TableStriped from '@/components/TableStriped'
import LoaderComponent from '@/components/Loader'

export default {
  name: 'MyAccounts',
  components: {
    TableStriped,
    LoaderComponent
  },
  data () {
    return {
      loading: true,
      dataRemove: '',
      accounts: [],
      repositoryLink: ''
    }
  },
  computed: {
    oldAccounts () {
      return this.$store.state.repositories
    }
  },
  methods: {
    formatRow (data) {
      return {
        key: data.key,
        title: data.title,
        description: data.description,
        size: data.size,
        url: data.url
      }
    },
    remove (data, event) {
      /* istanbul ignore if  */
      if (event) {
        event.preventDefault()
      }
      this.dataRemove = data
      this.$store.dispatch('openModalConfirm', {
        title: 'Remove Account ' + data.title,
        content: '<p>This operation is irreversible, are you sure?</p>',
        callbackOk: this.confirmRemove
      })
    },
    confirmRemove () {
      this.$store.dispatch('closeModalConfirm')
      this.$store.dispatch('removeRepository', this.dataRemove.key)
        .then(/* istanbul ignore next */message => this.$store.dispatch('notify', {type: 'success', text: message}))
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
    },
    active (data, event) {
      /* istanbul ignore if  */
      if (event) {
        event.preventDefault()
      }
      this.$store.dispatch('changeAccount', data.key)
        .then(/* istanbul ignore next */message => this.$store.dispatch('notify', {type: 'success', text: message}))
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
    },
    importAccountWithSuccess () {
      this.repositoryLink = ''
      this.$store.dispatch('notify', {text: 'Account imported', type: 'success'})
    },
    importAccount () {
      let re = /^dat:\/\/[a-z0-9]+$/

      if (!this.repositoryLink.length) {
        this.$store.dispatch('notify', {text: 'Dat link of your account is required'})
        return false
      }
      if (!re.test(this.repositoryLink)) {
        this.$store.dispatch('notify', {text: 'Invalid dat address'})
        return false
      }
      this.$store.dispatch('importRepository', this.repositoryLink)
        .then(() => this.importAccountWithSuccess())
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
    },
    setAccounts (accounts) {
      this.accounts = []
      for (let idx in accounts) {
        this.accounts.push(accounts[idx])
        this.loading = false
      }
    },
    newAccount () {
      this.loading = true
      this.$store.dispatch('createAccount')
        .then(/* istanbul ignore next */repository => this.$store.dispatch('importRepository', repository))
        .then(/* istanbul ignore next */() => this.$store.dispatch('notify', {text: 'Account created', type: 'success'}))
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
        .finally(/* istanbul ignore next */() => {
          this.loading = false
        })
    }
  },
  watch: {
    oldAccounts: function (value) {
      this.setAccounts(value)
    }
  },
  mounted () {
    this.setAccounts(this.$store.state.repositories)
  }
}
</script>

<style scoped>
#add-new-account {
  position: fixed;
  right: 1%;
  bottom: 2%;
}
</style>
