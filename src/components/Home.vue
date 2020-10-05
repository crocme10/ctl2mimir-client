<template>
  <div>
    <Indexes />
    <BragiStatus />
  </div>
</template>

<script>
import Indexes from '@/components/Indexes'
import BragiStatus from '@/components/BragiStatus'

export default {
  name: 'Home',
  components: {
    BragiStatus,
    Indexes
  }
}
</script>
