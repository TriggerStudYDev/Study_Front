<template>
    <div class="flex justify-between bg-[#D9D9D9] rounded-2xl py-14 px-8">
        <div class="flex flex-col items-start">
            <h1 class="text-3xl font-medium">Что такое сообщества на StudY?</h1>
            <p class="text-xl max-w-[525px] mt-4">Сообщества - это объединения исполнителей, которые совместно работают
                над
                выполнением
                заказов.
                Исполнители распределяют обязанности и задачи, чтобы эффективно и качественно выполнить работу для
                заказчика.</p>
            <span class="text-xl mt-6">Основные преимущества сообществ:</span>
            <div class="grid grid-cols-2 gap-x-16 gap-y-8 max-w-[457px] mt-8">
                <p class="flex flex-col text-2xl font-medium">+25%<span class="text-base font-normal">Больше, чем
                        работая индивидуально</span></p>
                <p class="flex flex-col text-2xl font-medium">х2<span class="text-base font-normal">Выполняйте заказы в
                        2 раза быстрее</span></p>
                <p class="flex flex-col text-2xl font-medium">-20%<span class="text-base font-normal">Рисков
                        невыполнения заказа</span></p>
                <p class="flex flex-col text-2xl font-medium">+15%<span class="text-base font-normal">Повышайте
                        конверсию привлечения новых
                        клиентов</span></p>
            </div>
            <div class="mt-8 flex gap-x-4">
                <button @click="$router.push('/communitiesList')"
                    class="px-8 py-3 bg-white text-black text-xl rounded-lg">Вступить</button>
                <button @click="$router.push('/communitiesCreate')"
                    class="px-8 py-3 bg-black text-white text-xl rounded-lg">Создать</button>
            </div>
        </div>
        <img src="/image/charts/Group 68.png" alt="Image">
    </div>
</template>