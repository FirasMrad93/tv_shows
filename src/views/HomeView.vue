<template>
  <div class="filterRow">
    <Dropdown class="filter" @change="onFilter" v-model="genre" :options="genreOptions"
      optionLabel="name" optionValue="value" />
    <Dropdown class="filter" @change="onFilter" v-model="rating" :options="ratingOptions"
      optionLabel="name" optionValue="value" />
    <div class="search">
      <span class="p-input-icon-left searchItem">
        <i class="pi pi-search" />
        <InputText type="text" v-model="searchField" placeholder="Search" @keyup.enter="onSearchShow" />
      </span>
      <Button class="searchItem" :disabled="searchField.length === 0" @click="onSearchShow">Search</Button>
      <Button class="clearSearch" v-if="searchTriggered" label="Clear Search" icon="pi pi-times"
        @click="onClearSearch" />
    </div>
  </div>
  <Paginator class="transparentPaginator" :first="0" :rows="itemsPerPage" :totalRecords="filteredShows.length" @page="onPage($event)"></Paginator>
  <div v-if="shownShows.length === 0 && !noData">
    <ProgressSpinner />
  </div>
  <div v-else-if="noData" class="showsGrid">
    <h2>No Results</h2>
  </div>
  <div v-else class="showsGrid">
    <ShowCard v-for="show in shownShows" v-bind:key="show.id" :show="show" />
  </div>
</template>

<script setup lang="ts">
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { getShows, searchShow } from '@/service/shows';
import { onBeforeMount, onMounted, ref } from 'vue';
import { Show } from '@/models/show';
import { SearchResult } from '@/models/searchResult';
import ShowCard from '@/components/ShowCard.vue';



const shows = ref<Show[]>([])
const filteredShows = ref<Show[]>([])
const shownShows = ref<Show[]>([])
const searchField = ref<string>("")
const genre = ref<string>("")
const rating = ref<number>(0)
const searchTriggered = ref<boolean>(false)
const noData = ref<boolean>(false)
const itemsPerPage = 10

const genreOptions = [
  { name: 'Select a genre', value: '' },
  { name: 'Action', value: 'Action' },
  { name: 'Adventure', value: 'Adventure' },
  { name: 'Anime', value: 'Anime' },
  { name: 'Children', value: 'Children' },
  { name: 'Comedy', value: 'Comedy' },
  { name: 'Crime', value: 'Crime' },
  { name: 'DIY', value: 'DIY' },
  { name: 'Drama', value: 'Drama' },
  { name: 'Espionage', value: 'Espionage' },
  { name: 'Family', value: 'Family' },
  { name: 'Fantasy', value: 'Fantasy' },
  { name: 'Food', value: 'Food' },
  { name: 'History', value: 'History' },
  { name: 'Horror', value: 'Horror' },
  { name: 'Legal', value: 'Legal' },
  { name: 'Medical', value: 'Medical' },
  { name: 'Music', value: 'Music' },
  { name: 'Mystery', value: 'Mystery' },
  { name: 'Nature', value: 'Nature' },
  { name: 'Romance', value: 'Romance' },
  { name: 'Science-Fiction', value: 'Science-Fiction' },
  { name: 'Sports', value: 'Sports' },
  { name: 'Supernatural', value: 'Supernatural' },
  { name: 'Thriller', value: 'Thriller' },
  { name: 'Travel', value: 'Travel' },
  { name: 'War', value: 'War' },
  { name: 'Western', value: 'Western' },
]

const ratingOptions = [
  { name: 'Select a rating', value: 0 },
  { name: '2+', value: 2 },
  { name: '3+', value: 3 },
  { name: '4+', value: 4 },
  { name: '5+', value: 5 },
  { name: '6+', value: 6 },
  { name: '7+', value: 7 },
  { name: '8+', value: 8 },
  { name: '9+', value: 9 },
]




onBeforeMount(() => {
  initData()
})

const initData = () => {
  getShows().then(response => response.json().then(data => {
    shows.value = data
    filteredShows.value = data
    shownShows.value = paginate(itemsPerPage, 0)
  }))
}

const paginate = (page_size: number, page_number: number) => {
  return filteredShows.value.slice((page_number) * page_size, (page_number + 1) * page_size);
}

const onPage = (event: any) => {
  shownShows.value = paginate(event.rows, event.page)
}

const onSearchShow = () => {
  shownShows.value = []
  searchTriggered.value = true
  rating.value = 0
  genre.value = ''
  searchShow(searchField.value).then(response => response.json().then((data: SearchResult[]) => {
    if(data.length === 0) {
      noData.value = true
    }
    shows.value = data.map(searchResult => searchResult.show)
    filteredShows.value = data.map(searchResult => searchResult.show)
    shownShows.value = paginate(itemsPerPage, 0)
  }))
}

const onClearSearch = () => {
  searchTriggered.value = false
  noData.value = false
  rating.value = 0
  genre.value = ''
  searchField.value = ''
  initData()
}

const onFilter = () => {
  let filtered = shows.value
  if (genre.value) {
    filtered = filtered.filter(show => show.genres.includes(genre.value))
  }
  if (rating.value) {
    filtered = filtered.filter(show => show.rating.average >= rating.value)
  }
  filteredShows.value = filtered
  shownShows.value = paginate(itemsPerPage, 0)
}

</script>

<style>
.showsGrid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.filterRow {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.filter {
  width: 12em;
  margin-right: 1em;
}

.search {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.searchItem{
margin-right: 0.5em !important;
}

.clearSearch{
  background-color: #b11818 !important;
  border: #b11818 !important;
}
.transparentPaginator{
  background-color: transparent !important;
}
.transparentPaginator>.p-paginator-first,
.p-paginator-last,
.p-paginator-next,
.p-paginator-page,
.p-paginator-pages,
.p-paginator-prev {
  color: white !important;
}
.transparentPaginator > .p-paginator-pages > .p-highlight {
  background: #2c3e50 !important;
  border-color: #2c3e50 !important;
}
.transparentPaginator .p-paginator-pages > .p-paginator-page:not(.p-highlight):hover,
.p-paginator-next:not(.p-disabled):not(.p-highlight):hover,
.p-paginator-last:not(.p-disabled):not(.p-highlight):hover,
.p-paginator-first:not(.p-disabled):not(.p-highlight):hover,
.p-paginator-prev:not(.p-disabled):not(.p-highlight):hover
{
  background: #4ba0ae !important;
  border-color: #4ba0ae !important;
}

.p-button{
  background-color: #364c62 !important;
  border: #364c62 !important;
}

@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: #ffffff;
    }
    40% {
        stroke: #ffffff;
    }
    66% {
        stroke: #ffffff;
    }
    80%,
    90% {
        stroke: #ffffff;
    }
}
</style>
