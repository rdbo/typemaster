<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

const wordList = ref(null);
const inputWords = ref("");
const errorMsg = ref(null);
let timer = null;
const timerInterval = 1000;
const countdownStart = 1000 * 60;
let countdown = ref(countdownStart);
const charCount = ref(null);
const elInputWords = ref(null);

const wordsPerMinute = computed(() => {
    let wordCount = charCount.value / 5; // 5 characters per word
    let wpm = wordCount / (countdownStart / (1000 * 60));
    return Math.round(wpm);
});

const formattedWordList = computed(() => {
    return wordList.value.join(" ");
});

const formattedCountdown = computed(() => {
    let minutes = Math.floor(countdown.value / (1000 * 60));
    let seconds = (countdown.value - (minutes * 60 * 1000)) / 1000;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
});

function countdownTick() {
    countdown.value -= timerInterval;
    if (countdown.value <= 0) {
        // add remaining correct characters to charCount
        for (var lastChars = 0; lastChars < wordList.value[0].length; lastChars++) {
            if (inputWords.value[lastChars] !== wordList.value[0][lastChars]) {
                break;
            }
        }
        charCount.value += lastChars;
        
        // reset typing test
        elInputWords.value.disabled = true;
        inputWords.value = "";
        clearInterval(timer);
        timer = null;
        countdown.value = 0;
    }
}

function handleKeyDown(e) {
    if (!timer) {
        charCount.value = 0;
        timer = setInterval(countdownTick, timerInterval);
    }

    if (e.key === ' ' && inputWords.value === wordList.value[0]) {
        charCount.value += inputWords.value.length;
        wordList.value.shift();
        inputWords.value = "";
        e.preventDefault();
    }
}

function restartTest() {
    wordList.value = shuffleArray(wordList.value);
    countdown.value = countdownStart;
    elInputWords.value.disabled = false;
    elInputWords.value.focus();
}

// fetch wordlist
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}

async function fetchWordList() {
    try {
        let data = await fetch(window.origin + "/wordlist.json");
        if (!data.ok) {
            throw Error("unable to download words from the server. Try again!");
        }
        let json = await data.json();
        wordList.value = shuffleArray(json.words);
    } catch (err) {
        errorMsg.value = err.message;
    }
}

fetchWordList();

// custom directive to focus on input box
const vFocus = {
    mounted: (el) => el.focus()
}
</script>

<template>
    <div class="flex justify-center">
        <main class="flex flex-col items-center">
            <h1 class="mt-8 text-4xl font-bold">Typing <span class="text-secondary-100">Test</span></h1>
            <h2 class="mt-4 mb-8 text-xl font-bold text-gray-100">Start typing to begin the test</h2>
            <p v-if="errorMsg">Failed to generate words: {{ errorMsg }}</p>
            <p v-else-if="!wordList">Generating words...</p>
            <div v-else class="flex flex-col">
                <p class="text-4xl text-right">{{ formattedCountdown }}</p>
                <textarea class="mt-4 text-white text-xl bg-blue-700 border-2 border-white rounded-md p-2" rows="5" cols="40" disabled v-model="formattedWordList"/>
                <br/>
                <input v-focus class="mt-4 text-black text-xl bg-blue-100 p-2 disabled:opacity-50" ref="elInputWords" v-model="inputWords" @keydown="handleKeyDown" :placeholder="wordList[0]"/>
            </div>
            <div class="mt-4 flex flex-col">
                <p class="font-bold text-xl">Typing Speed: <span class="text-secondary-100">{{ wordsPerMinute }} WPM</span></p>
                <button class="btn-primary mt-4 py-4 uppercase" @click="restartTest">New Test</button>
            </div>
        </main>
    </div>
</template>

