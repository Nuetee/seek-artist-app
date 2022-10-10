<template>
    <div id="exhibitionDate">
        <div class="date start">
            <div class="label">시작일</div>
            <div class="dateContainer">
                <div class="yearContainer">
                    <select class="poppins" name="yy" id="year_start" v-model="this.start_date.year"></select>
                    <div>년</div>
                </div>
                <div class="monthContainer">
                    <select class="poppins" name="mm" id="month_start" v-model="this.start_date.month"></select>
                    <div>월</div>
                </div>
                <div class="dayContainer">
                    <select class="poppins" name="dd" id="day_start" v-model="this.start_date.day"></select>
                    <div>일</div>
                </div>
            </div>
            <div class="wrongDate" v-if="!this.start_date.valid">
                &#8251; 잘못된 날짜 값입니다
            </div>
        </div>
        <div class="date end">
            <div class="label">종료일</div>
            <div class="dateContainer">
                <div class="yearContainer">
                    <select class="poppins" name="yy" id="year_end" v-model="this.end_date.year"></select>
                    <div>년</div>
                </div>
                <div class="monthContainer">
                    <select class="poppins" name="mm" id="month_end" v-model="this.end_date.month"></select>
                    <div>월</div>
                </div>
                <div class="dayContainer">
                    <select class="poppins" name="dd" id="day_end" v-model="this.end_date.day"></select>
                    <div>일</div>
                </div>
            </div>
            <div class="wrongDate" v-if="!this.end_date.valid">
                &#8251; 잘못된 날짜 값입니다
            </div>
        </div>
        <div class="wrongDate" v-if="!this.valid_date">
            &#8251; 종료일은 반드시 시작일과 같거나 그 이후로 설정하여야 합니다.
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ExhibitionDate',
        components: {},
        data() {
            return {
                start_date: {
                    year: '',
                    month: '',
                    day: '',
                    valid: true,
                },
                end_date: {
                    year: '',
                    month: '',
                    day: '',
                    valid: true,
                },
                valid_date: true
            };
        },
        watch: {
            'start_date': {
                deep: true,
                handler () {
                    this.formValidCheck()
                }
            },
            'end_date': {
                deep: true,
                handler() {
                    this.formValidCheck()
                }
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            let date = new Date()
            let currentYear = date.getFullYear()
            let currentMonth = date.getMonth() + 1
            let currentDay = date.getDate()

            for (let y = Number(currentYear) - 100; y <= Number(currentYear + 10); y++) {
                let option_start = document.createElement('option')
                let option_end = document.createElement('option')
                option_start.value = y
                option_start.innerHTML = y
                option_end.value = y
                option_end.innerHTML = y

                if (y === Number(currentYear)) {
                    option_start.selected = true
                    option_end.selected = true
                    this.start_date.year = y.toString()
                    this.end_date.year = y.toString()
                }

                document.getElementById('year_start').appendChild(option_start)
                document.getElementById('year_end').appendChild(option_end)
            }

            for (let m = 1; m <= 12; m++) {
                let option_start = document.createElement('option')
                let option_end = document.createElement('option')
                option_start.value = m
                option_start.innerHTML = m
                option_end.value = m
                option_end.innerHTML = m
                if (m === Number(currentMonth)) {
                    option_start.selected = true
                    option_end.selected = true
                    this.start_date.month = m.toString()
                    this.end_date.month = m.toString()
                }

                document.getElementById('month_start').appendChild(option_start)
                document.getElementById('month_end').appendChild(option_end)
            }

            for (let d = 1; d <= 31; d++) {
                let option_start = document.createElement('option')
                let option_end = document.createElement('option')
                option_start.value = d
                option_start.innerHTML = d
                option_end.value = d
                option_end.innerHTML = d
                if (d === Number(currentDay)) {
                    option_start.selected = true
                    option_end.selected = true
                    this.start_date.day = d.toString()
                    this.end_date.day = d.toString()
                }

                document.getElementById('day_start').appendChild(option_start)
                document.getElementById('day_end').appendChild(option_end)
            }
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            formValidCheck () {
                let date_objects = [this.start_date, this.end_date]
                for (let i = 0; i < 2; i++) {
                    // 입력하지 않은 경우가 있는 경우
                    for (let key in date_objects[i]) {
                        if (date_objects[i][key] === '') {
                            this.$emit('activate-next-button', false)
                            return
                        }
                    }

                    if (date_objects[i].month == 4 || date_objects[i].month == 6 || date_objects[i].month == 9 || date_objects[i].month == 11) {
                        if (date_objects[i].day == 31) {
                            date_objects[i].valid = false
                        }
                        else {
                            date_objects[i].valid = true
                        }
                    }
                    else if (date_objects[i].month == 2) {
                        let isLeapYear = false
                        if(date_objects[i].year % 4 == 0) {
                            if (date_objects[i].year % 100 == 0) {
                                if (date_objects[i].year % 400 == 0) {
                                    isLeapYear = false
                                }
                                else {
                                    isLeapYear = true
                                }
                            }
                            else {
                                isLeapYear = true
                            }
                        }
                        else {
                            isLeapYear = false
                        }

                        // 윤년인 경우
                        if (isLeapYear) {
                            if (date_objects[i].date > 29) {
                                date_objects[i].valid = false
                            }
                            else {
                                date_objects[i].valid = true
                            }
                        }
                        // 평년인 경우
                        else {
                            if (date_objects[i].date > 28) {
                                date_objects[i].valid = false
                            }
                            else {
                                date_objects[i].valid = true
                            }
                        }
                    }
                }

                if (this.start_date.valid && this.end_date.valid) {
                    let start_date_string = this.start_date.year.toString() + '-' + this.start_date.month.toString() + '-' + this.start_date.day.toString()
                    let end_date_string = this.end_date.year.toString() + '-' + this.end_date.month.toString() + '-' + this.end_date.day.toString()

                    let start_date_object = new Date(start_date_string)
                    let end_date_object = new Date(end_date_string)

                    // 시작일이 종료일 이후인 경우
                    if (start_date_object > end_date_object) {
                        this.$emit('activate-next-button', false)
                        this.valid_date = false
                        return
                    }

                    this.valid_date = true
                    this.$emit('set-exhibition-entity', 'start_date', start_date_object)
                    this.$emit('set-exhibition-entity', 'end_date', end_date_object)
                    this.$emit('activate-next-button', true)
                }
                else {
                    this.$emit('activate-next-button', false)
                }

                return
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionRegisterPage/exhibitionDate.scss"></style>