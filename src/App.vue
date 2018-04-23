<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$axios({method: 'get', url: 'https://randomuser.me/api/?page=1&results=83&seed=abc&nat=br'}).then((response) => {
      for (const person of response.data.results) {
        this.preparePersonData(person)
      }
      this.$store.commit('candidates/setAllCandidates', response.data.results)
    })
      .catch((response) => {
        alert(this.$t('connectionError'))
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
