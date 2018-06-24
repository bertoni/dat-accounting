<template>
  <div class="quick-panel-sidebar custom-scrollbar" fuse-cloak data-fuse-bar="quick-panel-sidebar" data-fuse-bar-position="right">

    <div class="list-group date">
      <div class="list-group-item subheader">TODAY</div>
      <div class="list-group-item two-line">
        <div class="text-muted">
          <div class="h1"> {{week}}</div>
          <div class="h2 row no-gutters align-items-start">
            <span> {{day}}</span>
            <span class="h6">th</span>
            <span> {{month}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="list-group">
      <div class="list-group-item subheader">Events</div>
      <div class="list-group-item two-line">
        <div class="list-item-content">
          <h3>Group Meeting</h3>
          <p>In 32 Minutes, Room 1B</p>
        </div>
      </div>
      <div class="list-group-item two-line">
        <div class="list-item-content">
          <h3>Public Beta Release</h3>
          <p>11:00 PM</p>
        </div>
      </div>
      <div class="list-group-item two-line">
        <div class="list-item-content">
          <h3>Dinner with David</h3>
          <p>17:30 PM</p>
        </div>
      </div>
      <div class="list-group-item two-line">
        <div class="list-item-content">
          <h3>Q&amp;A Session</h3>
          <p>20:30 PM</p>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="list-group">
      <div class="list-group-item subheader">Notes</div>
      <div class="list-group-item two-line">
        <div class="list-item-content">
          <h3>Best songs to listen while working</h3>
          <p>Last edit: May 8th, 2015</p>
        </div>
      </div>
      <div class="list-group-item two-line">
        <div class="list-item-content">
          <h3>Useful subreddits</h3>
          <p>Last edit: January 12th, 2015</p>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="list-group">

      <div class="list-group-item subheader">Quick Settings</div>

      <div class="list-group-item">
        <div class="list-item-content">
          <h3>Notifications</h3>
        </div>
        <div class="secondary-container">
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" />
            <span class="custom-control-indicator"></span>
          </label>
        </div>
      </div>

      <div class="list-group-item">
        <div class="list-item-content">
          <h3>Cloud Sync</h3>
        </div>
        <div class="secondary-container">
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" />
            <span class="custom-control-indicator"></span>
          </label>
        </div>
      </div>

      <div class="list-group-item">
        <div class="list-item-content">
          <h3>Retro Thrusters</h3>
        </div>
        <div class="secondary-container">
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" />
            <span class="custom-control-indicator"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'QuickPanel',
  data () {
    return {
    }
  },
  computed: {
    week: function () {
      return moment().format('dddd')
    },
    day: function () {
      return moment().format('DD')
    },
    month: function () {
      return moment().format('MMM')
    }
  }
}
</script>
