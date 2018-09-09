var camera, controls, scene, renderer, mesh, geometry, dots;
let canvas = document.createElement('canvas');
let size = 200;
let ctx = canvas.getContext('2d');
let imageCoords = [];

canvas.width = size;
canvas.height = size;
canvas.classList.add('tmpcanvas');

document.body.appendChild(canvas);

let img = new Image();
img.src = 'img/close.svg';

img.onload = () => {
  ctx.drawImage(img, 0, 0, size, size);

  let data = ctx.getImageData(0, 0, size, size);
  data = data.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let red = data[((size * y) + x) * 4];
      let green = data[((size * y) + x) * 4 + 1];
      let blue = data[((size * y) + x) * 4 + 2];
      let alpha = data[((size * y) + x) * 4 + 3];

      if(alpha > 0) {
        imageCoords.push(x, y);
      }
      
    }
    
  }
}


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

  for (let i = 0; i <= 10000; i++) {
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