<template>
    <div class="flex gap-x-9 items-center px-6 py-3 cursor-pointer" @click.stop="handleClick">
        <div class="flex items-center gap-x-2.5">
            <slot name="image">
                <img src="/image/auth/vk.svg" alt="">
            </slot>
            <slot name="title">
                <h4 class="">Социальная сеть</h4>
            </slot>
        </div>
        <button>
            <img src="/image/auth/plus.svg" alt="">
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['click']);

const handleClick = () => {
    emit('click');
};
</script>