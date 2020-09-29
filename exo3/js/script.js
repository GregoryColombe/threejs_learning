var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
let speed = 1
let angle = 0


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
renderer.domElement.addEventListener( 'click', raycast, false );


controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.minDistance = 1
controls.maxDistance = 1000
controls.target = cube

let randomValue


function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    console.log(mouse.x);
}

function raycast ( e ) {
    //1. sets the mouse position with a coordinate system where the center
    //   of the screen is the origin
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );    

    //3. compute intersections
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        scene.traverse(child => {
            if(child.type === "Mesh") {
                console.log("ok");
            }
        })
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var animate = function () {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

animate();
window.addEventListener( 'resize', onWindowResize, false );