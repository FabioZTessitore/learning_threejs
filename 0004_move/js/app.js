let empty;

let go_w = false;
let go_s = false;
let go_a = false;
let go_d = false;

(function () {
  const WIN_WIDTH = window.innerWidth;
  const WIN_HEIGHT = window.innerHeight;

  const webglContainer = document.getElementById('webgl-container');

  const scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(55, WIN_WIDTH / WIN_HEIGHT, 0.1, 1000);
  camera.position.z = 1.6;

  empty = new THREE.Object3D();
  empty.position.set(0, 0, 1.6);
  empty.rotation.x = 1.5;
  scene.add(empty);

  empty.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x333333);
  renderer.setSize(WIN_WIDTH, WIN_HEIGHT);

  webglContainer.appendChild(renderer.domElement);

  var loader = new THREE.ColladaLoader();
  loader.load('stanza.dae',
    function ( collada ) {
      scene.add( collada.scene );

      window.addEventListener('keydown', keydown_handler);
      window.addEventListener('keyup', keyup_handler);

      render();
    },
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }
  );

  //let clock = new THREE.Clock();
  let t = 0;

  const render = function () {
    requestAnimationFrame( render );

    animate();

    renderer.render(scene, camera);
  };
})();

function animate() {
  if (!go_w || !go_s || !go_a || !go_d) return;

  t += 0.01;
  empty.position.z += 0.005 * Math.sin(10*t);
}

function keydown_handler(e) {
  if (e.key == 'w') {
    empty.position.y += 0.05;
    go_w = true;
  }
  if (e.key == 's') {
    empty.position.y -= 0.05;
    go_s = true;
  }
  if (e.key == 'a') {
    empty.position.x -= 0.05;
    go_a = true;
  }
  if (e.key == 'd') {
    empty.position.x += 0.05;
    go_d = true;
  }
}

function keyup_handler(e) {
  //console.log(e);
  //if (e.key == 's') empty.position.z = 0;
}
