<template>
  <div class="main">
    <div class="concrete_date activity">
      <div class="date_enter">
        <p>день</p>
        <Datepicker class="date_picker"
                    v-model="date"
                    :format="format"
                    placeholder="Введите дату"
                    select-text="Выбрать"
                    cancel-text="Назад"
                    text-input
                    auto-apply
                    format="DD/MM/yyyy"
                    locale="rus"
                    :format-locale="locale_format"
        />
      </div>
      <button class="search" @click="updateDataSolo">найти</button>
      <div class="result">
        <p>{{display_date}}</p>
      </div>
    </div>

    <div class="concrete_date activity range_activity">
      <div class="range_wrapper">
        <div class="date_enter">
          <p>начальная-дата</p>
          <Datepicker class="date_picker"
                      v-model="startDate"
                      :format="format"
                      auto-apply
                      placeholder="Введите дату"
                      select-text="Выбрать"
                      cancel-text="Назад"
                      format="DD/MM/yyyy"
                      locale="rus"
                      :format-locale="locale_format"
          />
        </div>
        <div>
          <p>→</p>
        </div>
        <div class="date_enter">
          <p>конечная-дата</p>
          <Datepicker class="date_picker"
                      v-model="endDate"
                      :format="format"
                      auto-apply
                      placeholder="Введите дату"
                      select-text="Выбрать"
                      cancel-text="Назад"
                      format="DD/MM/yyyy"
                      locale="rus"
                      :format-locale="locale_format"
          />
        </div>
        <button class="search fullwidth" @click="updateDataRange">найти</button>
        <button class="clear" @click="clearRange">X</button>
      </div>
      <div class="range_result_wrapper">
        <div v-for="day in foundRange" class="result align_left">
          <p>{{day}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!--// localhost:8081/date/span?start_day=1&start_month=4&start_year=2003&end_day=20&end_month=4&end_year=2003-->

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'


export default {
  components: { Datepicker },
  name: "Dates",
  data: function () {
    return {
      date: null,
      startDate: null,
      endDate: null,
      foundRange: [],
      display_date: "Выберите дату для поиска",
      locale_format: ru
    }
  },
  methods: {
    format(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    updateDataSolo() {
      const requestOptions = {
        method: "GET",
      }
      fetch(`http://localhost:8081/date/separate?day=${this.date.getDate()}&month=${this.date.getMonth() + 1}&year=${this.date.getFullYear()}`,
          requestOptions)
      .then(response => {
        if (!response.ok) {
          this.display_date = 'Неверная дата'
          return;
        }
        return response.json()
      })
      .then(data => {
        this.display_date = `${data.date} - ${data.type}`
      })
    },
    updateDataRange() {
      const requestOptions = {
        method: "GET",
      }
      fetch(`http://localhost:8081/date/span?start_day=${this.startDate.getDate()}&start_month=${this.startDate.getMonth() + 1}&start_year=${this.startDate.getFullYear()}&end_day=${this.endDate.getDate()}&end_month=${this.endDate.getMonth() + 1}&end_year=${this.endDate.getFullYear()}`,
          requestOptions)
          .then(response => {
            if (!response.ok) {
              this.display_date = 'Неверная дата'
              return;
            }
            return response.json()
          })
          .then(data => {
            this.foundRange = [];
            for(let i = 0; i < data.length; i++) {
              this.foundRange.push(`${data[i].date} - ${data[i].type}`)
            }
          })
    },
    clearRange() {
      this.foundRange = [];
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  font-family: Typog, lemon, SansSerif, serif;
  color: #2c3e50;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-content: start;
  gap: 30px;

  .activity {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .search {
    font-family: Typog, lemon, SansSerif, serif;
    font-size: 30px;
    padding: 0 50px;
    background: #42b983;
    border: #2c3e50;
    outline: none;
    border-radius: 5px;
    color: #2c3e50;


    &:hover {
      background: #2c3e50;
      color: #42b983;
    }
  }

  .clear {
    font-family: Typog, lemon, SansSerif, serif;
    font-size: 30px;
    background: #ea5b5b;
    border: #2c3e50;
    outline: none;
    border-radius: 5px;
    color: #2c3e50;
    width: 10%;


    &:hover {
      background: #2c3e50;
      color: #ea5b5b;
    }
  }

  .fullwidth {
    width: 50%;
  }

  .result {
    font-family: "Trebuchet MS", serif;
    font-size: 40px;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    color: #42b983;
    p {
      background: #2c3e50;
      padding: 10px;
      border-radius: 4px;
      margin: auto 0;
      vertical-align: middle;
    }
  }

  .range_activity {
    flex-direction: column;
  }

  .align_left {
    &:nth-of-type(1) {
      margin-top: 50px;
    }
    display: flex;
    align-content: start;
    align-items: center;
    width: 100%;

    p {
      width: 60%;
    }
  }

  .range_result_wrapper {
    max-height: 300px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-content: start;
  }

  .range_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
  }

  .date_enter {
    width: 300px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
  }

  .date_picker {
    width: 200px;
  }

  .activity {
    &:nth-of-type(1) {
      margin-top: 50px;
    }

    margin: 0 50px;
    padding: 20px;
    border-radius: 2px;
    background: #D3D3D3;

  }


}
</style>