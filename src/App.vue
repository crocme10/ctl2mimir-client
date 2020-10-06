<template>
  <div id="app">
    <NavHeader />
    <div class="flex">
      <div class="w-1/12"></div>
      <div class="w-10/12 bg-gray-200">
        <router-view/>
      </div>
      <div class="w-1/12"></div>
    </div>
    <Notifications />
  </div>
</template>

<script>
import Notifications from '@/components/Util/Notifications'
import NavHeader from '@/components/NavHeader'
import eventSource from '@/services/eventSource'

export default {
  name: 'App',
  components: {
    NavHeader,
    Notifications
  },
  async created () {
    eventSource.configure()
  }
}
</script>
