let go_f = false;
let go_b = false;
let go_l = false;
let go_r = false;

let controls;

(function () {
  const WIN_WIDTH = window.innerWidth;
  const WIN_HEIGHT = window.innerHeight;

  const webglContainer = document.getElementById('webgl-container');

  const scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera(45, WIN_WIDTH / WIN_HEIGHT, 0.1, 1000);

  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  controls.getObject().position.z = 2;
  controls.getObject().position.y = 0;
  controls.getObject().rotation.x = Math.PI/2.;

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

  document.addEventListener('pointerlockchange', function (event) {
    //console.log(event);
    if (document.pointerLockElement!==null) {
      controls.enabled = true;
    } else {
      controls.enabled = false;
    }
  }, false);

  document.addEventListener('click', function () {
    document.body.requestPointerLock();
  });

  //let clock = new THREE.Clock();
  let t = 0;

  let vel_x = 0, vel_y = 0, vel_z = 0;

  const render = function () {
    requestAnimationFrame( render );

    vel_x -= vel_x * 0.2;
    vel_y -= vel_y * 0.2;

    if (go_f) vel_y -= 0.005;
    if (go_b) vel_y += 0.005;
    if (go_l) vel_x -= 0.005;
    if (go_r) vel_x += 0.005;

    controls.getObject().translateX( vel_x );
    controls.getObject().translateY( vel_z );
    controls.getObject().translateZ( vel_y );

    renderer.render(scene, camera);
  };
})();

function keydown_handler(e) {
  if (e.key == 'w') {
    go_f = true;
  }
  if (e.key == 's') {
    go_b = true;
  }
  if (e.key == 'a') {
    go_l = true;
  }
  if (e.key == 'd') {
    go_r = true;
  }
}

function keyup_handler(e) {
  //console.log(e);
  if (e.key == 'w') {
    go_f = false;
  }
  if (e.key == 's') {
    go_b = false;
  }
  if (e.key == 'a') {
    go_l = false;
  }
  if (e.key == 'd') {
    go_r = false;
  }
}
