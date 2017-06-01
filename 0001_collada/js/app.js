(function () {
  const WIN_WIDTH = window.innerWidth;
  const WIN_HEIGHT = window.innerHeight;

  const webglContainer = document.getElementById('webgl-container');

  const scene = new THREE.Scene();
  let camera;

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE);
  renderer.setSize(WIN_WIDTH, WIN_HEIGHT);

  var loader = new THREE.ColladaLoader();
  loader.load('stanza.dae',
    function ( collada ) {
      console.log(collada.scene);
      camera = collada.scene.children[0].children[0];
      scene.add( collada.scene );
      render();
    },
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }
  );

  webglContainer.appendChild(renderer.domElement);

  const render = function () {
    requestAnimationFrame( render );

    renderer.render(scene, camera);
  };
})();
