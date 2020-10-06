<template>
  <div>
    <Indexes />
    <BragiStatus />
    <BragiAutocomplete />
  </div>
</template>

<script>
import Indexes from '@/components/Indexes'
import BragiStatus from '@/components/BragiStatus'
import BragiAutocomplete from '@/components/BragiAutocomplete'

export default {
  name: 'Home',
  components: {
    BragiAutocomplete,
    BragiStatus,
    Indexes
  }
}
</script>
