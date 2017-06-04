let go = false;

(function () {
  const WIN_WIDTH = window.innerWidth;
  const WIN_HEIGHT = window.innerHeight;

  const webglContainer = document.getElementById('webgl-container');

  const scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, WIN_WIDTH / WIN_HEIGHT, 0.1, 1000);
  camera.position.z = 4;

  let empty = new THREE.Object3D();
  empty.position.set(0, 0, 10);
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

      render();
    },
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }
  );

  let clock = new THREE.Clock();
  const render = function () {
    requestAnimationFrame( render );

    if (go) {
      var t = clock.getElapsedTime();
      //console.log(t);
      empty.position.y = 3*Math.sin(t);
      empty.position.x = 3*Math.cos(t);
    }

    renderer.render(scene, camera);
  };
})();

function keydown_handler(e) {
  //console.log(e);
  if (e.key == 's') go = !go;
}
