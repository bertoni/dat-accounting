<template>
  <div id="side-modal">
    <div :class="['modal', {'open': opened}]" :style="style">
      <div class="modal-header">
        <h4 class="modal-title">{{title}}</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body" v-html="content"></div>
    </div>
    <div class="mask" :style="style" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'SideModal',
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
    }
  },
  data () {
    return {
    }
  },
  computed: {
    style: function () {
      return 'display:' + (this.opened ? 'block' : 'none')
    }
  },
  methods: {
    close () {
      this.$store.dispatch('closeSideModal')
    }
  }
}
</script>

<style scoped>
.modal {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 12px 0 rgba(0,0,0,.25);
  top: 0;
  bottom: 0;
  right: 0;
  left: auto;
  transform: translate3D(100%,0,0);
  transition: transform .3s ease;
  z-index: 1041;
  width: 500px;
  max-width: 90%;
}
.open {
  transform: translate3d(0px, 0px, 0px);
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1040;
  background: rgba(0,0,0,.54);
}
</style>
