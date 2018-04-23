export const setPerson = (state, person) => {
  state.person = person
}

export const setPage = (state, page) => {
  const minPage = 1
  state.maxPage = Math.ceil(state.filteredPeople.length / state.itemsPerPage) || 1
  if (page > state.maxPage) page = state.maxPage
  if (page < minPage) page = minPage
  state.pageNumber = page
  state.displayedItems = []
  let includedResults = 0
  let index = (page - 1) * state.itemsPerPage
  while (includedResults < state.itemsPerPage && index < state.filteredPeople.length) {
    state.displayedItems.push(state.filteredPeople[index])
    index++
    includedResults++
  }
}

export const setFilter = (state, {listingType, searchText}) => {
  if (listingType === 'deleted') listingType = 'T' // trash
  else if (listingType === 'done') listingType = 'C' // checked
  else listingType = null
  state.filteredPeople = state.allPeople.filter((person) => {
    if (listingType && person.listing !== listingType) return false
    if (!searchText) return true
    return person.searchTerms.includes(searchText)
  })
  if (searchText) state.searchHistory.push(searchText)
  setPage(state, 1)
  state.currentFilter = {listingType, searchText}
}

export const updateListing = (state) => {
  const {listingType, searchText} = state.currentFilter
  state.filteredPeople = state.allPeople.filter((person) => {
    if (listingType && person.listing !== listingType) return false
    if (!searchText) return true
    return person.searchTerms.includes(searchText)
  })
  setPage(state, state.pageNumber)
}

export const setAllCandidates = (state, list) => {
  state.allPeople = list
  setFilter(state, {listingType: null, searchText: null})
}

export const setPersonListing = (state, {email, listing}) => {
  if (listing === 'deleted') listing = 'T' // trash
  else if (listing === 'done') listing = 'C' // checked
  else listing = ''
  for (const person of state.allPeople) {
    if (person.email === email) {
      person.listing = listing
    }
  }
  updateListing(state)
}
