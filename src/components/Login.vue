<template>
  <div id="login" class="p-8" :style="'background-image: url(/static/image/backgrounds/' + backgrounds[activeBackground].image + ')'">
    <div class="content custom-scrollbar" id="login-content">
      <div class="form-wrapper md-elevation-8 p-8">
        <div class="logo">
          <img src="/static/image/logo-white.png" />
        </div>

        <div class="title mt-4 mb-8">Dat Accounting APP</div>

        <div class="mt-4 mb-4">If you have already an account, please enter your dat link</div>

        <form :class="[{'was-validated': formValidated}]" v-on:submit.prevent>
          <div class="form-group mb-4">
            <input type="text" :class="classInputLink" id="linkInput" v-model="link" required @keyup.13="submit" ref="link" placeholder="dat://981091029du018dn91y9dajscia">
            <label for="linkInput">Link account address</label>
            <div class="invalid-feedback">{{infoLink}}</div>
          </div>

          <button type="submit" class="submit-button btn btn-block btn-secondary my-4 mx-auto fuse-ripple-ready" @click="submit">Enter</button>
        </form>

        <div class="mt-10 mb-4">Do not have an account? create one bellow</div>

        <button type="submit" class="submit-button btn btn-block btn-secondary my-4 mx-auto fuse-ripple-ready" @click="create">Create</button>

      </div>
    </div>
    <p id="credit" :class="backgrounds[activeBackground].class">Photo by <a target="_blank" :href="backgrounds[activeBackground].link">{{backgrounds[activeBackground].user}}</a> on <a target="_blank" href="https://unsplash.com">Unsplash</a></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formValidated: false,
      infoLink: '',
      link: '',
      backgrounds: [
        {class: 'black', image: 'peter-kang-603910-unsplash.jpg', user: 'Peter Kang', link: 'https://unsplash.com/photos/z4U8xWqsE10'},
        {class: 'black', image: 'dawid-zawila-279998-unsplash.jpg', user: 'Dawid Zawiła', link: 'https://unsplash.com/photos/zb2vBaHYB2I'},
        {class: 'white', image: 'daniela-cuevas-21225-unsplash.jpg', user: 'Daniela Cuevas', link: 'https://unsplash.com/photos/t7YycgAoVSw'}
      ],
      activeBackground: 0
    }
  },
  computed: {
    classInputLink: function () {
      return 'form-control' + (this.formValidated && (!this.infoLink.length) ? ' md-has-value' : '')
    }
  },
  methods: {
    create () {
      this.$store.dispatch('createAccount')
        .then(/* istanbul ignore next */repository => this.$store.dispatch('setRepository', repository))
        .then(/* istanbul ignore next */() => this.$store.dispatch('notify', {text: 'Welcome!', type: 'success'}))
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
    },
    submit () {
      let re = /^dat:\/\/[a-z0-9]+$/
      this.formValidated = false
      this.infoLink = ''

      if (!this.link.length) {
        this.infoLink = 'Dat link of your account is required'
      } else if (!re.test(this.link)) {
        this.infoLink = 'Invalid dat address'
      }

      this.formValidated = true

      if (!this.infoLink.length) {
        this.$store.dispatch('setRepository', this.link)
          .then(/* istanbul ignore next */() => this.$store.dispatch('notify', {text: 'Welcome back!', type: 'success'}))
          .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
      }
    }
  },
  mounted () {
    this.activeBackground = Math.floor(Math.random() * this.backgrounds.length) + 0
  }
}
</script>

<style scoped>
#login {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  background-color: #fff;
}
#login .logo img { height: 100%; }
@-webkit-keyframes autofill {
  to { background: transparent; }
}
input:-webkit-autofill {
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}
#login-content { box-shadow: 0 0 5px #585858; }
#credit { margin-top: 10px; font-size: 0.8em; }
#credit.white,
#credit.white a { color: #fff; }
#credit.black,
#credit.black a { color: #000; }
</style>
