<template>
  <q-layout view="hHh Lpr fff">

    <q-layout-header>
      <q-toolbar color="primary" class="row justify-between" style="height: 70px;">
        <div>
          <img src="statics/logoZup.png" style="margin-top: 10px;">
        </div>
        <div>
          <q-search id="searchbar" :placeholder="$t('Search')" inverted color="white" v-model="textSearch" :debounce="300" style="width: 700px;" />
        </div>
        <div>
          <q-btn size="md" flat round>
            <q-icon name="account_circle" style="font-size: 40px;" />
            <q-popover>
              <q-list>
                <q-item>
                  <img :src="accountImage" alt="Account photo" style="border-radius: 50%;">
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawer" content-class="bg-white">
      <q-list no-border link inset-delimiter>
        <q-item link to="/list/all" :class="{activeList: listingName === 'all'}">
          <q-item-side icon="select_all" />
          <q-item-main :label="$t('All')" />
        </q-item>
        <q-item link to="/list/done" :class="{activeList: listingName === 'done'}">
          <q-item-side icon="done_all" />
          <q-item-main :label="$t('Done')" />
        </q-item>
        <q-item link to="/list/deleted" :class="{activeList: listingName === 'deleted'}">
          <q-item-side icon="delete_sweep" />
          <q-item-main :label="$t('Trash')" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>

      <div class="flex flex-center">
        <div style="width: 1000px; max-width: 90vw; margin-top: 60px; color: #ababab;" class="shadow-2 flex">
          <div v-for="person in $store.state.candidates.displayedItems" :key="person.email" class="row person-row items-center no-wrap bg-white">
            <div class="col-1 row inline items-center cursorLink fullHeight" @click="viewDetails(person)">
              <img style="border-radius: 50%; margin-left: 10px; margin-top: 3px;" :src="person.picture.thumbnail" :alt="person.name.first">
            </div>
            <div class="col-2 row inline items-center cursorLink fullHeight personName" @click="viewDetails(person)">{{person.name.full}}</div>
            <div class="col-3 row inline items-center cursorLink fullHeight" @click="viewDetails(person)">{{person.email}}</div>
            <div class="col-2 row inline items-center cursorLink fullHeight" @click="viewDetails(person)">{{person.phone}}</div>
            <div class="col row inline items-center cursorLink fullHeight" @click="viewDetails(person)">{{person.location.city + '-' + person.location.state}}</div>
            <div class="col-auto justify-between row inline listIcons">
              <span v-if="listingName !== 'deleted'" style="width: 10px;"></span>
              <a v-if="listingName !== 'deleted'" @click="onClickTrash(person)"><q-icon name="delete" :class="{cursorLink: true, 'text-secondary': person.listing === 'T'}" /></a>
              <span style="width: 10px;"></span>
              <a @click="onClickAll(person)"><q-icon name="select_all" class="cursorLink" /></a>
              <span style="width: 10px;"></span>
              <a v-if="listingName !== 'done'" @click="onClickDone(person)"><q-icon name="check" :class="{cursorLink: true, 'text-secondary': person.listing === 'C'}" /></a>
              <span v-if="listingName !== 'done'" style="width: 10px;"></span>
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div class="flex flex-center">
        <q-pagination v-if="$store.state.candidates.maxPage > 1" @input="changePage" v-model="pageNumber" :max="$store.state.candidates.maxPage" />
        <span v-if="$store.state.candidates.displayedItems.length === 0">({{$t('no_results')}})</span>
      </div>

    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'PageIndex',
  props: {
    listingName: {
      type: String
    }
  },
  data () {
    return {
      accountImage: 'https://randomuser.me/api/portraits/thumb/men/62.jpg',
      leftDrawer: true,
      textSearch: '',
      candidates: [],
      pageNumber: 1
    }
  },
  watch: {
    listingName (value) {
      this.$store.commit('candidates/setFilter', {listingType: this.listingName, searchText: this.textSearch})
      this.pageNumber = this.$store.state.candidates.pageNumber
    },
    textSearch (value) {
      this.$store.commit('candidates/setFilter', {listingType: this.listingName, searchText: this.textSearch})
      this.pageNumber = this.$store.state.candidates.pageNumber
    }
  },
  methods: {
    changePage (newVal) {
      this.$store.commit('candidates/setPage', newVal)
      this.pageNumber = this.$store.state.candidates.pageNumber
    },

    viewDetails (person) {
      this.$store.commit('candidates/setPerson', person)
      this.$router.push('/info')
    },

    onClickAll (person) {
      this.$store.commit('candidates/setPersonListing', {email: person.email, listing: 'all'})
    },
    onClickDone (person) {
      this.$store.commit('candidates/setPersonListing', {email: person.email, listing: 'done'})
    },
    onClickTrash (person) {
      this.$store.commit('candidates/setPersonListing', {email: person.email, listing: 'deleted'})
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

  .fullHeight
    height 100%

  .personName
    color: black
    font-size: 105%

  .listIcons
    font-size: 140%
    font-weight: bold
</style>
