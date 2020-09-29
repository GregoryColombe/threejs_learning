var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
// renderer.setClearColor(0xffffff, 0);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// let actualImg = "./img.jpeg"
// var geometry = new THREE.SphereGeometry(0.5, 32, 32);
// var texture = new THREE.TextureLoader().load(  actualImg);
// var material = new THREE.MeshBasicMaterial( { map: texture } );
// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// mesh.position.set(-2,0,0)
// mesh.name = "mesh"

var geometry = new THREE.SphereGeometry(1, 42, 42);
var texture = new THREE.TextureLoader().load( "./img.jpeg" );
var material = new THREE.MeshStandardMaterial( { map: texture} );
// var material = new THREE.MeshLambertMaterial( { color: 0xff0000, emissive: 0x000000, opacity: 1 } );
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.set(0, 0, 1)
mesh.name = "mesh"


var geometry2 = new THREE.SphereGeometry(0.7, 32, 32);
// var texture2 = new THREE.TextureLoader().load( "./img3.jpeg" );
// var material2 = new THREE.MeshBasicMaterial( { color: 0xE83333, opacity: 1 } );
var material2 = new THREE.MeshStandardMaterial( { map: texture, emissive: 0xE33F3F} );
var mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);
mesh2.position.set(4, 0, 1)
mesh2.name = "mesh2"


// camera.position.set(0,0,0);

const controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;   //damping 
controls.dampingFactor = .25;   //damping inertia
controls.enableZoom = true;      //Zooming
controls.autoRotate = false;       // enable rotation
controls.maxPolarAngle = Math.PI / 2; // Limit angle of visibility

controls.addEventListener("change", () => {
    if (this.renderer) this.renderer.render(this.scene, camera);
});


//LIGHT

var light = new THREE.DirectionalLight( 0xff0000, 0.75, 1);
light.position.set( mesh2.position.x, mesh2.position.y, mesh2.position.z);
light.target = mesh
scene.add( light );

var ambienLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambienLight );

// LIGHT HELPER
// var helper = new THREE.DirectionalLightHelper( light, 1);
// scene.add( helper );

// PIVOT
pivot = new THREE.Group();
pivot.position.set( mesh.position.x, mesh.position.y, mesh.position.z); 
scene.add( pivot ); 
pivot.add( mesh2 );
pivot.add( light );

// VISUALISE PIVOT
var pivotSphereGeo = new THREE.SphereGeometry( 0.1 );
var pivotSphere = new THREE.Mesh(pivotSphereGeo);
pivotSphere.position.set( 0,0,0 );
pivotSphere.position.z = 0.1;
scene.add( pivotSphere );

// RAYCASTER
raycaster = new THREE.Raycaster();
var raycaster, mouse = { x : 0, y : 0 };
renderer.domElement.addEventListener( 'click', raycast, false );



// scene.add( cube );
camera.position.z = 8;


function raycast ( e ) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );    

    //3. compute intersections
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        // console.log( intersects[ i ].object ); 

        scene.traverse(child => {
            if(child.type === "Mesh") {
                // console.log(child.name);

                if (child.name === "mesh") {
                    // console.log(child.name);
                    TweenMax.to(child.scale, .5, {x: 2.5, y: 2.5, z: 2.5})
                    controls.autoRotate = true
                    // console.log("ejje");
                }
            }
        })
    }
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var animate = function () {
    requestAnimationFrame( animate );
    // mesh2.position.y += 0.01 
    // light.position.y += 0.01
    
    mesh.rotation.y += 0.005;
    mesh2.rotation.y += 0.002;

    pivot.rotation.z += 0.01;

    controls.update();
    renderer.render( scene, camera );
};

animate();