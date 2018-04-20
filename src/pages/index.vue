<template>
  <q-layout view="hHh Lpr fff">

    <q-layout-header>
      <q-toolbar color="primary" class="row justify-between" style="height: 70px;">
        <div>
          <img src="statics/logoZup.png" style="margin-top: 10px;">
        </div>
        <div>
          <q-search id="searchbar" inverted color="white" v-model="textSearch" :debounce="300" style="width: 700px;" />
        </div>
        <div>
          <q-icon name="account_circle" />
        </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawer" content-class="bg-white">
      <q-list no-border link inset-delimiter>
        <q-item link to="/list/all" :class="{activeList: $route.params.type === 'all'}">
          <q-item-side icon="select_all" />
          <q-item-main label="Todos" />
        </q-item>
        <q-item link to="/list/done" :class="{activeList: $route.params.type === 'done'}">
          <q-item-side icon="done_all" />
          <q-item-main label="Atendidos" />
        </q-item>
        <q-item link to="/list/deleted" :class="{activeList: $route.params.type === 'deleted'}">
          <q-item-side icon="delete_sweep" />
          <q-item-main label="Lixeira" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="flex flex-center">

      <div style="width: 1000px; max-width: 90vw; margin-top: 60px; color: #ababab;" class="shadow-2 flex">
        <div v-for="person in candidates" :key="person.email" class="row person-row items-center no-wrap bg-white">
          <div class="col-1">
            <img style="border-radius: 50%; margin-left: 10px; margin-top: 3px;" :src="person.picture.thumbnail" :alt="person.name.first">
          </div>
          <div class="col-2" style="color: black; font-size: 105%;"><a @click="viewDetails(person)">{{person.name.full}}</a></div>
          <div class="col-3">{{person.email}}</div>
          <div class="col-2">{{person.phone}}</div>
          <div class="col">{{person.location.city + '-' + person.location.state}}</div>
          <div class="col-auto justify-between row inline" style="font-size: 120%;">
            <span style="width: 10px;"></span>
            <a @click="onClickTrash(person)"><q-icon name="delete" class="cursorLink" /></a>
            <span style="width: 10px;"></span>
            <a @click="onClickAll(person)"><q-icon name="select_all" class="cursorLink" /></a>
            <span style="width: 10px;"></span>
            <a @click="onClickDone(person)"><q-icon name="check" class="cursorLink" /></a>
            <span style="width: 10px;"></span>
          </div>
        </div>
      </div>

    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      leftDrawer: true,
      textSearch: '',
      candidates: []
    }
  },
  mounted () {
    // https://randomuser.me/api/?page=3&results=5&seed=abc&nat=br
    /* eslint-disable */
    const response = {"results":[{"gender":"male","name":{"title":"mr","first":"jovelino","last":"freitas"},"location":{"street":"5825 rua rui barbosa ","city":"aparecida de goiânia","state":"pernambuco","postcode":65891},"email":"jovelino.freitas@example.com","login":{"username":"organicbutterfly786","password":"fender","salt":"bDS9jzK3","md5":"0fdf5d6de0dcaf01bf395a486d585301","sha1":"cc6d6eb53dd27a06058012673b5d5cc61e33a2e6","sha256":"73ebd6520ff65fc60ae729472ec7d24d6ad303ed4c37a867fcb410fb1aab0afd"},"dob":"1948-08-24 03:26:34","registered":"2007-11-18 04:39:16","phone":"(00) 6832-0490","cell":"(04) 7684-3316","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/62.jpg","medium":"https://randomuser.me/api/portraits/med/men/62.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/62.jpg"},"nat":"BR"},{"gender":"female","name":{"title":"mrs","first":"lizaine","last":"porto"},"location":{"street":"8482 rua tiradentes ","city":"taboão da serra","state":"paraíba","postcode":47338},"email":"lizaine.porto@example.com","login":{"username":"blackgoose398","password":"jared","salt":"1hwIgS3J","md5":"73611cfd33d7198844be2b69d94b4848","sha1":"32cbbbc8f54490f851a7f46bb6e9d20259059fff","sha256":"2adab03879cb916a22b28054a9666e72c0b8e0b871530e92d709d53a249f7eaa"},"dob":"1956-10-22 13:58:46","registered":"2008-06-05 20:40:24","phone":"(24) 7295-8956","cell":"(72) 7069-6763","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/27.jpg","medium":"https://randomuser.me/api/portraits/med/women/27.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/27.jpg"},"nat":"BR"},{"gender":"male","name":{"title":"mr","first":"ovídio","last":"peixoto"},"location":{"street":"8660 rua sete de setembro ","city":"cabo de santo agostinho","state":"paraná","postcode":59280},"email":"ovídio.peixoto@example.com","login":{"username":"bluecat482","password":"squirrel","salt":"YGG3WgPx","md5":"38ea5bfc0d8cd34956663da5ed10fcf0","sha1":"d325827cd6e7b20db4180a0041bc64b7635b7a8b","sha256":"1e68464b2bc380aeeb33efbf1b44f5a8365324229b84b1203f33b44039215ef6"},"dob":"1990-07-29 05:57:08","registered":"2014-05-26 18:49:33","phone":"(52) 6737-2219","cell":"(03) 0626-5506","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/70.jpg","medium":"https://randomuser.me/api/portraits/med/men/70.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/70.jpg"},"nat":"BR"},{"gender":"male","name":{"title":"mr","first":"madaleno","last":"carvalho"},"location":{"street":"8584 rua castro alves ","city":"curitiba","state":"piauí","postcode":45237},"email":"madaleno.carvalho@example.com","login":{"username":"crazyrabbit772","password":"northern","salt":"q3Ihspr4","md5":"b26f1a0103f1421ea3ae99255a0e93a5","sha1":"1cbb88b3ccd4c38fecbb5c742b440ebc127c33d9","sha256":"18a70ea21392b24db044fee5587ee1d9c8022d75c3aaee8fbe18607d5d27f636"},"dob":"1974-08-05 03:06:15","registered":"2006-05-11 20:22:23","phone":"(97) 9861-9862","cell":"(17) 6998-4650","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/75.jpg","medium":"https://randomuser.me/api/portraits/med/men/75.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/75.jpg"},"nat":"BR"},{"gender":"male","name":{"title":"mr","first":"adão","last":"vieira"},"location":{"street":"7632 rua boa vista ","city":"catanduva","state":"sergipe","postcode":69658},"email":"adão.vieira@example.com","login":{"username":"blueladybug672","password":"bauhaus","salt":"PcIPoZJz","md5":"a75cede21d71adeb83c529811d1ad6fb","sha1":"1b5903538d53d29363e40b39d14e7154c51bb819","sha256":"8e59c21270fd94f2d1aa21dd85d4b6c1dd31614801931b34cd2c614fd771839f"},"dob":"1989-10-19 12:49:15","registered":"2014-04-10 21:28:15","phone":"(26) 9829-2258","cell":"(44) 2937-1262","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/53.jpg","medium":"https://randomuser.me/api/portraits/med/men/53.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/53.jpg"},"nat":"BR"}],"info":{"seed":"abc","results":5,"page":3,"version":"1.1"}}
    for (const person of response.results) {
      this.preparePersonData(person)
    }
    this.candidates = response.results
  },
  methods: {
    viewDetails (person) {
      this.$store.commit('example/setPerson', person)
      this.$router.push('/info')
    },

    preparePersonData (person) {
      person.name.first = person.name.first[0].toUpperCase() + person.name.first.substr(1)
      person.name.last = person.name.last[0].toUpperCase() + person.name.last.substr(1)
      person.name.full = person.name.first + ' ' + person.name.last
      person.location.city = person.location.city[0].toUpperCase() + person.location.city.substr(1)
      person.dob = new Date(person.dob)
    },

    onClickAll (person) {
      console.log('###########################################')
      // console.log(this.$router.push)
      // this.$router.push('outro')
    },
    onClickDone (person) {
      console.log('###########################################')
      // @click="$router.push('/list/done')"
    },
    onClickTrash (person) {
      console.log('###########################################')
      // @click="$router.push('/list/deleted')"
    },
    selecionar (type) {
      console.log('Trocar: ' + type)
    }
  }
}
</script>

<style lang="stylus">
  .person-row
    border 1px solid #e0e0e0
    width 100%
    height 70px

  .activeList
    background-color white !important
    color var(--q-color-secondary)
    .q-item-side
      color var(--q-color-secondary)

  .cursorLink
    cursor pointer !important

  #searchbar
    color black !important

  #searchbar ::placeholder
    color black !important

  #searchbar i
    color var(--q-color-secondary) !important

  div#searchbar
    border-radius: 100px
</style>
