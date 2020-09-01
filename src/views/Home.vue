<template>
  <div>
    <header>
      <nav>
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="logo" />
          <span>City Walker</span>
        </div>
        <div class="links-container">
          <router-link to="/map">地图</router-link>
          <a href="#about">关于</a>
          <a href="#contact">联系</a>
        </div>
      </nav>
      <div class="description">
        <div class="content">
          <h1>城市漫步者</h1>
          <p>
            探寻休闲公共空间，发掘城市之美
            <br />用脚步丈量城市，记录你的足迹
            <br />分享你发现的有趣好玩的角落
          </p>
        </div>
      </div>
      <router-link to="/map" class="search-city">探索城市</router-link>
    </header>
    <div class="main">
      <img class="illustration" src="@/assets/images/illustrations/undraw_navigation.svg" alt />
      <div class="color-map">
        <img src="@/assets/images/map-layer.jpg" alt />
        <h3>缤纷水彩地图</h3>
        <p>（可切换其他底图）</p>
      </div>
      <div class="sidebar-map">
        <img src="@/assets/images/map-sidebar.png" alt />
        <h3>支持分类检索</h3>
        <p>（数据源于高德）</p>
      </div>
      <img
        class="illustration"
        src="@/assets/images/illustrations/undraw_Fall_is_coming.svg"
        alt
        style="align-self: flex-end"
      />
      <div class="responsive-map">
        <img src="@/assets/images/Website-Mockup.png" alt />
        <h3>响应式设计</h3>
        <p>（适配不同尺寸的设备）</p>
      </div>
      <img class="illustration" src="@/assets/images/illustrations/undraw_mobile_browsers.svg" alt />
    </div>
    <hr />
    <div class="plan">
      <h2>开发中……</h2>
      <ul>
        <li>Pin 功能：记录新发现的角落</li>
        <li>登陆功能：登陆账号可以保存足迹，定制探索路线等</li>
        <li>导入 GPS 数据：读取 GPS 轨迹数据，绘制动态轨迹</li>
        <li>……</li>
      </ul>
      <img
        class="illustration"
        src="@/assets/images/illustrations/undraw_under_construction.svg"
        alt
      />
    </div>
    <footer>
      <div class="footer-container">
        <div id="contact">
          <h3>联系</h3>
          <div class="social-icons">
            <img src="@/assets/images/github.svg" alt />
            <img src="@/assets/images/email-icon.svg" alt />
          </div>
        </div>
        <div id="about">
          <h3>关于地图</h3>
          <p>探寻城市公共空间，记录你的足迹和欢乐。</p>
        </div>
      </div>

      <p class="copyright">&copy; 2020, BenThomson. All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  height: 1000px;
  padding: 2rem 5rem;
  background: linear-gradient(
    180deg,
    #f8a978 0%,
    rgba(248, 169, 120, 0.5) 78.12%,
    rgba(248, 169, 120, 0) 100%
  );
  @media screen and (max-width: 768px) {
    height: 500px;
    padding: 1.5rem 2.5rem;
  }
  nav {
    display: flex;
    justify-content: space-between;
    .logo {
      display: flex;
      align-items: center;
      span {
        font-size: $large;
        font-weight: bold;
        color: $text-light;
        margin-left: 10px;
      }
    }

    .links-container {
      display: flex;
      align-items: center;
      a {
        margin-left: 50px;
        color: $text-light;
        font-size: $normal;
        font-weight: bold;
      }
    }
    @media screen and (max-width: 768px) {
      display: block;
      .logo {
        display: flex;
        align-items: center;
        img {
          width: 30px;
        }
        span {
          font-size: $normal;
          margin-left: 10px;
        }
      }
      .links-container {
        display: none;
      }
    }
  }

  .description {
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 100px;
    color: $text-light;
    background: url("~@/assets/images/illustrations/undraw_sunny_day.svg");
    background-position: right;
    background-size: contain;
    background-repeat: no-repeat;
    .content {
      h1 {
        font-size: 120px;
        text-shadow: 5px 5px 20px $bg-dark;
      }
      p {
        margin-top: 60px;
        font-size: $large;
        line-height: 40px;
      }
    }
    @media screen and (max-width: 768px) {
      margin-top: 50px;
      background: none;
      .content {
        h1 {
          font-size: 2.5rem;
          text-align: center;
        }
        p {
          font-size: $normal;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }

  .search-city {
    display: block;
    width: 350px;
    height: 80px;
    margin: 100px auto;
    color: $text-light;
    font-size: $heading3;
    text-align: center;
    line-height: 80px;
    background: #f67280;
    border-radius: 40px;
    transition: box-shadow 0.3s ease-in-out;
    text-decoration: none;
    &:hover {
      box-shadow: 5px 5px 15px $bg-dark;
    }
    @media screen and (max-width: 768px) {
      display: block;
      width: 60%;
      height: 50px;
      margin: 100px auto;
      font-size: $normal;
      line-height: 50px;
      border-radius: 25px;
    }
  }
}

.main {
  max-width: 1280px;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: url("~@/assets/images/route.png");
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  .illustration {
    margin-top: 50px;
    width: 350px;
  }
  .color-map {
    width: 80%;
    margin-top: 100px;
    align-self: flex-end;
    text-align: center;
    color: $text-dark;
    img {
      max-width: 1240px;
      width: 100%;
    }
    h3 {
      font-size: $heading3;
    }
    p {
      font-size: $small;
    }
  }
  .sidebar-map {
    width: 80%;
    margin-top: 100px;
    text-align: center;
    align-self: flex-start;
    color: $text-dark;
    img {
      max-width: 1000px;
      width: 100%;
    }
    h3 {
      font-size: $heading3;
    }
    p {
      font-size: $small;
    }
  }
  .responsive-map {
    margin-top: 100px;
    align-self: center;
    text-align: center;
    color: $text-dark;
    img {
      max-width: 1000px;
      width: 80%;
    }
    h3 {
      font-size: $heading3;
    }
    p {
      font-size: $small;
    }
  }
  @media screen and (max-width: 768px) {
    display: block;
    background: none;
    .illustration {
      display: block;
      width: 60%;
      margin: 50px auto;
    }
    .color-map,
    .sidebar-map,
    .responsive-map {
      width: 100%;
    }
  }
}

hr {
  width: 60%;
  max-width: 1000px;
  margin: 150px auto;
  background: #c4c4c4;
  border: 1px solid #c4c4c4;
  @media screen and (max-width: 768px) {
    margin: 50px auto;
  }
}

.plan {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $text-dark;
  h2 {
    font-size: $heading2;
    text-align: center;
    margin-bottom: 30px;
  }

  ul {
    margin: 0 auto;
    li {
      color: $text-dark;
      list-style-image: url("~@/assets/images/gears.svg");
    }
  }

  .illustration {
    align-self: flex-end;
    width: 500px;
  }
  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
    ul {
      font-size: 0.5rem;
      line-height: 30px;
      li {
        list-style-image: none;
      }
    }
    .illustration {
      align-self: center;
      width: 60%;
    }
  }
}

footer {
  height: 500px;
  margin-top: 180px;
  padding: 200px 150px 80px 150px;
  background: linear-gradient(
    180deg,
    rgba(248, 169, 120, 0) 0%,
    rgba(248, 169, 120, 0.6) 47.4%,
    #f8a978 100%
  );
  color: $text-light;

  .footer-container {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: $large;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  #contact {
    .social-icons {
      display: flex;
      img {
        width: 30px;
        margin-right: 10px;
      }
    }
  }

  .copyright {
    margin-top: 100px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 50px;
    padding: 150px 1rem;
    .footer-container {
      flex-direction: column;
    }
    #contact {
      margin-bottom: 2rem;
    }
    .copyright {
      margin-top: 50px;
    }
  }
}
</style>