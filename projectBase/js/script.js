// INIT

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;   //damping 
controls.dampingFactor = .25;   //damping inertia
controls.enableZoom = true;      //Zooming
controls.autoRotate = false;       // enable rotation
controls.maxPolarAngle = Math.PI / 2; // Limit angle of visibility

let raycaster, mouse = { x : 0, y : 0 };
raycaster = new THREE.Raycaster();
renderer.domElement.addEventListener( 'click', raycast, false );

controls.addEventListener("change", () => {
    if (this.renderer) this.renderer.render(this.scene, camera);
});

window.addEventListener( 'resize', onWindowResize, false );

// INIT END

// FUNCTIONS



function raycast ( e ) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );    

    //3. compute intersections
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        console.log( intersects[ i ] ); 
    }
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();