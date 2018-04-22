<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // https://randomuser.me/api/?page=3&results=5&seed=abc&nat=br
    /* eslint-disable */
    const response_old = {"results":[{"gender":"male","name":{"title":"mr","first":"jovelino","last":"freitas"},"location":{"street":"5825 rua rui barbosa ","city":"aparecida de goiânia","state":"pernambuco","postcode":65891},"email":"jovelino.freitas@example.com","login":{"username":"organicbutterfly786","password":"fender","salt":"bDS9jzK3","md5":"0fdf5d6de0dcaf01bf395a486d585301","sha1":"cc6d6eb53dd27a06058012673b5d5cc61e33a2e6","sha256":"73ebd6520ff65fc60ae729472ec7d24d6ad303ed4c37a867fcb410fb1aab0afd"},"dob":"1948-08-24 03:26:34","registered":"2007-11-18 04:39:16","phone":"(00) 6832-0490","cell":"(04) 7684-3316","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/62.jpg","medium":"https://randomuser.me/api/portraits/med/men/62.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/62.jpg"},"nat":"BR"},{"gender":"female","name":{"title":"mrs","first":"lizaine","last":"porto"},"location":{"street":"8482 rua tiradentes ","city":"taboão da serra","state":"paraíba","postcode":47338},"email":"lizaine.porto@example.com","login":{"username":"blackgoose398","password":"jared","salt":"1hwIgS3J","md5":"73611cfd33d7198844be2b69d94b4848","sha1":"32cbbbc8f54490f851a7f46bb6e9d20259059fff","sha256":"2adab03879cb916a22b28054a9666e72c0b8e0b871530e92d709d53a249f7eaa"},"dob":"1956-10-22 13:58:46","registered":"2008-06-05 20:40:24","phone":"(24) 7295-8956","cell":"(72) 7069-6763","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/27.jpg","medium":"https://randomuser.me/api/portraits/med/women/27.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/27.jpg"},"nat":"BR"},{"gender":"male","name":{"title":"mr","first":"ovídio","last":"peixoto"},"location":{"street":"8660 rua sete de setembro ","city":"cabo de santo agostinho","state":"paraná","postcode":59280},"email":"ovídio.peixoto@example.com","login":{"username":"bluecat482","password":"squirrel","salt":"YGG3WgPx","md5":"38ea5bfc0d8cd34956663da5ed10fcf0","sha1":"d325827cd6e7b20db4180a0041bc64b7635b7a8b","sha256":"1e68464b2bc380aeeb33efbf1b44f5a8365324229b84b1203f33b44039215ef6"},"dob":"1990-07-29 05:57:08","registered":"2014-05-26 18:49:33","phone":"(52) 6737-2219","cell":"(03) 0626-5506","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/70.jpg","medium":"https://randomuser.me/api/portraits/med/men/70.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/70.jpg"},"nat":"BR"},{"gender":"male","name":{"title":"mr","first":"madaleno","last":"carvalho"},"location":{"street":"8584 rua castro alves ","city":"curitiba","state":"piauí","postcode":45237},"email":"madaleno.carvalho@example.com","login":{"username":"crazyrabbit772","password":"northern","salt":"q3Ihspr4","md5":"b26f1a0103f1421ea3ae99255a0e93a5","sha1":"1cbb88b3ccd4c38fecbb5c742b440ebc127c33d9","sha256":"18a70ea21392b24db044fee5587ee1d9c8022d75c3aaee8fbe18607d5d27f636"},"dob":"1974-08-05 03:06:15","registered":"2006-05-11 20:22:23","phone":"(97) 9861-9862","cell":"(17) 6998-4650","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/75.jpg","medium":"https://randomuser.me/api/portraits/med/men/75.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/75.jpg"},"nat":"BR"},{"gender":"male","name":{"title":"mr","first":"adão","last":"vieira"},"location":{"street":"7632 rua boa vista ","city":"catanduva","state":"sergipe","postcode":69658},"email":"adão.vieira@example.com","login":{"username":"blueladybug672","password":"bauhaus","salt":"PcIPoZJz","md5":"a75cede21d71adeb83c529811d1ad6fb","sha1":"1b5903538d53d29363e40b39d14e7154c51bb819","sha256":"8e59c21270fd94f2d1aa21dd85d4b6c1dd31614801931b34cd2c614fd771839f"},"dob":"1989-10-19 12:49:15","registered":"2014-04-10 21:28:15","phone":"(26) 9829-2258","cell":"(44) 2937-1262","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/53.jpg","medium":"https://randomuser.me/api/portraits/med/men/53.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/53.jpg"},"nat":"BR"}],"info":{"seed":"abc","results":5,"page":3,"version":"1.1"}}
    this.$axios({method: 'get', url: 'https://randomuser.me/api/?page=1&results=83&seed=abc&nat=br'}).then((response) => {
      for (const person of response.data.results) {
        this.preparePersonData(person)
      }
      this.$store.commit('example/setAllCandidates', response.data.results)
    })
    .catch((response) => {
      alert('There was a connection error')
    })
  },
  methods: {
    preparePersonData (person) {
      person.name.first = person.name.first[0].toUpperCase() + person.name.first.substr(1)
      person.name.last = person.name.last[0].toUpperCase() + person.name.last.substr(1)
      person.name.full = person.name.first + ' ' + person.name.last
      person.location.city = person.location.city[0].toUpperCase() + person.location.city.substr(1)
      person.dob = new Date(person.dob)
      person.searchTerms = (person.name.first + ' ' + person.name.last + '\n' + person.email).toLowerCase()
      person.listing = '' // C = checked, T = trash
      if (person.location.state === 'acre') person.location.state = 'AC'
      else if (person.location.state === 'alagoas') person.location.state = 'AL'
      else if (person.location.state === 'amapá') person.location.state = 'AP'
      else if (person.location.state === 'amazonas') person.location.state = 'AM'
      else if (person.location.state === 'bahia') person.location.state = 'BA'
      else if (person.location.state === 'ceará') person.location.state = 'CE'
      else if (person.location.state === 'distrito federal') person.location.state = 'DF'
      else if (person.location.state === 'espírito santo') person.location.state = 'ES'
      else if (person.location.state === 'goiás') person.location.state = 'GO'
      else if (person.location.state === 'maranhão') person.location.state = 'MA'
      else if (person.location.state === 'mato grosso') person.location.state = 'MT'
      else if (person.location.state === 'mato grosso do sul') person.location.state = 'MS'
      else if (person.location.state === 'minas gerais') person.location.state = 'MG'
      else if (person.location.state === 'pará') person.location.state = 'PA'
      else if (person.location.state === 'paraíba') person.location.state = 'PB'
      else if (person.location.state === 'paraná') person.location.state = 'PR'
      else if (person.location.state === 'pernambuco') person.location.state = 'PE'
      else if (person.location.state === 'piauí') person.location.state = 'PI'
      else if (person.location.state === 'rio de janeiro') person.location.state = 'RJ'
      else if (person.location.state === 'rio grande do norte') person.location.state = 'RN'
      else if (person.location.state === 'rio grande do sul') person.location.state = 'RS'
      else if (person.location.state === 'rondônia') person.location.state = 'RO'
      else if (person.location.state === 'roraima') person.location.state = 'RR'
      else if (person.location.state === 'santa catarina') person.location.state = 'SC'
      else if (person.location.state === 'são paulo') person.location.state = 'SP'
      else if (person.location.state === 'sergipe') person.location.state = 'SE'
      else if (person.location.state === 'tocantins') person.location.state = 'TO'
    }
  }
}
</script>

<style>
</style>
