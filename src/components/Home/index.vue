<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-1/2 p-4">
            <div class="text-center">
                <select @change="handleChangeId" v-model="coinName">
                    <option value="bitcoin">BITCOIN</option>
                    <option value="ethereum">ETHEREUM</option>
                    <option value="dacxi">DACXI</option>
                    <option value="cosmos">ATOM</option>
                </select>
                <select @change="handleChangeCurrency" v-model="coinCurrency">
                    <option value="usd">USD</option>
                    <option value="brl">BRL</option>
                    <option value="eur">EUR</option>
                </select>
                <CryptoCoin :coinName="coinName" :coinValue="coinValue" :coinCurrency="coinCurrency" />
            </div>
        </div>
        <div class="w-1/2 p-4">
            <div class="text-center">
                <h2 class="text-xl font-bold mb-4">Historic Values - Pick a Date</h2>
                <input type="date" v-model="selectedDate" :max="maxDate" @change="handleChangeDate">
                <p class="pt-2">{{ selectedDate === ''
                    ? 'No selected Date'
                    : coinName.toUpperCase() + ' - ' +
                    historicalCoinValue + ' - ' +
                    coinCurrency.toUpperCase() }}</p>
            </div>
        </div>
    </div>

</template>

<script>
import CryptoCoin from '../CryptoCoin/index.vue'
import { fetchCurrentCoinPrice, fetchHistoricalPrice } from '../../axios/request.js'
export default {
    name: 'Home',
    components: {
        CryptoCoin
    },
    data() {
        return {
            coinName: 'bitcoin',
            coinCurrency: 'eur',
            coinValue: 0,
            maxDate: '',
            selectedDate: '',
            historicalCoinValue: 0
        }
    },
    created() {
        this.fetchCurrentPrice();
        this.setMaxDate();
        setInterval(() => {
            this.fetchCurrentPrice()
        }, 30000);
    },
    watch: {
        coinName(newCoinName, oldCoinName) {
            // Watch for changes in coinName
            if (this.selectedDate !== '') {
                // If selectedDate is not empty, fetch historical price for the new coinName
                this.handleChangeDate();
            }
        },
        coinCurrency(newCoinCurrency, oldCoinCurrency) {
            // Watch for changes in coinCurrency
            if (this.selectedDate !== '') {
                // If selectedDate is not empty, fetch historical price for the new coinCurrency
                this.handleChangeDate();
            }
        }
    },
    methods: {
        async fetchCurrentPrice() {
            const response = await fetchCurrentCoinPrice(this.coinName, this.coinCurrency)
            this.coinValue = response[this.coinName][this.coinCurrency]
        },
        handleChangeCurrency(event) {
            this.coinCurrency = event.target.value
            this.fetchCurrentPrice()
        },
        handleChangeId(event) {
            this.coinName = event.target.value
            this.fetchCurrentPrice()
        },
        setMaxDate() {
            const today = new Date().toISOString().split('T')[0];
            this.maxDate = today;
        },
        async handleChangeDate(event) {
            const parts = this.selectedDate.split('-');

            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

            const response = await fetchHistoricalPrice(this.coinName, formattedDate)

            console.log(response[this.coinCurrency])

            this.historicalCoinValue = response[this.coinCurrency]

        }
    }
}
</script>