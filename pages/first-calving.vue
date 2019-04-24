<template>
  <div>
    <transition name="fade" appear>
      <BaseCalving
        v-if="stage==='BaseCalving'"
        class="positioning"
        :age-of-calving="ageOfCalving"
        @submit="CalvingResult"
      />
      <CalvingResult
        v-else-if="stage==='CalvingResult'"
        class="positioning"
        :age-of-calving="ageOfCalving"
      />
    </transition>
  </div>
</template>
<script>
import BaseCalving from '@/components/BaseCalving.vue'
import CalvingResult from '@/components/CalvingResult.vue'

export default {
  name: 'FirstCalvingPage',
  components: {
    BaseCalving,
    CalvingResult
  },
  data() {
    return {
      ageOfCalving: 0,
      stage: 'BaseCalving'
    }
  },

  methods: {
    CalvingResult(ageOfCalving) {
      this.ageOfCalving = ageOfCalving
      this.stage = 'CalvingResult'
    }
  }
}
</script>

<style scoped>
  * {
    text-align: center;
  }
  .positioning {
    position: absolute;
    width: 100%;
    overflow: hidden;
    padding: 6% 1.25rem;
  }

  /* TRANSITION */

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 1.4s ease-in;
  }
</style>
