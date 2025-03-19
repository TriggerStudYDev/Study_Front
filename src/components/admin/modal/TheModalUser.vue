<!-- src/widgets/TheModalUser.vue -->
<template>
    <div class="fixed top-0 right-0 flex items-start justify-end w-full h-full transition-transform duration-300 bg-black bg-opacity-50"
        :class="{ 'opacity-0': animation }">
        <div class="bg-[#E9E9EB] rounded-lg w-[500px] h-full shadow-lg overflow-y-auto py-10"
            :class="animation ? 'slide-out-right' : 'right-to-left'">
            <TheModalHead :user="user" @close-modal="closeModal" />
            <TheModalQuestionnaire :user="user" @close-modal="closeModal" />
        </div>
    </div>
</template>



<script setup>

import { ref } from 'vue';
import TheModalHead from '@/components/admin/modal/TheModalHead.vue';
import TheModalQuestionnaire from '@/components/admin/modal/TheModalQuestionnaire.vue';

const animation = ref(false);


const closeModal = () => {
    animation.value = true;
    setTimeout(() => {
        emit('close-modal');
    }, 300);
};

const emit = defineEmits(['close-modal']);

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});

</script>
