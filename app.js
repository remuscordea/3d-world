function main() {
  // DOM elements
  const canvas = document.getElementById("c")

  // Settings
  const fov = 75
  const aspect = canvas.clientWidth / canvas.clientHeight
  const near = 0.1
  const far = 2000
  const images = [
    "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Solarsystemscope_texture_2k_stars_milky_way.jpg",
    "http://blog.topazlabs.com/wp-content/uploads/2013/07/Screen-Shot-2013-12-11-at-10.42.18-AM.png",
    "https://l13.alamy.com/360/2C1YDET/equirectangular-panoramic-360-degrees-panoramic-view-of-the-square-facing-the-church-santuario-della-ss-pieta-in-cannobio-piedmont-italy-june-1-2C1YDET.jpg",
    "https://i.imgur.com/0UpDels.jpg",
  ]
  const backgroundImage = images[0]

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas })

  // Camera
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 1

  // Orbital controls
  new THREE.OrbitControls(camera, canvas)

  // Scene
  const scene = new THREE.Scene()
  const loader = new THREE.TextureLoader()
  const texture = loader.load(backgroundImage, () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
    rt.fromEquirectangularTexture(renderer, texture)
    scene.background = rt.texture
  })

  // Render screen
  function render() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
