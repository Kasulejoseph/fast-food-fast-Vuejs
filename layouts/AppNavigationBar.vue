<template>
  <div>
    <nuxt />
    <nav class="navbar">
      <router-link to="/">
        <img class="dairynomics-logo" src="~@/assets/logo.svg">
      </router-link>
      <div class="navitems-container">
        <input id="toggle" type="checkbox">
        <label for="toggle" class="button" />

        <ul class="navbar-items">
          <li class="nav-item home-nav-icon">
            <router-link class="nav-link" to="/">
              <i class="fas fa-home" />
            </router-link>
          </li>

          <li class="nav-item bell-nav-icon" @click="handleNavIconClick">
            <a class="nav-link bell-nav-icon-link" href="#">
              <i class="far fa-bell bell-nav-icon-link" /></a>
            <DropDown
              :icon-dropdown-menu="bellIconDropdownMenu.body"
              :dropdown-shown="bellIconDropdownMenu.dropdownShown"
              :dropdown-class="bellIconDropdownClass"
            />
            <DropDown />
          </li>

          <li class="nav-item user-nav-icon" @click="handleNavIconClick">
            <a class="nav-link user-nav-icon-link" href="#">
              <i class="fas fa-user user-nav-icon-link" /></a>

            <DropDown
              :icon-dropdown-menu="userIconDropdownMenu.body"
              :dropdown-shown="userIconDropdownMenu.dropdownShown"
              :dropdown-class="userIconDropdownClass"
            />
            <DropDown />
          </li>
        </ul>
      </div>
    </nav>
    <!-- <user-auth v-if="showModal" @closeAuthModal="handleAuthModal"></user-auth> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DropDown from './DropDown.vue'
export default {
  name: 'AppNavigationBar',
  components: {
    DropDown
  },
  data() {
    return {
      showModal: false,
      userIconDropdownClass: 'user-icon-dropdown',
      bellIconDropdownClass: 'bell-icon-dropdown',
      userIconDropdownMenu: {
        body: [],
        dropdownShown: false,
        toggleClass: 'user-nav-icon-link'
      },

      bellIconDropdownMenu: {
        body: [{
          label: 'A new PIN has been sent to your Phone',
          to: '#',
          iconClass: 'fa fa-mobile'
        },
        {
          label: 'This notification has already been read',
          to: '#',
          iconClass: 'fa fa-clipboard'
        }],
        dropdownShown: false,
        toggleClass: 'bell-nav-icon-link'
      }
    }
  },
  computed: {
    ...mapActions({
      updateModalForm: 'updateModalForm'
    })
  },

  created() {
    const loggedIn = localStorage.getItem('token')
    const links = [
      {
        label: 'Login',
        to: '/login',
        iconClass: 'fa fa-user',
        name: 'login'
      },
      {
        label: 'Signup',
        to: '/signup',
        iconClass: 'fa fa-lock',
        name: 'signup'
      },
      {
        label: 'Log out',
        to: '/',
        iconClass: 'fa fa-power-off',
        name: 'logout'
      }
    ]
    if (loggedIn) {
      this.userIconDropdownMenu.body.push(links[2])
    } else {
      this.userIconDropdownMenu.body.push(links[0])
      this.userIconDropdownMenu.body.push(links[1])
    }
  },
  methods: {
    handleNavIconClick(event) {
      this.$emit('toggleDropdown', event, this.bellIconDropdownMenu, this.userIconDropdownMenu)
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 80px;
  line-height: 10px;
  position: relative;
  background-color: #FFF !important;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
}

.dairynomics-logo {
  width: 230px;
  margin-left: 60px;
}

.navbar-items {
  position: relative;
  right: 60px;
}
.navbar-items li {
  font-size: 20px;
  list-style: none;
  display: inline-block;
}

.navbar-items a {
  font-size: 20px;
  text-decoration: none;
  color: #000;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-nav-icon {
  border-radius: 50%;
  position: relative;
  width: 30px;
  height: 30px;
}

.user-nav-icon-link {
  background-color: #90B42E;
  text-align: center;
  border-radius: 50%
}

.user-nav-icon i {
  color: #FFF;
}

.home-nav-icon, .bell-nav-icon{
  margin-right: 45px
}

.hamburger-toggle-view, #toggle {
  display: none;
}

@media only screen and (max-width: 768px) {
  .navbar {
    margin: 0
  }
  .dairynomics-logo {
    width: 150px;
    margin-left: 2px;
  }
  .navbar-items {
    right: 0
  }
  .navbar-items a {
    width: 30px;
    height: 30px;
  }
  .navbar-items li {
    margin-right: 0
  }
  .navbar-items i {
    font-size: 80%;
  }
  .navitems-container {
    margin-right: -5px;
    margin-top: 1%;
    padding: 0;
    text-align: right;
  }
}

@media only screen and (max-width: 600px) {
  .dairynomics-logo {
    width: 140px;
    margin-left: 0px;
  }
  .navbar-items {
    right: 18px
  }
   .navbar-items i {
    font-size: 70%;
  }
   .hamburger-toggle-view{
    display: block;
    border: 1px solid;
    background-color: black
  }
}
</style>
