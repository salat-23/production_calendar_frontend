<template>
  <div class="home">
    <div class="functions">
      <div class="description">
        <p>производственный-календарь-рф-с-1995-г.-по-2025-г.-</p><img :src="image" alt="My Happy SVG"/>
      </div>
      <p class="capabilities">возможности</p>
      <p>Конкретная-дата</p>
      <p>Диапазон-дат</p>
      <p>Список-дат-по-фильтрам</p>
      <a href="/dates" class="start">начать</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RussianFlag from "@/assets/ru.svg"

export default {
  name: 'Home',
  data: function () {
    return {
      image: RussianFlag
    }
  }
}
</script>

<style lang="scss">

 .home {
   margin: 30px;
   font-family: Typog, lemon, SansSerif, serif;
   font-size: 20px;

   p {
     color: #2c3e50;
   }

   p:first-child {
     display: inline-block;
   }
   .description {
     background: rgb(255, 230, 145);
     padding: 5px;
     border-radius: 10px;
   }
   .functions {
     display: flex;
     flex-direction: column;
     align-content: center;
     align-items: center;
     .capabilities {
       align-self: center;
       font-size: 50px;
       color: #42b983;
       margin-bottom: 10px;
     }
   }
   .start {
     margin-top: 50px;
     background: #42b983;
     padding: 20px;
     border-radius: 20px;
     text-decoration: none;
     color: #2c3e50;
     font-size: 40px;
   }

   img {
     height: 20px;
     display: inline-block;
   }

 }

</style>
