<script>
  import { onMount } from "svelte";
  import anime from "animejs/lib/anime.es.js";
  import LocomotiveScroll from "locomotive-scroll";
  let items = "SvobodinaPhoto";
  let holder,
    scrollTop = 0,
    targetScroll = 0;
  onMount(() => {
    let invis = anime({
      targets: ".canva",
      autoplay: false,
      scale: 2,
      translateY: "-15%",
      translateX: "20%",
      easing: "linear",
    });
    let lettersMove = anime({
      targets: ".letter",
      translateY: "-100%",
      translateX: "-100%",
      opacity: 0,
      delay: anime.stagger(150),
      autoplay: false,
      easing: "linear",
    });
    // const scroll = new LocomotiveScroll({
    //   el: document.querySelector("[data-scroll-container]"),
    //   smooth: true,
    //   getSpeed: true,
    // });
    const html = document.documentElement;
    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    const frameCount = 1153;
    // const currentFrame = (index) => `/frames2/frame  (${index}).webp`;
    const currentFrame = (index) =>
      `https://res.cloudinary.com/dmxcnqgq9/image/upload/w_${window.innerWidth}/frame_${index}.webp`;

    let images = [null]; // since everything else is 1-indexed, explicitly fill images[0]
    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        images[i] = new Image();
        images[i].crossOrigin = "Anonymous";
        images[i].src = currentFrame(i);
      }
    };
    preloadImages();

    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    img.onload = function () {
      context.drawImage(img, 0, 0);
    };

    const updateImage = (index) => {
      context.drawImage(images[index], 0, 0);
    };
    // scroll.on("scroll", (func) => {
    //   const scrollTop = func.scroll.y;
    //   const maxScrollTop = holder.scrollHeight - window.innerHeight;
    //   const scrollFraction = scrollTop / maxScrollTop;
    //   console.log(func);
    //   const frameIndex = Math.min(
    //     frameCount - 1,
    //     Math.ceil(scrollFraction * frameCount)
    //   );
    //   console.log(frameIndex);
    //   requestAnimationFrame(() => updateImage(frameIndex + 1));
    // });

    const raf = () => {
      targetScroll += (scrollTop - targetScroll) * 0.09;
      // console.log(targetScroll);
      // console.log("raf");

      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = targetScroll / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );
      // debugger;
      updateImage(frameIndex + 1);
      requestAnimationFrame(raf);
    };
    raf();
    window.addEventListener("scroll", () => {
      //const
      scrollTop = html.scrollTop;
      lettersMove.seek(scrollTop * 2);
      // lettersMove.finished.then(() =>
      // );
      scrollTop > 500 && invis.seek(scrollTop - 500);

      // const scrollFraction = scrollTop / maxScrollTop;
      // const frameIndex = Math.min(
      //   frameCount - 1,
      //   Math.ceil(scrollFraction * frameCount)
      // );

      // requestAnimationFrame(() => updateImage(frameIndex + 1));
    });
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400&family=Cormorant+Infant&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div
  data-scroll-speed="4"
  bind:this={holder}
  data-scroll-container
  id="stick"
  class="holder"
>
  <div class="main__description">
    <canvas
      class="canva"
      data-scroll
      data-scroll-sticky
      data-scroll-target="#stick"
      id="hero-lightpass"
    />
    <h1 class="header">
      {#each items as item}
        <span class="letter" style="display: inline-block;"> {item} </span>
      {/each}
    </h1>
    <p class="sub__title">Больше чем просто фотография</p>
  </div>
</div>
<div class="block2" />

<style>
  .main__description {
    display: grid;
    width: 100%;
    height: 100vh;
    /* transform: scale(0.5) translate(-100% -100%); */
    /* background: url(/image/ggr.svg) left top / 100% 100vh no-repeat; */
    grid-template-rows: 1fr 1fr 2fr 4fr 2.66fr 5.33fr 5.33fr 4.33fr 2.83fr 3.5fr 3.5fr 2.83fr 4.33fr 5.33fr 5.33fr 2.66fr 4fr 2fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 2fr 4fr 2.66fr 5.33fr 5.33fr 4.33fr 2.83fr 3.5fr 3.5fr 2.83fr 4.33fr 5.33fr 5.33fr 2.66fr 4fr 2fr 1fr 1fr;
    top: 0px;
    position: sticky;
  }

  .sub__title {
    place-self: center;
    overflow: hidden;
    grid-area: 12/14/15/16;

    font-family: "Comfortaa", cursive;
    margin: 0;
    font-size: 3vw;
    color: rgba(255, 255, 255, 0.452);
  }
  .header {
    grid-area: 4/4/7/16;
    position: absolute;
    font-family: "Cormorant Infant", serif;
    margin: 0;
    font-size: 10vw;
    line-height: 10vw;
    color: rgb(255, 255, 255);
  }
  .holder {
    height: calc(1153px * 20);
    background: #000;
    position: relative;
  }
  .block2 {
    height: 100vh;
    background-color: #fff;
  }

  canvas {
    display: block;
    grid-area: 9/4/17/12;
    place-self: center;
    object-fit: cover;
    /* position: sticky; */
    /* top: 35vh;
    left: 10vw;
    width: auto;
    height: 50vh; */
    width: 100%;
    height: 100%;
  }
  :global(body) {
    padding: 0px;
  }
</style>
