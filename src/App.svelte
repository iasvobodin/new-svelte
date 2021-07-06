<script>
  import { onMount } from "svelte";
  import LocomotiveScroll from "locomotive-scroll";
  let holder,
    scrollTop = 0,
    targetScroll = 0;
  onMount(() => {
    // const scroll = new LocomotiveScroll({
    //   el: document.querySelector("[data-scroll-container]"),
    //   smooth: true,
    //   getSpeed: true,
    // });
    const html = document.documentElement;
    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    const frameCount = 1000;
    const currentFrame = (index) => `/frames2/frame  (${index}).webp`;

    let images = [null]; // since everything else is 1-indexed, explicitly fill images[0]
    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        images[i] = new Image();
        images[i].src = currentFrame(i);
      }
    };
    preloadImages();

    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = 1920;
    canvas.height = 1000;
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
      targetScroll += (scrollTop - targetScroll) * 0.1;
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

      // const scrollFraction = scrollTop / maxScrollTop;
      // const frameIndex = Math.min(
      //   frameCount - 1,
      //   Math.ceil(scrollFraction * frameCount)
      // );

      // requestAnimationFrame(() => updateImage(frameIndex + 1));
    });
  });
</script>

<div
  data-scroll-speed="4"
  bind:this={holder}
  data-scroll-container
  id="stick"
  class="holder"
>
  <canvas
    data-scroll
    data-scroll-sticky
    data-scroll-target="#stick"
    id="hero-lightpass"
  />
</div>

<style>
  /* :global(html) {
    height: 100vh;
  } */
  :global(body) {
    padding: 0px;
  }

  .holder {
    height: calc(1000px * 25);
    background: #000;
  }

  canvas {
    display: block;
    position: fixed;
    left: 50vw;
    transform: translateX(-50%);
    margin: auto;
    width: auto;
    height: 100vh;
  }
</style>
