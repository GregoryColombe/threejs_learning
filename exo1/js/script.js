let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setClearColor(0xffffff, 0);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 , wireframe: true} );
let cube = new THREE.Mesh( geometry, material );
cube.name = "cube",
cube.color = "vert"
scene.add( cube );

let geometry2 = new THREE.BoxGeometry();
let material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } );
let cube2 = new THREE.Mesh( geometry2, material2 );
cube2.name = "cube2"
cube2.color = "bleu"

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

let allCube = [
    cube, 
    cube2,
]

let incrementValue1 = 0.01
let incrementValue2 = 0.01

renderer.domElement.addEventListener( 'click', raycast, false );

cube.position.x = -2
cube2.position.x = 2
scene.add( cube2 );

camera.position.z = 5;

controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.minDistance = 1
controls.maxDistance = 1000


function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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
        intersects[i].object.material.wireframe = !intersects[i].object.material.wireframe
        document.getElementById("color").innerHTML = intersects[i].object.color
        speedRotation(intersects, i)
    }
}

function speedRotation (intersects, i) {
    // console.log("uu : ", intersects[i].object.rotation.set(1,1,1));
    if (intersects[i].object.name === "cube") {
        incrementValue1 = 0.05
        incrementValue2 = 0.01
        setTimeout(() => {
            incrementValue1 = 0.01
        }, 2000);
    }
    else if (intersects[i].object.name === "cube2") {
        incrementValue2 = 0.05
        incrementValue1 = 0.01
        setTimeout(() => {
            incrementValue2 = 0.01
        }, 2000);
    }
}

const container = document.querySelector("#color_list");
const rangeConfig = document.querySelector("#range_config");
const colorConfig = document.querySelector("#color_config");

function addCubeInList() {
    allCube.forEach(element => {
        const html = `<option value="${element.color}">${element.color}</option>`;
        container.insertAdjacentHTML('beforeEnd', html);
        // console.log("ici : ", element);
    });
}

function submitted(event) {
    event.preventDefault();
    let color_value = document.getElementById('color_list').value
    let range_config = rangeConfig.value
    let color_config = colorConfig.value

    scene.traverse(child => {
        if(child.type === "Mesh") {
            child.material.wireframe = true;
            TweenMax.to(child.scale, .5, {x: 1, y: 1, z: 1})

            if (child.scale.x > 1 && child.scale.y > 1 && child.scale.z > 1) {
                rangeConfig.value = 1
            }

            if(child.color === color_value) {
                child.material.wireframe = false
                child.material.color = new THREE.Color(color_config)
                console.log(child.material.color);
                TweenMax.to(child.scale, .5, {x: range_config, y: range_config, z: range_config})
            } 
        }
    })
}

addCubeInList()

container.addEventListener('change', submitted)
rangeConfig.addEventListener('change', submitted)
colorConfig.addEventListener('change', submitted)

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

let animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += incrementValue1;
    cube.rotation.y += incrementValue1;

    cube2.rotation.x += incrementValue2;
    cube2.rotation.y += incrementValue2;

    controls.update()
    renderer.render( scene, camera );
};

animate();
window.addEventListener( 'resize', onWindowResize, false );