<template>
  <form action="submit" @submit.prevent="submitForm">
    <label for="city" @click="toggleSelect = !toggleSelect">
      <img src="@/assets/images/icons8_earth.png" alt />
    </label>
    <el-cascader
      v-model="location"
      :props="props"
      clearable
      v-show="toggleSelect"
      :show-all-levels="false"
      @change="hideCascaderPannel"
      ref="cascader"
    ></el-cascader>

    <input
      type="text"
      placeholder="请输入地点"
      v-model="location"
      v-show="!toggleSelect"
      @input="setLocation"
    />

    <button>
      <img src="@/assets/images/icons8_search.png" alt />
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      location: "",
      toggleSelect: false,
      props: {
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("getPois", 1);
    },
    getData: async function (keyword, subdistrict) {
      let api = `https://restapi.amap.com/v3/config/district?key=8d340ca896004f823883292e0ae2f5bc&keywords=${keyword}&subdistrict=${subdistrict}&extensions=base`;
      let response = await this.$http.get(api);
      return response.data.districts[0].districts;
    },
    lazyLoad(node, resolve) {
      let nodes = [];
      if (node.level === 0) {
        this.getData("", 2).then((provinces) => {
          provinces.forEach((item) => {
            nodes.push({
              value: item.name,
              label: item.name,
              leaf: item.districts.length === 0,
            });
          });
          resolve(nodes);
        });
      } else {
        this.getData(node.value, 2).then((cities) => {
          cities.forEach((item) => {
            nodes.push({
              value: item.name,
              label: item.name,
              leaf: item.districts.length === 0,
            });
          });
          resolve(nodes);
        });
      }
    },
    setLocation() {
      this.$store.dispatch("setLocation", this.location);
    },
    hideCascaderPannel() {
      this.$refs.cascader.dropDownVisible = false;
      this.setLocation();
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  align-items: center;
  height: 47px;
  margin-bottom: 10px;
  background: url("~@/assets/images/texture/bg-orange.png");
  background-size: cover;
  border-radius: 2rem;

  img {
    width: 30px;
    height: 30px;
    margin: auto 10px;
  }
  input {
    position: relative;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    font-size: $small;
    padding: 0 1rem;
  }

  button {
    background-color: transparent;
    border: none;
    height: 100%;
    cursor: pointer;
  }
}
</style>

<style>
.el-input__inner {
  background: transparent;
}
</style>