// INIT

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let geometry = new THREE.BoxGeometry();
let texture = new THREE.TextureLoader().load( "./img.jpeg" );
let material = new THREE.MeshStandardMaterial( { map: texture} );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.set(-2,0,0)
cube.name = "cube1"

let geometry2 = new THREE.DodecahedronBufferGeometry(1,5);

let material2 = new THREE.MeshStandardMaterial( { map: texture} );
let cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.set(2,0,0)
cube2.name = "cube2"


let activeLight1 = true
let activeLight2 = true

// LIGHTS 


let light = new THREE.PointLight( 0xffffff, 3, 3 );
light.position.set( -2, 1, 1 );
scene.add( light );
light.name = "Light1"

let ligh2 = new THREE.PointLight( 0xffffff, 3, 3 );
ligh2.position.set( 2, 1, 1 );
scene.add( ligh2 );
ligh2.name = "Light2"


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
        // console.log( intersects[ i ] ); 

        scene.traverse( child  => {

            if (child.type = "Mesh") {

                if (intersects[i].object === child) {

                    if (intersects[i].object.name === "cube1") {
                        if (activeLight1 === true){
                            scene.children[2].intensity = 0.8
                            activeLight1 = false
                        } 
                        else {
                            scene.children[2].intensity = 3
                            activeLight1 = true
                        }
                    }
                    if (intersects[i].object.name === "cube2") {
                        if (activeLight2 === true){
                            scene.children[3].intensity = 0.8
                            activeLight2 = false
                        } 
                        else {
                            scene.children[3].intensity = 3
                            activeLight2 = true
                        }
                    }
                }
            }
        })
    }
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var animate = function () {
    requestAnimationFrame( animate );

    
    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();