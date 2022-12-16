fetch("./productos.json")
.then(respuesta => respuesta.json())
.then(productosMascotas =>{
    
    let btnComprar = document.getElementById("comprar")
    btnComprar.onclick = () => {
        localStorage.clear()
        carrito.innerHTML = ""
    }

    let contenedorProductos = document.getElementById("contenedorProductos")
    let carrito = document.getElementById("carrito")
    let arrayCarrito = []

    if(localStorage.getItem("carrito")){
        arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
    }

    renderizarCarrito()
    renderizarProductos(productosMascotas)

    function renderizarProductos(arrayProductos){
        contenedorProductos.innerHTML = ""
        for (const producto of arrayProductos) {
        let tarjetaProducto = document.createElement("div")

        tarjetaProducto.className = "producto"

        tarjetaProducto.innerHTML = `
        <img src=${producto.imgUrl}>
        <h3 class="nombreProducto">${producto.nombre}</h3>
        <h4 class="precioProducto">$${producto.precio}</h4>
        <button class="botonProducto" id=${producto.id}>Agregar al carrito </button>
        <button class="botonEliminar" id=${producto.id}>Eliminar del carrito </button>`

        contenedorProductos.append(tarjetaProducto)
    }
    let botones = document.getElementsByClassName("botonProducto")
    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }
    let botonEliminar = document.getElementsByClassName("botonEliminar")
    for (const botonE of botonEliminar){
        botonE.addEventListener("click", eliminarDelCarrito)
    }
    }

    let input = document.getElementById("input")
    input.addEventListener("input", fnInput)

    function fnInput() {
        let productosFiltrados = productosMascotas.filter(producto => producto.nombre.includes(input.value))
        renderizarProductos(productosFiltrados)
    }

    function agregarAlCarrito(e){
        let productoBuscado = productosMascotas.find(producto => producto.id == e.target.id)
        let posicionProducto = arrayCarrito.findIndex(producto => producto.id == e.target.id)
        if (posicionProducto != -1) {
            arrayCarrito[posicionProducto] = {
                id: arrayCarrito[posicionProducto].id, nombre: arrayCarrito[posicionProducto].nombre, precio: arrayCarrito[posicionProducto].precio, unidades: arrayCarrito[posicionProducto].unidades + 1, subTotal: arrayCarrito[posicionProducto].precio * (arrayCarrito[posicionProducto].unidades +1)
            }
        }else{
        arrayCarrito.push({
        id: productoBuscado.id, nombre:productoBuscado.nombre, precio: productoBuscado.precio, unidades: 1, subTotal: productoBuscado.precio
        })
        }

        Swal.fire({
            title: 'Producto agregado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000 
          })

        let carritoJSON = JSON.stringify(arrayCarrito)
        localStorage.setItem("carrito", carritoJSON)
        renderizarCarrito()
    }

        function renderizarCarrito() {
            carrito.innerHTML= ""
            for (const itemCarrito of arrayCarrito) {
            carrito.innerHTML +=`
        <div class = itemCarrito>
         <h4>${itemCarrito.nombre}</h4>
         <h4>${itemCarrito.unidades}</h4>
         <h4>$${itemCarrito.subTotal}</h4>
        </div>
        `
    }
}

function eliminarDelCarrito(e){
    const index = arrayCarrito.findIndex(producto => producto.id == e.target.id)

    arrayCarrito.splice(index, 1)
    renderizarCarrito()
}
})
