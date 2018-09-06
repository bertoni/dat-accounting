<template>
  <div id="wrapper">
    <aside-component />
    <div class="content-wrapper" :style="styleContentWrapper">
      <nav-toolbar-component />
      <div class="content custom-scrollbar" id="wrapper-global">
        <router-view
          v-if="!splashScreen && isLogged" />
      </div>
    </div>
    <quick-panel-component />
    <login-component
      v-show="!splashScreen && !isLogged" />
    <splash-screen-component
      v-if="splashScreen" />
    <modal-simple-component
      :opened="modalSimpleStatus"
      :content="modalSimpleContent"
      :title="modalSimpleTitle" />
    <modal-confirm-component
      :opened="modalConfirmStatus"
      :content="modalConfirmContent"
      :title="modalConfirmTitle"
      :callbackOk="modalConfirmCallbackOk" />
    <side-modal-component
      :opened="sideModalStatus"
      :content="sideModalContent"
      :title="sideModalTitle" />
    <notifications animation-type="velocity" position="bottom right" group="general"></notifications>
  </div>
</template>

<script>
import AsideComponent from '@/components/Aside'
import NavToolbarComponent from '@/components/NavToolbar'
import QuickPanelComponent from '@/components/QuickPanel'
import SplashScreenComponent from '@/components/SplashScreen'

export default {
  name: 'App',
  components: {
    SplashScreenComponent,
    AsideComponent,
    NavToolbarComponent,
    QuickPanelComponent,
    'ModalSimpleComponent': /* istanbul ignore next */() => import('@/components/ModalSimple'),
    'ModalConfirmComponent': /* istanbul ignore next */() => import('@/components/ModalConfirm'),
    'SideModalComponent': /* istanbul ignore next */() => import('@/components/SideModal'),
    'LoginComponent': /* istanbul ignore next */() => import('@/components/Login')
  },
  data () {
    return {
      clientHeight: 0,
      splashScreen: true
    }
  },
  computed: {
    isLogged: function () {
      return this.$store.getters.userIsLogged
    },
    styleContentWrapper: function () {
      return 'height:' + this.clientHeight + 'px;'
    },
    modalSimpleStatus: function () {
      return this.$store.state.modalSimple.opened
    },
    modalSimpleTitle: function () {
      return this.$store.state.modalSimple.title
    },
    modalSimpleContent: function () {
      return this.$store.state.modalSimple.content
    },
    modalConfirmStatus: function () {
      return this.$store.state.modalConfirm.opened
    },
    modalConfirmTitle: function () {
      return this.$store.state.modalConfirm.title
    },
    modalConfirmContent: function () {
      return this.$store.state.modalConfirm.content
    },
    modalConfirmCallbackOk: function () {
      return this.$store.state.modalConfirm.callbackOk
    },
    sideModalStatus: function () {
      return this.$store.state.sideModal.opened
    },
    sideModalTitle: function () {
      return this.$store.state.sideModal.title
    },
    sideModalContent: function () {
      return this.$store.state.sideModal.content
    }
  },
  mounted () {
    this.$store.dispatch('init')
      .then(/* istanbul ignore next */() => {
        setTimeout(() => {
          this.splashScreen = false
        }, 500)
      })
      .catch(/* istanbul ignore next */error => console.warn(error.message))
    setTimeout(/* istanbul ignore next */() => { this.$store.dispatch('updateScrollbar') }, 1000)
    window.addEventListener('resize', /* istanbul ignore next */() => {
      this.clientHeight = document.documentElement.clientHeight
    })
  }
}
</script>

<style>
.notification-content { font-size: 1.2em; color: #000; }
</style>
