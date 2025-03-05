<template>
    <div class="relative flex flex-col h-screen">
        <div class="w-full">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-semibold">Чат</h1>
                <button><img src="/image/profile/Magnifer.svg" alt="Magnifer"></button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 mb-4" ref="messagesContainer">
            <div v-if="messages.length === 0"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="flex flex-col items-center">
                    <img class="w-[202px]" src="/image/charts/Ellipse16.png" alt="Изображение">
                    <h4 class="mt-2 text-2xl font-medium text-center">Здесь пока нет сообщений</h4>
                </div>
            </div>
            <div v-for="message in messages" :key="message.id" class="message">
                <div :class="{ 'sent': message.sentByMe, 'received': !message.sentByMe }">
                    <p>{{ message.text }}</p>
                    <span class="flex text-xs text-gray-500" :class="{ 'justify-end': message.sentByMe }">{{
                        message.timestamp
                    }}</span>
                </div>
            </div>
        </div>

        <div class="w-full p-4">
            <div class="flex gap-x-4">
                <input v-model="newMessage" @keyup.enter="sendMessage" class="flex-1 bg-[#D9D9D9] rounded-lg py-3 px-8"
                    type="text" placeholder="Написать">
                <div class="flex items-center gap-x-2">
                    <div class="relative">
                        <button @click="showEmojiPicker = !showEmojiPicker">
                            <img src="/image/profile/Smile.svg" alt="Smile">
                        </button>
                        <div v-if="showEmojiPicker"
                            class="emoji-picker absolute -top-12 -left-16 flex border border-[#ccc] p-1 rounded-lg cursor-pointer">
                            <!-- Здесь разместите ваши смайлики, например, с помощью v-for -->
                            <span v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)">{{ emoji }}</span>
                        </div>
                    </div>
                    <button @click="sendMessage"><img src="/image/profile/Plain.svg" alt="Plain"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

const messages = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);
const sentByMe = ref(true);
const showEmojiPicker = ref(false);
const emojis = ref(['😀', '😂', '😍', '😎', '🤔', '👍', '👎']);
const addEmoji = (emoji) => {
    newMessage.value += emoji;
    showEmojiPicker.value = false;
};

const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messages.value.push({
            id: Date.now(),
            text: newMessage.value,
            sentByMe: sentByMe.value,
            timestamp: timestamp
        });
        newMessage.value = '';
        nextTick(() => {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        });
    }
};

onMounted(() => {
    if (messages.value.length > 0) {
        nextTick(() => {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        });
    }
});
</script>

<style scoped>
.message {
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-start;
    /* Исправлено: выравнивание по левому краю по умолчанию */
}


.sent {
    background-color: #0084ff;
    color: white;
    border-radius: 8px;
    padding: 10px;
    max-width: 70%;
    word-break: break-word;
    margin-left: auto;
    /* Выравниваем отправленные сообщения по правому краю */
}

.sent p {
    margin: 0;
}

.sent span {
    align-self: flex-end;
    margin-top: 4px;
    text-align: right;
}

.received {
    background-color: #eee;
    border-radius: 8px;
    padding: 10px;
    max-width: 70%;
    word-break: break-word;
}
</style>