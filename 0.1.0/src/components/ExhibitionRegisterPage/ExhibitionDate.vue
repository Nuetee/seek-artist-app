<template>
    <div id="exhibitionDate">
        <div class="date start">
            <div class="label">시작일</div>
            <div class="dateContainer">
                <div class="yearContainer">
                    <select name="yy" id="year_start"></select>
                    <div>년</div>
                </div>
                <div class="monthContainer">
                    <select name="mm" id="month_start"></select>
                    <div>월</div>
                </div>
                <div class="dayContainer">
                    <select name="dd" id="day_start"></select>
                    <div>일</div>
                </div>
            </div>
        </div>
        <div class="date end">
            <div class="label">종료일</div>
            <div class="dateContainer">
                <div class="yearContainer">
                    <select name="yy" id="year_end"></select>
                    <div>년</div>
                </div>
                <div class="monthContainer">
                    <select name="mm" id="month_end"></select>
                    <div>월</div>
                </div>
                <div class="dayContainer">
                    <select name="dd" id="day_end"></select>
                    <div>일</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ExhibitionDate',
        components: {},
        data() {
            return {
                sampleData: ''
            };
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            let date = new Date()
            let currentYear = date.getFullYear()

            for (let i = Number(currentYear) - 100; i <= Number(currentYear + 10); i++) {
                document.getElementById('year_start').append("<option value='" + i + "'>" + i + "</option>")
            }
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {}
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionRegisterPage/exhibitionDate.scss"></style>