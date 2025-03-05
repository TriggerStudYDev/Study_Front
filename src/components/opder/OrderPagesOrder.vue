<template>
    <div v-if="card">
        <OrderPagesCard :card="card" />
    </div>
    <div v-else>
        Загрузка...
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores';
import OrderPagesCard from '@/components/opder/OrderPagesCard.vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const card = ref(null);

onMounted(async () => {
    const store = useUserStore();
    card.value = store.listOrderCards.find(c => c.id === +props.id);
});

</script>
