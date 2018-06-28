<template>
  <div id="modal-simple">
    <div class="modal show" tabindex="-1" role="dialog" :style="style">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{title}}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
                <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body" v-html="content"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light fuse-ripple-ready" @click="close">No, cancel</button>
            <button type="button" class="btn btn-success fuse-ripple-ready" @click="callbackOk">Yes, alright</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="close" :style="style"></div>
  </div>
</template>

<script>
export default {
  name: 'ModalConfirm',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    opened: {
      type: Boolean,
      required: true,
      default: false
    },
    callbackOk: {
      type: Function,
      required: true,
      default: function () {
        return this.$store.dispatch('closeModalConfirm')
      }
    }
  },
  computed: {
    style: function () {
      return 'display:' + (this.opened ? 'block' : 'none')
    }
  },
  methods: {
    close () {
      this.$store.dispatch('closeModalConfirm')
    }
  }
}
</script>
