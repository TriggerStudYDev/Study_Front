<template>
    <div class="max-w-[800px] mx-auto">
        <CommunitiesHeader />
        <CommunitiesDetailedCard v-if="card" :card="card" class="mt-8" />
        <div v-else>Загрузка...</div>
    </div>
</template>

<script setup>
import CommunitiesHeader from '@/widgets/CommunitiesHeader.vue';
import CommunitiesDetailedCard from '@/widgets/CommunitiesDetailedCard.vue';
import { useUserStore } from '@/stores';
import { ref, onMounted } from 'vue';

const card = ref(null)
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    const store = useUserStore();
    card.value = store.CommunititesCards.find(c => c.id === +props.id)
})
</script>