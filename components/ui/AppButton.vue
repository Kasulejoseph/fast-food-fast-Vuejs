<template>
  <button :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'AppButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
button:disabled {
  background-color: #e1e1e1;
  cursor: not-allowed;
}

button {
  background-color: #88af00;
  text-align: center;
  color: #fff;
  padding: 0.6rem 0;
  width: 19rem;
  border-radius: 0.3rem;
  outline: none;
  border: none;
  font-size: 1rem;
  transition: background-color 0.8s ease-in-out;
}

button:hover {
  opacity: 0.9;
}

@media only screen and (max-width: 500px) {
  button {
    width: 14rem;
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }
}
</style>
