<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    -
    <router-link to="/dates">Dates</router-link>
    -
    <router-link to="/moderation">Moderation</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
@font-face {
  font-family: "Typog";
  src: local("Typog"),
  url(./fonts/typographica.ttf) format("truetype");
}
@font-face {
  font-family: "Lemon";
  src: local("Lemon"),
  url(./fonts/lemon.ttf) format("truetype");
}
@font-face {
  font-family: "Optimus";
  src: local("Optimus"),
  url(./fonts/optimus.ttf) format("truetype");
}
@font-face {
  font-family: "Romul";
  src: local("Romul"),
  url(./fonts/romul.ttf) format("truetype");
}

#app {

}

#nav {
  font-family: Verdana, SansSerif;
  router-link {
    font-family: Typog;
  }
  color: #2c3e50;

  font-size: 50px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

}
</style>
