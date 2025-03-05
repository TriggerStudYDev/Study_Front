<template>
    <div class="">
        <img class="w-8 rounded-full" :src="user.image" alt="Users" loading="lazy">
    </div>
</template>

<script setup>
defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>