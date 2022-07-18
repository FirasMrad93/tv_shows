<template>
    <div v-if="!show">
        <ProgressSpinner />
    </div>
    <div v-else class="main">
        <img :src="show?.image ? show.image.original : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'"
            class="show-cover" />
        <div class="details">
            <h1>{{ show?.name }} ({{ show?.premiered?.slice(0, 4) }} - {{ show?.ended ? show?.ended.slice(0, 4) : "" }})
            </h1>
            <p><b>Rating :</b> {{ show?.rating?.average ? `${show?.rating?.average}/10` : 'Not Rated' }}</p>
            <p><b>Language :</b> {{ show?.language }}</p>
            <p><b>Runtime :</b> {{ show?.runtime ? `${show?.runtime} minutes` : "Unspecified" }}</p>
            <p><b>Network :</b> <a :href="show?.network?.officialSite || '#'"
                    :target="show?.network?.officialSite ? '_blank' : '_self'">{{ show?.network?.name }}</a></p>
            <div>
                <b>Genres : </b>
                <Tag v-if="show?.genres.length === 0" class="mr-2" value="Unclassified" />
                <Tag v-else v-for="(genre, index) in show?.genres" class="mr-2" :value="genre"
                    :key="`${genre}-${index}`" />
            </div>
            <div class="justify-text" v-html="show?.summary"></div>
            <h2>Cast</h2>
            <div class="cast">
                <div v-for="cast in show?._embedded.cast.slice(0, 6)" :key="cast.person.id" class="person">
                    <Avatar v-if="cast.person?.image?.medium" :image="cast.person.image.medium" class="mr-2"
                        size="xlarge" shape="circle" />
                    <Avatar v-else icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
                    <div class="names">
                        <p>{{ cast.person.name }}</p>
                        <p class="charachter-name">{{ cast.character.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import { getShowDetails } from '@/service/shows';
import { Show } from '@/models/show';
import Tag from "primevue/tag";
import Avatar from "primevue/avatar";
import ProgressSpinner from "primevue/progressspinner";



const route = useRoute()
const id = ref<string>("")
const show = ref<Show>()

onMounted(() => {
    id.value = route.params.id.toString()
    initData()
})

const initData = () => {

    getShowDetails(id.value).then(response => response.json().then(data => {
        show.value = data
    }))
}

</script> 
<style scoped>

h1 {
    color: #2c3e50;
}
.main {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    background-color: #ffffffa2;
    padding: 2em;
    border-radius: 0.5em;
    color: #222222;
}

.details {
    width: 65%;
    padding-left: 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.p-tag {
    background-color: #4ba0ae;
    margin: 0.1em;
}

.justify-text {
    text-align: justify;
}

.p-avatar.p-avatar-xl {
    width: 6rem;
    height: 6rem;
    font-size: 4rem;
}

.show-cover {
    width: 100%;
    max-width: 30em;
    height: auto;
}

.cast {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.person {
    display: flex;
    align-items: center;
    width: 15em;
}

.names {
    padding-left: 1em;
    text-align: left;
}

.charachter-name {
    color: #6c757d;
}

@media only screen and (max-width: 900px) {
    .main {
        display: flex;
        flex-direction: column;
        align-items: center
    }

    .details {
        width: 100%;
    }
}
</style>