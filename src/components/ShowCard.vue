<template>
    <Card class="showCard">
        <template #header>
            <img :src="show.image ? show.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'"
                style="height: 15rem" />
        </template>
        <template #title>
            <div class="title" :title="show.name">
                {{ show.name }}
            </div>
        </template>
        <template #subtitle>
            <span>Rating : {{ show.rating.average }}/10</span>
            <br>
            <Tag v-if="show.genres.length === 0" class="mr-2" value="Unclassified" />
            <Tag v-else v-for="(genre, index) in show.genres" class="mr-2" :value="genre" :key="`${genre}-${index}`" />
        </template>
        <template #content>
            <div v-html="show.summary.substring(0, 150).concat('...')" style="height: 8em; text-align: center;">
            </div>
        </template>
        <template #footer>
            <Button @click="goToShowDetails">Show Details</Button>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { Show } from "@/models/show";
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import router from '@/router';

interface IProps {
    show: Show
}
const props = defineProps<IProps>()

const goToShowDetails = () => {
    router.push(`/show/${props.show.id}`)
}

</script> 
<style scoped>
.showCard {
    width: 18em;
    margin-top: 1em;
    height: 40em;
    box-shadow: 0px 0px 20px 15px rgba(0, 0, 0, 0.6);
}

.title {
    height: 1.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.p-tag {
    background-color: #4ba0ae;
    margin: 0.1em;
}
</style>