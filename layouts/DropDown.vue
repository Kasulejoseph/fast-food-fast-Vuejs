<template>
  <div>
    <nuxt />
    <div :class="dropdownClass">
      <ul v-if="dropdownShown">
        <li v-for="(menu, index) in iconDropdownMenu" :key="index">
          <i :class="menu.iconClass" />
          <a class="dropdown-trigger" @click="showAuthModal(menu.name)">
            {{ menu.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    iconDropdownMenu: {
      type: Array
    },
    dropdownShown: {
      type: Boolean,
      default: false
    },
    dropdownClass: {
      type: String
    }
  },
  data() {
    return {
      showModal: false
    }
  },

  methods: {
    showAuthModal(payload) {
      if (payload !== 'logout') {
        this.$nuxt.$emit('showModal', payload)
      } else {
        localStorage.clear()
        window.location.href = '/'
      }
    }
  }
}
</script>

<style scoped>
.user-icon-dropdown {
  background-color: #FFF;
  position: absolute;
  text-align: center;
  margin: 0;
  padding: 0;
  top: 62px;
  right: 0px;
  width: 120px;
  -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  z-index: 15;
}
.user-icon-dropdown ul {
  padding: 0px;
}
.user-icon-dropdown li {
  list-style: none;
  position: relative;
  padding: 12px;
}

.user-icon-dropdown li a:hover, .user-icon-dropdown li i:hover {
  color: #9acc24
}

.user-icon-dropdown li i {
  color:#cecece;
  font-size: 12px;
  position: absolute;
  left: 12%;
  top: 13px;
  bottom: 0px;
}

.user-icon-dropdown li:first-child:before{ /* the pointer tip */
  content: '';
  position: absolute;
  border-right: 12px solid transparent;
  border-left: 12px solid transparent;
  border-bottom: 12px solid #FFF;
  right: 4px;
  top: -12px;
  margin-left: -5px;
  filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.05));
}

.user-icon-dropdown li a {
  cursor:pointer;
  text-decoration: none;
  font-size: 15px;
  color: #959595;
  width: 100%;
  display: inline-block;
  text-align: left;
  margin-left: 30%
}

.bell-icon-dropdown {
  background-color: #FFF;
  position: absolute;
  text-align: center;
  margin: 0;
  padding: 0;
  top: 62px;
  right: 85px;
  width: 280px;
  -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  z-index: 15;
}
.bell-icon-dropdown ul {
  padding: 0px;
}
.bell-icon-dropdown li {
  list-style: none;
  position: relative;
  padding: 10px;
}

.bell-icon-dropdown li a:hover, .bell-icon-dropdown li i:hover {
  color: #9acc24
}

.bell-icon-dropdown li i {
  color:#cecece;
  font-size: 20px;
  position: absolute;
  left: 12%;
  top: 13px;
  bottom: 0px;
}

.bell-icon-dropdown li:first-child:before{ /* the pointer tip */
  content: '';
  position: absolute;
  border-right: 12px solid transparent;
  border-left: 12px solid transparent;
  border-bottom: 12px solid #FFF;
  right: 4px;
  top: -12px;
  margin-left: -5px;
  filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.05));
}

.bell-icon-dropdown li:first-child {
  border-bottom: 0.1px solid #ccc;
}

.bell-icon-dropdown li a {
  text-decoration: none;
  font-size: 13px;
  color: #959595;
  width: 80%;
  line-height: 15px;
  display: inline-block;
  text-align: left;
  margin-left: 25%
}

@media only screen and (max-width: 768px) {
  .bell-icon-dropdown li {
    list-style: none;
    position: relative;
    padding: 4px 2px;
    display: inline-block;
    width: 60%;
  }
  .bell-icon-dropdown {
    background-color: #FFF;
    position: absolute;
    text-align: center;
    margin: 0;
    padding: 0;
    top: 62px;
    right: 22px;
    width: 150px;
  }
  .bell-icon-dropdown li i {
    top: 30%;
    bottom: 0%;
    left: -5%;
    border-bottom: 0.1px solid #ccc;
  }
  .bell-icon-dropdown li a {
    font-size: 9px;
    vertical-align: middle;
    width: 100%;
  }

.bell-icon-dropdown li:first-child:before{ /* the pointer tip */
    content: '';
    position: absolute;
    border-right: 12px solid transparent;
    border-left: 12px solid transparent;
    border-bottom: 12px solid #FFF;
    right: -15px;
    top: -12px;
    margin-left: -5px;
    filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.05));
  }
  .user-icon-dropdown {
    top: 62px;
    right: -5px;
    width: 120px;
    -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
  }
  .user-icon-dropdown li {
    padding: 6px;
  }

  .user-icon-dropdown li a {
    font-size: 60%;
    vertical-align: middle;
  }

  .user-icon-dropdown li i {
    color:#cecece;
    font-size: 12px;
    position: absolute;
    left: 12%;
    top: 5px;
  }

  .user-icon-dropdown li:first-child:before{ /* the pointer tip */
    content: '';
    position: absolute;
    border-right: 12px solid transparent;
    border-left: 12px solid transparent;
    border-bottom: 12px solid #FFF;
    right: 4px;
    top: -12px;
    margin-left: -5px;
    filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.05));
  }
}

</style>
