<template>
    <div class="text-center p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ coinName.toUpperCase() }}</h1>
        <h1 class="text-xl text-gray-700">{{ coinValue }} - {{ coinCurrency.toUpperCase() }}</h1>
    </div>
</template>

<script>
export default {
    name: 'CryptoCoin',
    props: {
        coinName: {
            type: String,
            required: true
        },
        coinValue: {
            type: Number,
            required: true
        },
        coinCurrency: {
            type: String,
            required: true
        }
    },
    computed: {
    }
}
</script>