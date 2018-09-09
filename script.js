var camera, controls, scene, renderer, mesh, geometry, dots;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  renderer = new THREE.WebGLRenderer();



  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    3000
  );
  camera.position.z = 200;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // do something
  const texture = (new THREE.TextureLoader).load('img/particle.png');
  const materila = new THREE.PointCloudMaterial({
    size: 10,
    vertexColors: THREE.VertexColors,
    // map: texture
  });

  geometry = new THREE.Geometry();
  let x, y, z;

  for (let i = 0; i <= 100; i++) {
    x = Math.sin(i/10) * 100; 
    y = Math.cos(i/10) * 100; 
    z = i;

    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
  };

  const pointCLoud = new THREE.PointCloud(geometry, materila);
  scene.add(pointCLoud);
}

function render() {
  renderer.render(scene, camera);
}

let i = 0;

function animate() {
  i++;
  requestAnimationFrame(animate);
  
  geometry.vertices.forEach((particle, index) => {
    let dX, dY, dZ;

    dX = Math.sin(i / 10 + index / 2) / 2;
    dY = 0;
    dZ = 0;

    particle.add(new THREE.Vector3(dX, dY, dZ));
  });

  geometry.verticesNeedUpdate = true;

  render();
}


init();
animate();