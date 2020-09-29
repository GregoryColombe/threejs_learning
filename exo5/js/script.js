// INIT

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.z = 10;
camera.position.set(-5, 0, 25)

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.name = "cube"
cube.position.set(0, 0, 15)

createGeometry()

const controls = new THREE.OrbitControls(camera);

controls.addEventListener("change", () => {
    if (this.renderer) this.renderer.render(this.scene, camera);
});


let raycaster, mouse = { x : 0, y : 0 };
raycaster = new THREE.Raycaster();
renderer.domElement.addEventListener( 'click', raycast, false );



window.addEventListener( 'resize', onWindowResize, false );

let moveCamera = false

// INIT END


// Create a sine-like wave
var curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 5, 30 ),
	new THREE.Vector3( -5, 5, 30 ),
	new THREE.Vector3( 0, 0, 15  ),
	new THREE.Vector3( 10, 0, -15 ),
    new THREE.Vector3( 15, -10, -15 ),
    new THREE.Vector3( 20, 5, 15 ),
    new THREE.Vector3( -10, 5, 20 ),
    new THREE.Vector3( -15, 5, 25 ),
    new THREE.Vector3( -13, 5, 30 )
] );

function move () {
    curve.points.forEach(position => {
        console.log(position); 
    });
}

// console.log(curve.points);

var points = curve.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial( { color : 0xffffff } );

// Create the final object to add to the scene
var splineObject = new THREE.Line( geometry, material );
scene.add(splineObject)

var camPosIndex = 0;
var randomPoints = [];

for ( var i = 0; i < 10; i ++ ) {
    randomPoints.push(

        new THREE.Vector3( -10, 5, 30 ),
        new THREE.Vector3( -5, 5, 30 ),
        new THREE.Vector3( 0, 0, 15  ),
        new THREE.Vector3( 10, 0, -15 ),
        new THREE.Vector3( 15, -10, -15 ),
        new THREE.Vector3( 20, 5, 15 ),
        new THREE.Vector3( -10, 5, 20 ),
        new THREE.Vector3( -15, 5, 25 ),
        new THREE.Vector3( -13, 5, 30 )
        // new THREE.Vector3(Math.random() * 200 , Math.random() * 200 , Math.random() * 200 )
    );
}
var spline = new THREE.SplineCurve3(randomPoints);

// FUNCTIONS

// CREATE STARS
function createGeometry() {
    createStars()
}
function createStars() {
    for (var i = 0; i < 400; i++) {
        var b = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color: "#EEEDDD"})
        );
        
        b.position.x = -300 + Math.random() * 600;
        b.position.y = -300 + Math.random() * 600;  
        b.position.z = -300 + Math.random() * 600;
        
        scene.add(b);
    }
}

function raycast ( e ) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );    

    //3. compute intersections
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        // console.log( intersects[ i ] ); 
        // move()
        if (intersects[i].object.name === "cube") {
            moveCamera = true
        }
        else {
        }
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

    
    camPosIndex++;
    if (camPosIndex > 10000) {
        camPosIndex = 0;
    }

    var camPos = spline.getPoint(camPosIndex / 10000);
    var camRot = spline.getTangent(camPosIndex / 10000);

    if (moveCamera === true) {
        cube.position.x = camPos.x;
        cube.position.y = camPos.y;
        cube.position.z = camPos.z;

        // cube.rotation.y = camRot.y;
        // cube.rotation.z = camRot.z;

        camera.position.x = camPos.x 
        camera.position.y = camPos.y + 2
        camera.position.z = camPos.z + 10

        // camera.rotation.x = 10

        // camera.rotation.x = camRot.x;
        // camera.rotation.y = camRot.y;
        camera.rotation.z = camRot.z;
    }
    renderer.render( scene, camera );
};

animate();