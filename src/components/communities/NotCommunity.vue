<template>
    <div class="flex bg-[#D9D9D9] rounded-2xl py-5 px-10 gap-x-[30px] items-center">
        <img class="w-[202px]" src="/image/charts/Group 68.png" alt="Image">
        <div>
            <h1 class="text-2xl font-medium">Кажется вы не состоите в сообществе</h1>
            <p class="mt-3.5">Присоединяйтесь к сообществам и выполняйте заказы в два раза эффективнее вместе!</p>
            <div class="flex gap-x-4 mt-8">
                <button @click="$router.push('/communitiesCreate')"
                    class="px-8 py-3 bg-black rounded-lg text-xl font-medium text-white">Создать</button>
                <button @click="$router.push('/communitiesList')"
                    class="px-8 py-3 bg-white rounded-lg text-xl font-medium text-black">Присоедениться</button>
            </div>
        </div>
    </div>
</template>