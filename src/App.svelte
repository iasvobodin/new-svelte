<script>
  import { Curtains, Plane } from "curtainsjs";
  import { onMount } from "svelte";
  import vertex from "./assets/init.vert";
  import fragment from "./assets/init.frag";
  export let name;
  let curtains, plane, webgl, backstage;
  function curtainsInit() {
    curtains = new Curtains({
      container: webgl,
    });
  }
  function initPlane() {
    plane = new Plane();
  }
  onMount(() => {
    curtainsInit();
    const planeElement = document.getElementsByClassName("plane")[0];
    const params = {
      vertexShader: vertex, // our vertex shader ID
      fragmentShader: fragment, // our fragment shader ID
      uniforms: {
        time: {
          name: "uTime", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: 0,
        },
      },
    };
    // create our plane using our curtains object, the HTML element and the parameters
    const plane = new Plane(curtains, planeElement, params);
    console.log(plane);
    plane.onReady(() => {
      plane.playVideos();
    });
    plane.onRender(() => {
      //   backstage.currentTime = 36;
      //   plane.textures[0].needUpdate();
      // use the onRender method of our plane fired at each requestAnimationFrame call
      //   plane.uniforms.time.value++; // update our time uniform value
    });
  });
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
  <div class="plane">
    <video
      bind:this={backstage}
      style="display: none"
      width="50%"
      class="preloader__img"
      playsinline
      autoplay
      loop
      muted
      src="/image/backstage.mp4"
    />
    <!-- <img
      crossorigin="anonimous"
      decoding="async"
      draggable="false"
      src="/image/1.jpg"
      alt=""
    /> -->
  </div>

  <div bind:this={webgl} id="curtains" />
</main>

<style>
  .plane {
    width: 80vw;
    height: 90vh;
    margin: auto;
  }
  .plane > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: none;
  }
  #curtains {
    /* make the canvas wrapper fits the document */
    position: absolute;
    top: 0;
    right: 0;
    /* bottom: 0;
	 */
    height: 100vh;
    left: 0;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
