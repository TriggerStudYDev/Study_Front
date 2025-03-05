<template>
    <div v-if="useProfile.profile">
        <HeaderPersonalAccount />
        <ChartCommunity class="mt-8" />
        <ChartAuction class="mt-8" />
    </div>
</template>

<script setup>
import HeaderPersonalAccount from '@/components/profile/HeaderPersonalAccount.vue';
import ChartCommunity from '@/components/chart/ChartCommunity.vue';
import ChartAuction from '@/components/auction/ChartAuction.vue';
import { useUserProfileStore } from '@/stores/useUserProfileStore';
import { onMounted } from 'vue';

const useProfile = useUserProfileStore();

onMounted(() => {
    useProfile.getProfile();
});
</script>