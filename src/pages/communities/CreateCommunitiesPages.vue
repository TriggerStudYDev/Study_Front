<template>
    <div>
        <h1 class="text-4xl font-semibold text-center">Создайте свое сообщество</h1>
        <div class="max-w-[357px] mx-auto">
            <div class="mt-10">
                <CreateCommunitiesForm />
                <UploadPhotoCommunity class="mt-4" />
            </div>
            <button class="mt-6 w-full px-8 py-3 bg-black rounded-lg text-xl font-medium text-white">Создать</button>
        </div>
    </div>
</template>

<script setup>
import CreateCommunitiesForm from '@/components/communities/CreateCommunitiesForm.vue';
import UploadPhotoCommunity from '@/components/communities/UploadPhotoCommunity.vue';
</script>