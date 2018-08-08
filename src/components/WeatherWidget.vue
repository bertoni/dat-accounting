<template>
  <div class="widget widget-weather">
    <div v-if="!hasLocation" class="widget-header row no-gutters align-items-center justify-content-between position-relative pl-4 py-4 pr-4">
      <p>You still not set your location, choose below:</p>
      <autocomplete
        placeholder="Choose your location"
        v-model="search.itemname"
        :component-item='search.template'
        :items="search.items"
        :min-len="2"
        :input-attrs="{class:'input-autocomplete'}"
        :auto-select-one-item="false"
        :keep-open="false"
        @keyup.enter.prevent=""
        @change="change"
        @item-clicked="itemClicked"
        @item-selected="itemSelected"
        @update-items="updateItems" />
      <img v-show="search.searching" :src="loader" class="loader" />
    </div>

    <div v-if="hasLocation" class="widget-header row no-gutters align-items-center justify-content-between pl-4 py-4">
      <div class="row no-gutters align-items-center">
        <i class="icon-map-marker"></i>
        <span class="h6">{{location.name + ' (' + location.state + ') - ' + location.country}}</span>
        <button type="button" class="btn btn-icon fuse-ripple-ready" title="Change my location" @click.prevent="clearLocation">
          <i class="icon icon-minus-circle-outline"></i>
        </button>
      </div>
    </div>

    <div v-if="hasLocation" class="d-flex flex-column align-items-center justify-content-center p-4 pb-8">
      <div class="today-weather row no-gutters align-items-center justify-content-center">
        <img :src="'http://l.yimg.com/a/i/us/we/52/' + temperatureCode + '.gif'" class="mr-4" />
        <span class="h1">{{temperature}}</span>
        <span class="h1 text-muted">°</span>
        <span class="h1 text-muted">C</span>
      </div>
    </div>

    <div v-if="hasLocation" class="row no-gutters align-items-center justify-content-between p-4">
      <div class="row no-gutters align-items-center">
        <i class="icon-weather-windy icon mr-2 s-5"></i>
        <span>{{windSpeed}}</span>
        <span class="text-muted ml-1">KMH</span>
      </div>
      <div class="row align-items-center">
        <i class="icon-compass-outline icon mr-2 s-5"></i>
        <span>{{windDirection}}</span>
      </div>
      <div class="row no-gutters align-items-center">
        <i class="icon-umbrella icon mr-2 s-5"></i>
        <span>{{windHumidity}}%</span>
      </div>
    </div>

    <div class="divider"></div>

    <div v-if="hasLocation" class="row no-gutters align-items-center justify-content-between p-4">
      <span class="">{{tomorrow.date}}</span>
      <div class="row no-gutters align-items-center">
        <img width="25px" :src="'http://l.yimg.com/a/i/us/we/52/' + tomorrow.code + '.gif'" class="mr-4" />
        <span class="h5">{{tomorrow.temperature}}</span>
        <span class="h5 text-muted">°</span>
        <span class="h5 text-muted">C</span>
      </div>
    </div>

    <div class="divider"></div>

    <div v-if="hasLocation" class="row no-gutters align-items-center justify-content-between p-4">
      <span class="">{{afterTomorrow.date}}</span>
      <div class="row no-gutters align-items-center">
        <img width="25px" :src="'http://l.yimg.com/a/i/us/we/52/' + afterTomorrow.code + '.gif'" class="mr-4" />
        <span class="h5">{{afterTomorrow.temperature}}</span>
        <span class="h5 text-muted">°</span>
        <span class="h5 text-muted">C</span>
      </div>
    </div>

    <div class="divider"></div>

    <div v-if="hasLocation" class="row no-gutters align-items-center justify-content-between p-4">
      <span class="">{{afterAfterTomorrow.date}}</span>
      <div class="row no-gutters align-items-center">
        <img width="25px" :src="'http://l.yimg.com/a/i/us/we/52/' + afterAfterTomorrow.code + '.gif'" class="mr-4" />
        <span class="h5">{{afterAfterTomorrow.temperature}}</span>
        <span class="h5 text-muted">°</span>
        <span class="h5 text-muted">C</span>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from 'v-autocomplete'
import {listLocations, currentWeather} from '@/services/Meteorology'
import ItemTemplate from '@/components/ItemAutocomplete'

export default {
  name: 'WeatherWidget',
  components: {
    Autocomplete
  },
  data () {
    return {
      search: {
        searching: false,
        itemname: '',
        template: ItemTemplate,
        items: [],
        itemSelected: {}
      }
    }
  },
  computed: {
    loader () {
      return require('@/assets/images/loader.svg')
    },
    location () {
      return this.$store.state.location.currentLocation
    },
    currentWeather () {
      return this.$store.state.location.currentWeather
    },
    hasLocation () {
      return Object.keys(this.$store.state.location.currentLocation).length
    },
    temperature () {
      if (!Object.keys(this.currentWeather).length) {
        return ''
      }
      return this.currentWeather.item.condition.temp
    },
    temperatureCode () {
      if (!Object.keys(this.currentWeather).length) {
        return 0
      }
      return this.currentWeather.item.condition.code
    },
    windSpeed () {
      if (!Object.keys(this.currentWeather).length) {
        return ''
      }
      return this.currentWeather.wind.speed
    },
    windDirection () {
      if (!Object.keys(this.currentWeather).length) {
        return ''
      }
      return this.currentWeather.wind.direction
    },
    windHumidity () {
      if (!Object.keys(this.currentWeather).length) {
        return ''
      }
      return this.currentWeather.atmosphere.humidity
    },
    tomorrow () {
      let tomorrow = {date: '', temperature: '', code: 0}
      if (!Object.keys(this.currentWeather).length) {
        return tomorrow
      }
      tomorrow.date = this.currentWeather.item.forecast[1].date
      tomorrow.code = this.currentWeather.item.forecast[1].code
      tomorrow.temperature = Math.round(
        (parseFloat(this.currentWeather.item.forecast[1].high) + parseFloat(this.currentWeather.item.forecast[1].low)) / 2
      )
      return tomorrow
    },
    afterTomorrow () {
      let tomorrow = {date: '', temperature: '', code: 0}
      if (!Object.keys(this.currentWeather).length) {
        return tomorrow
      }
      tomorrow.date = this.currentWeather.item.forecast[2].date
      tomorrow.code = this.currentWeather.item.forecast[2].code
      tomorrow.temperature = Math.round(
        (parseFloat(this.currentWeather.item.forecast[2].high) + parseFloat(this.currentWeather.item.forecast[2].low)) / 2
      )
      return tomorrow
    },
    afterAfterTomorrow () {
      let tomorrow = {date: '', temperature: '', code: 0}
      if (!Object.keys(this.currentWeather).length) {
        return tomorrow
      }
      tomorrow.date = this.currentWeather.item.forecast[3].date
      tomorrow.code = this.currentWeather.item.forecast[3].code
      tomorrow.temperature = Math.round(
        (parseFloat(this.currentWeather.item.forecast[3].high) + parseFloat(this.currentWeather.item.forecast[3].low)) / 2
      )
      return tomorrow
    }
  },
  methods: {
    clearLocation () {
      this.$store.dispatch('removeLocation')
    },
    updateCurrentWeather () {
      currentWeather(this.location.id)
        .then(currentWeather => {
          this.$store.dispatch('setCurrentWeather', currentWeather.data.query.results.channel)
        })
    },
    change (value) {
      this.search.searching = true
      this.search.itemname = value
    },
    itemClicked (item) {
      this.search.itemname = item.name
      this.search.itemSelected = item
      this.$store.dispatch('setLocation', this.search.itemSelected)
      this.updateCurrentWeather()
    },
    itemSelected (item) {
      if (typeof item === 'object') {
        setTimeout(() => {
          this.search.itemname = item.name
          this.search.itemSelected = item
          this.$store.dispatch('setLocation', this.search.itemSelected)
          this.updateCurrentWeather()
        }, 50)
      }
    },
    updateItems (text) {
      this.search.searching = true
      listLocations(text)
        .then(response => { this.setResultItems(response.data.query.results.place) })
        .catch(() => { this.search.items = [] })
        .finally(() => { this.search.searching = false })
    },
    setResultItems (places) {
      this.search.items = []
      for (let idx in places) {
        this.search.items.push({
          id: places[idx].woeid,
          name: places[idx].name,
          state: places[idx].admin1.content,
          country: places[idx].country.code
        })
      }
    }
  },
  mounted () {
    if (!Object.keys(this.currentWeather).length && this.hasLocation) {
      this.updateCurrentWeather()
    }
  }
}
</script>

<style scoped>
.widget-header .h6 { font-size: 1.4rem; }
</style>

<style>
.v-autocomplete { position: relative; width: 100%; }
.v-autocomplete .v-autocomplete-input { width: 100%; }
.v-autocomplete .v-autocomplete-list { position: absolute; }
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item { cursor: pointer; }
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item.v-autocomplete-item-active { background-color: #e8f2ff; color: #000; }
.input-autocomplete { width: 100%; height: 30px; margin-top: 5px; padding: 0 7px; border-radius: 4px; border: 0; font-size: 1em; color: #fff; background-color: #ffffff; }
.input-autocomplete::-webkit-input-placeholder { color: #ffffff90; opacity: 1; }
.input-autocomplete::-moz-placeholder { color: #ffffff90; opacity: 1; }
.input-autocomplete:-moz-placeholder { color: #ffffff90; opacity: 1; }
.input-autocomplete::placeholder { color: #ffffff90; opacity: 1; }
.input-autocomplete:-ms-input-placeholder { color: #ffffff90; opacity: 1; }
.input-autocomplete::-ms-input-placeholder { color: #ffffff90; opacity: 1; }
.input-autocomplete::placeholder { color: #ffffff90; opacity: 1; }
.v-autocomplete-list { width: 100%; max-height: 200px; overflow-y: auto; background-color: #ffffff; text-align: left; }
.v-autocomplete input { width: 100%; height: 30px; padding: 0 5px; color: #585858; }
img.loader { position: absolute; width: 26px; height: 26px; top: 23px; right: 17px; -webkit-filter: brightness(30%); filter: brightness(30%); }
</style>
