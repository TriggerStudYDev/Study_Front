<template>
    <div>
        <h1 class="text-4xl font-medium leading-[44px]">Продолжите работу <br> над последними заказами</h1>
        <p class="text-xl mt-4">Доведите заказы до конца и получите заслуженное вознаграждение! Просмотрите список
            последних проектов и
            выберите те, которые вам интересны.</p>
        <button @click="$router.push('/listOrders')"
            class="text-white font-medium text-xl mt-6 px-8 py-3 bg-black rounded-lg">Открыть все
            заказы</button>
    </div>
</template>