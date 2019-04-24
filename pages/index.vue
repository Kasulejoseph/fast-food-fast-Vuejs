<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >
    <AppNavigationBar @toggleDropdown="handleDropdownToggle" />
    <userAuth />
    <router-view />
  </div>
</template>

<script>
import AppNavigationBar from '@/layouts/AppNavigationBar.vue'
import userAuth from '@/components/userAuth/UserAuth.vue'
import titleMixin from '@/layouts/mixins/titleMixins.js'
export default {
  name: 'App',
  components: {
    AppNavigationBar,
    userAuth
  },
  mixins: [titleMixin],
  title() {
    return 'this.item.title'
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    // title: 'Default Title',
    // all titles will be injected into this template
    // titleTemplate: '%s | My Awesome Webappp',
    // meta: [
    //   {
    //     'property': 'og:title',
    //     'content': console.log('from meta', this)
    //   }
    // ]
  },
  data() {
    return {
      dropdownShown: false
    }
  },
  // beforeCreate() {
  //   // console.log(this)
  //   /// left trying to force update of the el to pick me metas
  //   // this.$forceUpdate()
  //   const imageEl = document.querySelector('head meta[property="og:image"]')
  //   // const titleEl = document.querySelector('head title')
  //   imageEl.setAttribute('content', 'this.img')
  //   // titleEl.textContent = 'kasule is bad'
  //   // console.log(imageEl)
  // },
  updated() {
    // console.log('BEFORE UPDATED', this)
    const imageEl = document.querySelector('head meta[property="og:image"]')
    // const titleEl = document.querySelector('head title')
    imageEl.setAttribute('content', 'this.img444444')
    // titleEl.textContent = 'kasule is bad'
    // console.log(imageEl)
  },
  methods: {
    handleDropdownToggle(event, firstMenu, secondMenu) {
      if (event.target.className.includes(firstMenu.toggleClass)) {
        secondMenu.dropdownShown = false
        firstMenu.dropdownShown = !firstMenu.dropdownShown
      } else if (event.target.className.includes(secondMenu.toggleClass)) {
        firstMenu.dropdownShown = false
        secondMenu.dropdownShown = !secondMenu.dropdownShown
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Comfortaa-Regular";
  src: url("~@/assets/Comfortaa-Regular.ttf");
}

@font-face {
  font-family: "Comfortaa-Light";
  src: url("~@/assets/Comfortaa-Light.ttf");
}

@font-face {
  font-family: "Comfortaa-Bold";
  src: url("~@/assets/Comfortaa-Bold.ttf");
}

#app {
  font-family: "Comfortaa-Bold", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  font-family: "Comfortaa-Bold", "Avenir", Helvetica, Arial, sans-serif;
  background-image: url("~@/assets/background-img.png");
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
@media only screen and (min-width: 411px) and (max-width: 823px) and (-webkit-device-pixel-ratio: 3.5) and (orientation: portrait) {
  body {
    background-position-y: 6rem;
  }
}
</style>
