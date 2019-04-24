<template>
  <div class="share-container">
    <nuxt />
    <p class="share-message">
      Share with my friends
    </p>
    <div class="share-icon-group">
      <fa class="facebook-icon" icon="coffee" @click="createCanvasImage()">
        <i class="fab fa-facebook-square" style="color:#2E40A8" />
      </fa>
      <!-- <div @click="yy()"> -->
      <social-sharing
        url="https://deploy-preview-16--dairynomics.netlify.com/first-calving"
        image="https://i.ibb.co/12Jz5cy/background-img.png"
        :title="twitterTitle"
        description="You will leave here a better farmer, We promise."
        quote="dairynomics"
        hashtags="farm,Dairynomics,Cows"
        twitter-user=""
        inline-template
      >
        <div class="share-icons">
          <network network="twitter">
            <fa class="fab fa-twitter" icon="edit" style="color:#06B0E9" />
          </network>
          <network class="pl-3" network="whatsapp">
            <fa icon="dollar-sign" class="fab fa-whatsapp" style="color:#557D38" />
          </network>
        </div>
      </social-sharing>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SocialMediaShare',
  props: {
    farmPerformance: {
      type: Object
    },
    shareText: {
      type: String
    }
  },
  data() {
    return {
      img: '',
      title: '',
      description: '',
      uploadedShareImage: ''
    }
  },
  head () {
    return {
      title: console.log(this.twitterTitle),
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'og:description', name: 'og:description', content: this.twitterTitle },
        { hid: 'description', name: 'description', content: this.twitterTitle }
      ]
    }
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    // all titles will be injected into this template
    meta: [
      {
        'property': 'og:instagram',
        'content': 'This is instagram'
      }
    ]
  },
  // beforeCreate () {
  //   console.log('before each', this.img)
  // },
  computed: {
    ...mapGetters({
      shareGetterData: 'shareGetterData'
    }),
    twitterTitle() {
      return `Amazing! My farm's performance is ${this.farmPerformance.result}. ${this.shareText}.`
    }
  },
  created() {
    const imageEl = document.querySelector('head meta[property="og:image"]')
    // console.log(this)
    // const titleEl = document.querySelector('head title')
    imageEl.setAttribute('content', 'https://i.ibb.co/12Jz5cy/background-img.png')
    // titleEl.textContent = 'kasule is bad'
    // console.log('created', this)
    // this.fillCanvas(this.img)
  },
  mounted() {
    // get image
    this.img = new Image()
    this.img.src = require(`@/assets/shareimage.png`)
    // console.log(this.img)
    this.img.setAttribute('crossOrigin', 'anonymous')
    // this.createCanvasImage()
  },
  methods: {
    yy() {
      // console.log('clicked.....')
      const tobj = this.$route.meta.metaTags
      Object.keys(tobj).forEach((key) => {
        if (tobj[key].property === 'og:description') {
          tobj[key].content = 'This decription has been changed....'
        }
        // console.log(tobj[key])
      })
      // console.log('yfgefbhf', this.$route.meta.metaTags)
      // add a temporary variable
      this.$router.replace({ query: { temp: Date.now() } })
      // remove the temporary variable query
      this.$router.replace({ query: { temp: undefined } })
    },
    // canvas Image //
    DrawText() {
      const canvas = document.querySelector('canvas')
      const c = canvas.getContext('2d')
      c.fillStyle = '#520112'
      c.textBaseline = 'middle'
      c.font = 'bold 200px Comfortaa'
      c.fillText('Amazing!', 900, 400)
      c.font = '90px Comfortaa'
      const performanceTextShare = `My farm's performance is ${
        this.farmPerformance.result
      }`
      c.fillText(performanceTextShare, 900, 580)
      c.fillText(this.shareText, 900, 700)
    },
    fillCanvas(img) {
      const canvas = document.querySelector('canvas')
      const c = canvas.getContext('2d')
      // create canvas context
      canvas.width = img.width
      canvas.height = img.height
      c.fillStyle = 'rgb(255, 0, 0, 0.4)'
      // c.fillRect(100, 100, 100, 100);
      c.fillStyle = 'rgba(30, 144, 255, 0.4)'
      c.fillRect(0, 0, canvas.width, canvas.height)
      c.drawImage(img, 0, 0)
      this.DrawText()
    },
    createCanvasImage() {
      // this.$forceUpdate()
      // wait till the image is loaded
      this.fillCanvas(this.img) // fill the canvas with image
      const canvas = document.querySelector('canvas')
      const imageDataUrl = canvas.toDataURL('image/png')
      // Usage example:
      this.$store.dispatch('imageUpload', imageDataUrl)
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'UPLOAD_SHARE_IMAGE') {
          // const imageEl = document.querySelector('head meta[property="og:image"]')
          // console.log(this)
          // // const titleEl = document.querySelector('head title')
          // imageEl.setAttribute('content', 'https://i.ibb.co/12Jz5cy/background-img.png888888888')
          this.submitAndShare()
        }
        // console.log('------------>', mutation.payload)
      })
      // this.imageUpload(y2)
    },
    // canvas end //
    shareOverrideOGMeta(overrideTitle, overrideDescription, overrideImage) {
      /* global FB */
      FB.ui(
        {
          method: 'share',
          href: 'https://deploy-preview-16--dairynomics.netlify.com/',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: {
              'og:title': overrideTitle,
              'og:description': overrideDescription,
              'og:image': overrideImage
            }
          })
        },
        function (response) {
          // console.log(response)
        }
      )
    },
    submitAndShare() {
      // get content to share
      // // console.log(
      //   'called trufy',
      //   this.shareGetterData.sharedImage,
      //   '++++++++='
      // )
      let image = ''
      this.title = 'Is your farm performing well?'
      this.description =
        "Find out your farm's performance and how to improve it on Dairynomics"
      image = this.shareGetterData.sharedImage
      this.shareOverrideOGMeta(this.title, this.description, image)
    }
  }
}
</script>

<style scoped>
.share-container {
  position: relative;
  font-size: 90%;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.share-icon-group {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  flex-direction: row;
}
.facebook-icon {
  text-decoration: none;
  font-size: 1.3rem;
  color: inherit;
  cursor: pointer;
}
.share-icons {
  text-decoration: none;
  color: inherit;
  font-size: 1.3rem;
  margin: 0% 4%;
  cursor: pointer;
}
.share-icons i {
  font-size: 130%;
}
.share-icons a {
  text-decoration: none;
  color: inherit;
  margin: 0% 1%;
}
</style>
