<template>
  <div class="card-container">
    <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <transition-group
        enter-active-class="animate__animated animate__slideInLeft animate__faster"
        v-on:enter="enter"
      >
        <li
          v-for="(location,index) in locations"
          class="infinite-list-item"
          :key="location.id"
          :data-index="index"
          @mouseenter="hover(location)"
        >
          <el-card class="site-card" v-if="location.name">
            <div class="card-body">
              <h1>{{ location.name }}</h1>
              <p>{{ location.address }}</p>
            </div>
            <div class="card-footer">
              <div class="location">
                <img src="@/assets/images/icons8_address.png" alt="site icon" />
                <span>({{+location.location.split(",")[0] | lng_lat}}, {{+location.location.split(",")[1] | lng_lat}})</span>
              </div>
              <img
                :src="require('@/assets/images/icons8_'+location.type+'.png')"
                alt="location type icon"
              />
            </div>
          </el-card>
        </li>
      </transition-group>
    </ul>
    <button
      v-if="!loading && !noMore"
      class="load-data"
      style="text-align: center"
      @click="load"
    >加载数据</button>
    <p v-if="loading" style="text-align: center">加载中...</p>
    <p v-if="noMore && pois.length" style="text-align: center">—— 到底啦 ——</p>
  </div>
</template>

<script>
export default {
  // props: {
  //   autoLoad: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      loading: false,
      //   locations: {
      //     name: "西西弗书店",
      //     location: "广东省深圳市罗湖区宝安南路1881号华润中心万象城4层430铺",
      //     type: "cafe",
      //     lng: 114.05432624723576,
      //     lat: 22.607171881932103,
      //   },
    };
  },
  computed: {
    noMore() {
      return this.pois.length + 1 >= this.$store.state.num;
    },
    disabled() {
      return true;
      // if (this.autoload) {
      //   return this.loading || this.noMore;
      // } else {
      //   return true;
      // }
    },
    pois() {
      return this.$store.state.pois;
    },
    locations() {
      if (this.$store.state.filter === "checked_all") {
        return this.$store.state.pois;
      } else {
        switch (this.$store.state.filter) {
          case "park":
            return this.$store.state.pois.filter((item) => {
              return item.type === "park";
            });
          case "museum":
            return this.$store.state.pois.filter((item) => {
              return item.type === "museum";
            });
          case "bookshop":
            return this.$store.state.pois.filter((item) => {
              return item.type === "bookshop";
            });
          case "cafe":
            return this.$store.state.pois.filter((item) => {
              return item.type === "cafe";
            });
        }
      }
    },

    page() {
      return this.$store.state.page;
    },
  },
  methods: {
    load() {
      this.loading = true;
      this.$store.dispatch("addPage");
      let vm = this;
      setTimeout(() => {
        vm.$store.dispatch("getPois", vm.page).then((data) => {
          vm.loading = false;
        });
      }, 100);
    },
    enter(el, done) {
      let delayNum = "." + el.dataset.index * 200 + 500 + "s";
      el.style.animationDelay = delayNum;
    },
    hover(location) {
      this.$store.dispatch("hover", location);
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.card-container {
  height: calc(100vh - 200px);
  margin-bottom: 50px;
  overflow: auto;
  button {
    display: block;
    margin: 1rem auto;
    width: 50%;
    height: 2rem;
    border-radius: 2rem;
    background: url("~@/assets/images/texture/bg-orange.png");
    background-size: cover;
    cursor: pointer;
  }
}
.site-card {
  background: url("~@/assets/images/texture/card-blue.png");
  background-size: cover;
  background-position: bottom;
  color: $text-dark;
  margin: 15px;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: $light-shadow;
  }
  .card-body {
    padding: 5px;
    margin-bottom: 10px;
    background: url("~@/assets/images/texture/text-orange.png");
    background-size: cover;
    background-position: bottom;
    h1 {
      font-size: $large;
      font-weight: bord;
      margin-bottom: 5px;
    }
    p {
      font-size: $small;
    }
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: $super-small;
      margin-left: 5px;
    }
  }
}
</style>