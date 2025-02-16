<template>
    <div>
        <div @click="goToOrderPage">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    card: {
        type: Object,
        required: true
    }
});

const goToOrderPage = () => {
    router.push({
        name: 'order-details',
        params: { id: props.card.id }
    });
};
</script>