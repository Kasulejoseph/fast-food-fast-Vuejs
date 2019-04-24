<template>
  <div class="meter-container" :style="{height: size + 'px'}">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :height="SVGSize" :width="SVGSize">
      <circle
        stroke="#199c4a"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        fill="white"
        :r="SVGRadius"
        :cx="SVGCenterX"
        :cy="SVGCenterY"
      />
      <text
        :x="SVGCenterX"
        :y="SVGCenterY + 3"
        text-anchor="middle"
        alignment-baseline="middle"
        :font-family="fontFamily"
        :font-size="fontSize"
        fill="#199c4a"
      >
        {{ measure }}{{ unit }}
      </text>
    </svg>
    <img :src="require(`@/assets/${imageName}`)" :width="size">
  </div>
</template>
<script>
export default {
  name: 'PerformanceMeter',

  props: {
    maximumPossibleValue: {
      default: 100
    },

    minimumPossibleValue: {
      default: 0
    },

    reverse: {
      default: false
    },

    performance: {
      required: true
    },

    strokeWidth: {
      required: true
    },

    fontSize: {
      required: true
    },

    size: {
      required: true
    },

    fontFamily: {
      type: String
    },

    imageName: {
      type: String,
      required: true
    },

    unit: {
      type: String,
      default: ''
    }
  },

  data() {
    const SVGSize = this.size / 2
    const SVGCenterX = SVGSize / 2
    const SVGCenterY = SVGCenterX
    const SVGRadius = SVGCenterX - this.strokeWidth
    const circumference = SVGRadius * 2 * Math.PI

    return {
      SVGSize,
      SVGCenterX,
      SVGCenterY,
      SVGRadius,
      circumference,
      measure: -1
    }
  },

  computed: {
    maximumPossibleValueToNumber() {
      return parseInt(this.maximumPossibleValue, 10)
    },

    minimumPossibleValueToNumber() {
      return parseInt(this.minimumPossibleValue, 10)
    },

    reverseValue() {
      return this.circumference - (this.maximumPossibleValueToNumber - this.measure) / this.minimumPossibleValueToNumber * this.circumference
    },

    forwardValue() {
      return this.circumference - this.measure / this.maximumPossibleValueToNumber * this.circumference
    },

    strokeDashoffset() {
      return this.reverse ? this.reverseValue : this.forwardValue
    }
  },

  mounted() {
    const interval = setInterval(() => {
      this.measure += 1
      if (this.measure >= this.performance) {
        clearInterval(interval)
      }
    }, 30)
  }
}
</script>

<style scoped>
  .meter-container {
    position: relative;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  svg, img {
    position: absolute;
  }

  svg {
    z-index: 2;
     transform: translateY(-50%);
  }
  circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
