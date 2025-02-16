<template>
    <div class="flex justify-between gap-x-4 mt-8">
        <span class="flex gap-x-2 text-sm"><img src="/image/communities/Group.svg" alt="Group"> {{ card.member }}
            участников</span>
        <span class="flex gap-x-2 text-sm"><img src="/image/communities/Tag.svg" alt="Tag"> Средняя стоимость
        </span>
        <span class="flex gap-x-2 text-sm"><img src="/image/communities/Alarm.svg" alt="Group"> Среднее время
            выполнения</span>
    </div>
</template>

<script setup>
defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>