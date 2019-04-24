<template>
  <div>
    <canvas />
    <PerformanceMeter
      :performance="farmPerformance.performance"
      stroke-width="4"
      font-size="19"
      font-family="consolas"
      size="150"
      image-name="calf.svg"
      maximum-possible-value="40"
      minimum-possible-value="24"
      reverse="true"
    />

    <h3>{{ farmPerformance.result }}</h3>
    <p class="composition">
      {{ farmPerformance.message }}
    </p>
    <AppButton>Help me improve &#x2192;</AppButton>
    <div v-if="showIcons" class="mt-3">
      <SocialMediaShare
        :farm-performance="farmPerformance"
        :share-text="this.shareText"
      />
    </div>
  </div>
</template>

<script>
import PerformanceMeter from '@/components/ui/PerformanceMeter'
import AppButton from '@/components/ui/AppButton'
import performanceHelper from '@/utils/performance/calvingPerformance'
import SocialMediaShare from '@/layouts/SocialMediaShare'
import { displayIconMixins } from '@/layouts/mixins/showHideShareIconMixins.js'

const computePerformance = (ageOfCalving) => {
  const performance = ageOfCalving
  return performanceHelper(performance)
}

export default {
  name: 'CalvingResult',
  components: {
    PerformanceMeter,
    AppButton,
    SocialMediaShare
  },
  mixins: [displayIconMixins],
  props: {
    ageOfCalving: {
      type: Number,
      required: true
    }
  },
  data() {
    this.disabled = ''
    const farmPerformance = computePerformance(this.ageOfCalving)
    return { shareText: `My calving age is ${this.ageOfCalving} month`, farmPerformance }
  }
}
</script>

<style scoped>
  * {
    color:#580010;
    box-sizing: border-box;
    line-height: 1.6;
  }

  .info-message {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
    min-width: 13rem;
    max-width: 25rem;
    width: 70%;
    margin: 0 auto 1rem;
  }
    @media only screen and (max-width: 400px) {
    h2 {
      font-size: 1.7rem;
    }
  }
  canvas {
    display: none;
    font-family: 'Comfortaa', cursive;
  }
</style>
