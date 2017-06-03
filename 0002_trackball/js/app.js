(function () {
  const WIN_WIDTH = window.innerWidth;
  const WIN_HEIGHT = window.innerHeight;

  const webglContainer = document.getElementById('webgl-container');

  const scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, WIN_WIDTH / WIN_HEIGHT, 0.1, 1000);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x333333);
  renderer.setSize(WIN_WIDTH, WIN_HEIGHT);

  let trackballControls = new THREE.TrackballControls(camera);
  trackballControls.rotateSpeed = 1;
  trackballControls.zoomSpeed = 1;
  trackballControls.panSpeed = 1;

  webglContainer.appendChild(renderer.domElement);

  var loader = new THREE.ColladaLoader();
  loader.load('stanza.dae',
    function ( collada ) {
      scene.add( collada.scene );
      render();
    },
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }
  );

  var clock = new THREE.Clock();
  const render = function () {
    var delta = clock.getDelta();
    trackballControls.update(delta);

    requestAnimationFrame( render );

    renderer.render(scene, camera);
  };
})();
