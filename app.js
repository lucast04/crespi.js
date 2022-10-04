// DOM - Traer botones de HTML
const clickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
const precioFinal = document.getElementById('totalDelPedido')
const btnComprar = document.getElementById('btn-comprar')
let contenido = document.getElementById("contenido")
const btnListado = document.getElementById("btnListado")


//crear array vacio para luego pushear precios del pedido
let carrito = []

// Funcion click del boton AGREGAR
clickButton.forEach(btn =>{
    btn.addEventListener('click', agregarAlCarrito)
})

// Funcion para seleccionar el producto de cada boton AGREGAR
function agregarAlCarrito(e){
       // Constante que indica cada boton
        const button = e.target
        
        // Atributo que sirve para elegir un contenedor mas cercano a una determinada clase
        const item = button.closest('.burger')

        // Seleccionar cada parte de la constante item, y de cada parte solo el contenido
        const nombreBurger = item.querySelector('.nombre').textContent;
        const precioBurger = item.querySelector('.precioBurger').textContent;

        // crear objeto que tome los datos del producto
        const datosProducto = {
        title: nombreBurger,
        precio: precioBurger,
        cantidad: 1
    }

    agregarBurgerAlCarrito(datosProducto)
}

//funcion para agregar las hamburguesas seleccionadas al carrito
function agregarBurgerAlCarrito(datosProducto){
    
    // crear variable para tomar el input de la tabla del carrito
    const btnInput = tbody.getElementsByClassName('input__elemento')

    //crear ciclo for para recorrer el carrito, si no se encuentra el producto se agrega 
    for(let i =0; i < carrito.length; i++){

    // crear ciclo if, para que si el titulo del producto del carrito es igual al producto que se quiere agregar, que se sume a la misma cantidad
    if(carrito[i].title === datosProducto.title){
            carrito[i].cantidad ++;
    
        // crear variable y se suma a la misma cantidad ya agregada dentro del input
        const inputValue = btnInput[i]
            inputValue.value++

            totalDelPedido()

        // se hace return null para que no retome el valor principal
        return null;
        }
    }

   //se agrega al array del carrito el producto seleccionado
    carrito.push(datosProducto)
    ingresarDatosAlCarrito()
}   

function ingresarDatosAlCarrito(){
    // se indica al tbody que empiece siempre en blanco
    tbody.innerHTML = ''
    carrito.map(item =>{
        // Se crea tr para introducir los productos en el carrito
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const contenidoTabla = `
        <th scope="row">1</th>
        <td class="table__productos">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__price"><p>${item.precio}</p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">X</button>
        </td>
        `

   //A traves de innerHTML, se introduce el contenido del producto elegido a la tabla
    tr.innerHTML = contenidoTabla;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', eliminarProdDelCarrito)
    })

    totalDelPedido()
}

// funcion para calcular el total del pedido
function totalDelPedido(){
    let total = 0;
    carrito.forEach((item) =>{
        //metodo para reemplazar el $
        const precioTotal = Number(item.precio.replace("$", ''))
        //formula para calcular el total multiplicando la cantidad elegida
        total = total + precioTotal*item.cantidad
    })
    precioFinal.innerHTML=`Total$${total}`
}

//funcion para eliminar el producto añadido
function eliminarProdDelCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector(".title").textContent;
    for(let i=0; i<carrito.length; i++){
        if(carrito[i].title === title){
            carrito.splice(i,1)
        }
    }
    tr.remove()
    totalDelPedido()
}

// funcion del boton para finalizar la compra
btnComprar.addEventListener('click', () =>{
    swal({
        title: "Compra Confirmada!",
        text: `Tu pedido llegara pronto!`,
        icon: "success",
        button: "Finalizar",
      });
})



// evento para el boton de envios
btnListado.addEventListener("click", mostrarLista)

//funcion del boton para que aparezca la lista
function mostrarLista(){
    //incorporacion de fetch para traer los productos almacenados en el array de json
    fetch('envios.json')
    .then(res => res.json())
    .then(datos =>{
        tabla(datos)
    })
}

// funcion para incorporar los productos en la tabla de HTML
function tabla(datos){
    contenido.innerHTML= ""
    for(let valor of datos){
        contenido.innerHTML += `
        <tr>
            <th scope="row">${valor.id}</th>
                <td>${valor.nombre}</td>
                <td>${valor.precio}</td>
        </tr>`
    }
}