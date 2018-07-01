<template>
  <div id="splash-screen">
    <div class="wrapper">
      <img src="/static/image/logo-white.png" />
      <loader-component />
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/Loader'

export default {
  name: 'SplashScreen',
  components: {
    LoaderComponent
  }
}
</script>

<style>
#splash-screen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  background: #63b6db;
  background: -moz-radial-gradient(center, ellipse cover, #63b6db 0%, #309dcf 100%);
  background: -webkit-radial-gradient(center, ellipse cover, #63b6db 0%,#309dcf 100%);
  background: radial-gradient(ellipse at center, #63b6db 0%,#309dcf 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#63b6db', endColorstr='#309dcf',GradientType=1 );
  text-align: center;
}
#splash-screen .wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate(-50%, -50%);
  width: 300px;
}
#splash-screen img { width: 100%; margin-bottom: 50px; }
#splash-screen .lds-ellipsis div { background: #fff; }
</style>
