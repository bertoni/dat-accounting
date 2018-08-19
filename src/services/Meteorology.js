import axios from 'axios'

axios.defaults.baseURL = 'https://query.yahooapis.com/v1/public'

export const listLocations = (name) => {
  let params = {
    format: 'json'
  }
  if (name) {
    params.q = 'select * from geo.places where text="' + name + '"'
  }
  return axios.get('/yql', { params: params })
}

export const currentWeather = (cityID) => {
  let params = {
    format: 'json',
    u: 'c',
    q: 'select * from weather.forecast where woeid=' + cityID + ' and u="c"'
  }
  return axios.get('/yql', { params: params })
}
