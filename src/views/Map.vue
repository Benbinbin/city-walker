<template>
  <el-container>
    <transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      leave-active-class="animate__animated  animate__fadeOutLeft animate__faster"
    >
      <el-aside class="hidden-xs-only sidebar" width="60px" v-if="toggleSidebar">
        <el-tooltip
          placement="right"
          v-for="item in filters"
          :key="item.name"
          :content="item.content"
          effect="light"
        >
          <button @click="setFilter(item.name)" :class="{active: item.name === filter}">
            <img :src="require(`@/assets/images/icons8_${item.name}.png`)" :alt="item.name+' icon'" />
          </button>
        </el-tooltip>
      </el-aside>
    </transition>

    <el-aside width="30%" class="hidden-xs-only entry-column">
      <header>
        <div class="logo">
          <a href="#"></a>
          <img src="@/assets/images/logo.png" alt />
          <span>City Walker</span>
        </div>
        <div class="user">
          <a href="#">
            <img src="@/assets/images/icons8_login.png" alt />
          </a>
        </div>
      </header>
      <searchbar></searchbar>
      <!-- <card :auto-load=true></card> -->
      <card></card>

      <div class="button-container">
        <button class="toggleSidebar" v-if="!toggleSidebar" @click="toggleSidebar = !toggleSidebar">
          <img src="@/assets/images/icons8_menu.png" alt="sidebar menu icon" />
        </button>
        <button class="back" v-if="toggleSidebar" @click="toggleSidebar = !toggleSidebar">
          <img src="@/assets/images/icons8_back.png" alt="sidebar toggle back icon" />
        </button>
        <button class="map">
          <img src="@/assets/images/icons8_explore.png" alt="map icon" />
        </button>
        <button class="route">
          <img src="@/assets/images/icons8_route.png" alt="route icon" />
        </button>
      </div>
    </el-aside>
    <el-main>
      <searchbar class="hidden-sm-and-up small-searchbar"></searchbar>
      <div id="map"></div>
      <div class="button-container">
        <button @click="showFilter = !showFilter" v-if="!showFilter">
          <img src="@/assets/images/icons8_menu.png" alt="setting icon" />
        </button>
        <button @click="showFilter = !showFilter" v-if="showFilter">
          <img src="@/assets/images/icons8_cancel.png" alt="setting icon" />
        </button>
        <div class="filterButton" v-if="showFilter">
          <el-tooltip
            placement="right"
            v-for="item in filters"
            :key="item.name"
            :content="item.content"
            effect="light"
          >
            <button @click="setFilter(item.name)" :class="{active: item.name === filter}">
              <img
                :src="require(`@/assets/images/icons8_${item.name}.png`)"
                :alt="item.name+' icon'"
              />
            </button>
          </el-tooltip>
        </div>
        <button @click="getLocalPois">
          <img src="@/assets/images/icons8_compass.png" alt="compass icon" />
        </button>
      </div>
      <card class="hidden-sm-and-up small-card"></card>
    </el-main>
  </el-container>
</template>

<script>
import Searchbar from "@/components/Searchbar";
import Card from "@/components/Card";
import { mapState } from "vuex";
let map = {};

export default {
  data() {
    return {
      toggleSidebar: false,
      showFilter: false,
      filters: [
        {
          name: "checked_all",
          content: "选择全部",
          isActive: true,
        },
        {
          name: "park",
          content: "公园",
          isActive: false,
        },
        {
          name: "museum",
          content: "博物馆",
          isActive: false,
        },
        {
          name: "bookshop",
          content: "书店",
          isActive: false,
        },
        {
          name: "cafe",
          content: "咖啡厅",
          isActive: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      location: (state) => state.location,
      marker: (state) => state.marker,
      hover: (state) => state.hover,
      filter: (state) => state.filter,
    }),
  },
  watch: {
    marker: {
      handler: function (val, oldVal) {
        if (val.length !== 0) {
          val.forEach((item) => {
            let lng = +item.location.split(",")[0];
            let lat = +item.location.split(",")[1];
            let icon = L.icon({
              iconUrl: require(`@/assets/images/icons8_${item.type}.png`),
              iconSize: [30, 30],
            });

            L.marker([lat, lng], { icon: icon }).addTo(map).bindPopup(`
              <h3>${item.name}</h3>
              <p>地址：${item.address}</p>
              <p>电话：${
                item.tel && item.tel.length !== 0 ? item.tel : "空"
              }</p>
            `);
          });
          let firstLng = +val[0].location.split(",")[0];
          let firstLat = +val[0].location.split(",")[1];
          map.panTo([firstLat, firstLng]);
        }
      },
      deep: true,
    },
    location() {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    },
    hover: function (val, oldVal) {
      let lng = +val.location.split(",")[0];
      let lat = +val.location.split(",")[1];
      map.panTo([lat, lng]);
      var popup = L.popup()
        .setLatLng([lat, lng])
        .setContent(val.name)
        .openOn(map);
    },
  },
  methods: {
    setFilter(filter) {
      this.$store.dispatch("setFilter", filter);
    },
    setting() {},
    getLocalPois() {
      this.$http
        .get(
          "https://restapi.amap.com/v3/ip?&key=8d340ca896004f823883292e0ae2f5bc"
        )
        .then((res) => {
          console.log(res);
          this.$store.dispatch("setLocation", res.data.city);
          this.$store.dispatch("getPois", 1);
        });
    },
  },
  mounted() {
    // stamen watercolor 地图
    let watercolor = L.tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abcd",
        minZoom: 1,
        maxZoom: 18,
        ext: "jpg",
      }
    );

    // 路线图
    let route = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
      {
        attribution: "©OpenStreetMap, ©CartoDB",
        // pane: "labels",
      }
    );

    // mapbox 地图
    let mapbox = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYmVuYmluYmluIiwiYSI6ImNrZHprMWZubjF2ZWMydXNnZXYydmhmYW0ifQ.4gGGsT8tiyOOyk3HJAdDKg",
      }
    );

    // 高德地图
    let autonavi = L.tileLayer(
      "http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
      {
        subdomains: "1234",
      }
    );

    let baseMaps = {
      Mapbox: mapbox,
      高德地图: autonavi,
      水彩图: watercolor,
    };

    let overlayMaps = {
      路线地点标注: route,
    };

    // 创建 leaflets 对象，设置默认底图

    // map = L.map("map").setView([39.916527, 116.397128], 13);

    map = L.map("map", {
      center: [39.916527, 116.397128],
      zoom: 13,
      layers: [watercolor, route],
    });

    // map.createPane("labels");

    // 创建地图图层选择控制器，可以切换添加到 leaflets 地图上的底图 basemap 及其他矢量路线图层
    L.control.layers(baseMaps, overlayMaps, { position: "topleft" }).addTo(map);
  },
  components: {
    Searchbar,
    Card,
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.el-container {
  height: 100vh;
  // position: relative;
  .el-aside.sidebar {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 130px;
    background: url("~@/assets/images/texture/bg-green.png");
    img {
      width: 30px;
      height: 30px;
    }
    button {
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      background: url("~@/assets/images/texture/card-blue.png");
      background-position: bottom;
    }
    .active {
      box-shadow: $light-shadow;
    }
  }

  .el-aside.entry-column {
    height: 100%;
    background: url("~@/assets/images/texture/bg-gray.png");
    background-size: cover;
    background-position: left bottom;
    position: relative;
    padding: 1rem;
    max-width: 350px;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .logo {
        display: flex;
        align-items: center;
        position: relative;
        font-size: $medium;
        font-weight: bold;
        color: $text-dark;
        a {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }

    .button-container {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      background: transparent;

      button {
        background: transparent;
        border: none;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .el-main {
    height: 100vh;
    position: relative;
    padding: 0;
    #map {
      height: 100%;
    }
    .button-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10000;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        margin-bottom: 10px;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        background: url("~@/assets/images/texture/icon-bg-green.png");
        background-size: cover;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .active {
        box-shadow: $light-shadow;
      }
    }
    .small-searchbar {
      position: absolute;
      width: 70%;
      z-index: 10000;
      top: 10px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>

<style lang="scss">
.small-card {
  display: flex;
  flex-direction: row;
  width: 100vw;
  position: absolute;
  z-index: 10000;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 200px !important;
  span {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    li {
      list-style: none;
    }
  }

  .card-body {
    h1 {
      font-size: $small !important;
    }
    p {
      font-size: $super-small !important;
    }
  }

  .site-card {
    width: 200px;
  }
  .load-data {
    padding: 10px;
    height: 150px !important;
    margin: 10px 0 !important;
  }
}
</style>
