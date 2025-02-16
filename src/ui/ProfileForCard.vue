<!-- src/components/ProfileForCard.vue -->
<template>
    <div>
        <div class="flex justify-between items-center mt-5">
            <div @click="goToCustomerProfile" class="flex items-center gap-x-4 cursor-pointer">
                <img :src="card.imageUser" alt="Logo" loading="lazy">
                <div>
                    <p class="font-medium">{{ card.nameUser }}</p>
                    <span class="flex gap-x-1 mt-2"><img src="/image/works/star.svg" alt="Star">{{ card.rating
                        }}</span>
                </div>
            </div>
            <button @click="goToCustomerProfileMessage"><img src="/image/works/Dialog.svg" alt="Dialog"
                    loading="lazy"></button>
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
})

const goToCustomerProfile = () => {
    router.push({
        name: 'customerProfile',
        params: { id: props.card.id }
    })
}

const goToCustomerProfileMessage = () => {
    router.push({
        name: 'customerProfile-messages',
        params: { id: props.card.id }
    })
}
</script>