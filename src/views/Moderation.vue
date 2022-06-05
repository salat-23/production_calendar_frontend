<template>
  <div class="main">
    <div class="activity login">
      <h3>Login: </h3>
      <div class="credentials-container">
        <input v-model="login" class="credentials" id="login-input" placeholder="Логин">
        <input v-model="password" class="credentials" id="password-input" placeholder="Пароль">
      </div>
    </div>
    <div class="activity change">
      <div class="date_enter">
        <p>изменить день</p>
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
        <select class="select-type" v-model="selected">
          <option value="WORKING">рабочий</option>
          <option value="DAY_OFF">выходной</option>
          <option value="WORKING_HOLIDAY">праздничный</option>
          <option value="DAY_OFF_ADDED">добавленный выходной</option>
        </select>
      </div>
      <button class="search" @click="updateDataSolo">изменить</button>
      <div class="result">
        <p>{{display_date}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import {ru} from "date-fns/locale";


export default {
  components: { Datepicker },
  name: "Moderation",
  data: function () {
    return {
      selected: "",
      options: [
        { value: "WORKING", label: "рабочий"}  ,
        { value: "DAY_OFF", label: "выходной"}  ,
        { value: "WORKING_HOLIDAY", label: "праздничный"}  ,
        { value: "DAY_OFF_ADDED", label: "добавленный выходной"}  ,
      ],
      login: "",
      password: "",
      date: null,
      display_date: "выберите дату для изменения",
      locale_format: ru
    }
  },
  computed: {
    selectedType: function () {
      return this.selected
    },
    inputLogin: function () {
      return this.login
    },
    inputPassword: function () {
      return this.password
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
      if (this.selectedType === "") {
        return;
      }
      const requestOptions = {
        method: "GET",
      }
      fetch(`http://localhost:8081/date/change?date=${this.date.getDate()}-${this.date.getMonth() + 1}-${this.date.getFullYear()}&login=${this.inputLogin}&password=${this.inputPassword}&type=${this.selectedType}`,
          requestOptions)
          .then(response => {
            if (!response.ok) {
              this.display_date = 'Неверная дата';
              return;
            }
            return response.json();
          })
          .then(data => {
            this.display_date = `${data.date} - ${data.type}`;
          })
    },
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

  .login {
    align-items: center;
    align-content: center;
  }

  .activity {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 0 50px;
    padding: 20px;
    border-radius: 2px;
    background: #D3D3D3;

    .select-type {
      height: 48px;
      margin-top: 10px;
      border-radius: 3px;
      font-family: Typog, lemon, SansSerif, serif;
      font-size: 30px;
      padding: 0 50px;
      background: #42b983;
      border: none;
      outline: none;

      &:focus &:hover {
        outline: none;
        border: none;
      }
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

    .credentials-container {

      display: flex;
      flex-direction: row;
      gap: 20px;
      align-content: center;
      align-items: center;

      .credentials {
        outline: none;
        border: none;
        background: aliceblue;
        width: 300px;
        height: 30px;
      }
    }


    &:nth-of-type(1) {
      margin-top: 50px;
    }
  }
}


</style>