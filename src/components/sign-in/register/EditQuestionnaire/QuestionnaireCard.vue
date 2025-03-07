<template>
    <div class="bg-[#2A2A2A] rounded-2xl cursor-pointer" @click="$emit('open-modal', card.openModal)">
        <img :src="card.backgroundImage" alt="backgroundImage" />
        <div class="flex px-4 py-5 items-start gap-x-2">
            <img :src="card.iconImage" alt="" />
            <div class="flex flex-col gap-y-1">
                <h3 class="text-sm font-semibold text-white">{{ card.title }}</h3>
                <p class="text-[#8C8C8C] text-sm truncate max-w-[192px]">
                    {{ card.desctiption }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    card: {
        type: Object,
        required: true,
    },
});

defineEmits(['open-modal']);
</script>