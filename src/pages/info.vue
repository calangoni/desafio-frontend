<template>
  <div>
    <div style="background-color: #2c3e50; height: 300px; position: relative;"></div>
    <q-btn id="backbutton" round icon="fas fa-angle-left" color="white" text-color="black" size="sm" @click="$router.push('/')" />
    <div id="infocard" class="shadow-2" v-if="candidate">
      <div style="background-color: #f2f2f2; height: 150px; border-radius: 5px 5px 0 0; border: 2px solid #dfdfdf; border-width: 0 0 2px 0; position: relative;"></div>
      <div id="infocardphoto" class="flex justify-center items-center">
        <q-spinner v-if="loadingImage" color="teal-4" size="40px" />
        <img @load="() => { loadingImage = false }" :class="{hidden: loadingImage}" style="border-radius: 50%; width: 97%; height: 97%;" :src="candidate.picture.large" alt="">
      </div>
      <div class="firstLine">{{firstLine[displayedInfoIndex]}}</div>
      <div class="secondLine">{{secondLine}}</div>
      <div class="row justify-center" style="font-size: 220%;">
        <a @mouseenter="selecionar('person')"><q-icon :class="{cursorLink: true, activeInfo: displayedInfoIndex === 0}" name="far fa-user" /></a>
        <span class="iconSpacing"></span>
        <a @mouseenter="selecionar('email')"><q-icon :class="{cursorLink: true, activeInfo: displayedInfoIndex === 1}" name="far fa-envelope" /></a>
        <span class="iconSpacing"></span>
        <a @mouseenter="selecionar('date')"><q-icon :class="{cursorLink: true, activeInfo: displayedInfoIndex === 2}" name="far fa-calendar-alt" /></a>
        <span class="iconSpacing"></span>
        <a @mouseenter="selecionar('location')"><q-icon :class="{cursorLink: true, activeInfo: displayedInfoIndex === 3}" name="map" /></a>
        <span class="iconSpacing"></span>
        <a @mouseenter="selecionar('phone')"><q-icon :class="{cursorLink: true, activeInfo: displayedInfoIndex === 4}" name="phone" /></a>
        <span class="iconSpacing"></span>
        <a @mouseenter="selecionar('secret')"><q-icon :class="{cursorLink: true, activeInfo: displayedInfoIndex === 5}" name="vpn_key" /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      candidate: null,
      firstLine: [
        'Hi, My name is',
        'My email address is',
        'My birthday is',
        'My address is',
        'My phone number is',
        'My password is'
      ],
      secondLine: '',
      displayedInfoIndex: 0,
      loadingImage: false
    }
  },
  mounted () {
    /* eslint-disable */
    // console.log('this.$store.state', this.$store.state)
    // console.log('this.$store.state keys', Object.keys(this.$store.state))
    // console.log('this.$store.state.example', this.$store.state.example)
    // console.log('this.$store.state.person', this.$store.state.person)
    // console.log('this.$store.state.example.person', this.$store.state.example.person)
    this.candidate = this.$store.state.example.person
    if (!this.candidate) {
      this.$router.push('/')
      return
    }
    this.loadingImage = true
    this.selecionar('person')
  },
  methods: {
    selecionar (type) {
      if (type === 'person') {
        this.displayedInfoIndex = 0
        this.secondLine = this.candidate.name.full
      }
      else if (type === 'email') {
        this.displayedInfoIndex = 1
        this.secondLine = this.candidate.email
      }
      else if (type === 'date') {
        this.displayedInfoIndex = 2
        this.secondLine = this.candidate.dob.toLocaleDateString()
      }
      else if (type === 'location') {
        this.displayedInfoIndex = 3
        this.secondLine = this.candidate.location.street
      }
      else if (type === 'phone') {
        this.displayedInfoIndex = 4
        this.secondLine = this.candidate.phone
      }
      else if (type === 'secret') {
        this.displayedInfoIndex = 5
        this.secondLine = this.candidate.login.password
      }
      else {
        this.displayedInfoIndex = 0
        this.secondLine = this.candidate.name.first
      }
    }
  }
}
</script>

<style lang="stylus">
  .cursorLink
    cursor pointer !important

  #infocard
    position: absolute
    left: 0
    right: 0
    top: 100px
    margin-left: auto
    margin-right: auto
    width: 800px
    background-color: white
    height: 440px
    border-radius: 5px

  #backbutton
    position: absolute
    left: 25px
    top: 25px

  #infocardphoto
    position: absolute
    left: 0
    right: 0
    top: 30px
    margin-left: auto
    margin-right: auto
    width: 200px
    height: 200px
    border: 1px solid grey
    background-color white
    border-radius: 50%

  .activeInfo
    color var(--q-color-secondary)

  .firstLine
    color #9b9b9b
    font-size: 120%
    text-align: center
    padding-top: 100px

  .secondLine
    color: #4e4e4e
    font-size: 200%
    font-weight: 500
    text-align: center
    padding-bottom: 40px

  .iconSpacing
    width: 30px

</style>
