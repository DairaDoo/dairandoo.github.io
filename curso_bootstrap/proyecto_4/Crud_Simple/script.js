let listaEmpleados = [];

// objeto empleado con 3 atributos vacios.
const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

// creamos constantes para conseguir cada valor del formulario mediante el id.
const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');


document.addEventListener('DOMContentLoaded', () => {
    const storedListaEmpleados = localStorage.getItem('listaEmpleados');

    if ( storedListaEmpleados ) {
        listaEmpleados = JSON.parse( storedListaEmpleados );
        mostrarEmpleados();
    }
});


// al dar sumbit llamamos la función validarFormulario.
formulario.addEventListener('submit', validarFormulario);


function validarFormulario(e) 
{
    e.preventDefault(); // esto evita que la función se ejecute de manera automática.

    // si el nombre y puesto estan vacios, devuelve el alert.
    if ( nombreInput.value === '' || puestoInput.value === '' ) 
    {
        alert('Todos los campos son obligatorios');
        return;
    }

    // si editando es cierto:
    if ( editando )
    {
        editarEmpleado();
        editando = false;
    }

    else // si es falso:
    {
        objEmpleado.id = Date.now(); // sacamos el tiempo en donde se creo el empleado basado en milisegundos.
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado()
{
    listaEmpleados.push({...objEmpleado}); // utilizamos el spread operator para copiar el objeto empleado.
    guardarListaEmpleados(); // Guardamos los empleados en el almacenamiento local.
    mostrarEmpleados();
    formulario.reset(); // esto limpia los inputs.
    limpiarObjeto();
}

function limpiarObjeto() 
{
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() 
{
    limpiarHTML()

    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach( empleado => {
        const { id, nombre, puesto } = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = id; // identificador de párrafo, para saber cuál borrar o modificar.

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado( empleado ); // aldar click a editar boton llamamos la función.
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append( editarBoton );

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () =>  eliminarEmpleado( id ); // aldar click a editar boton llamamos la función.
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append( eliminarBoton );

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado( empleado )
{
    const { id, nombre, puesto } = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualzar';

    editando = true;
}

function editarEmpleado() 
{
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    listaEmpleados.map( empleado => {
        if ( empleado.id === objEmpleado.id )
        {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
        }
    })

    guardarListaEmpleados();
    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = "Agregar";

    editando = false;
}

function eliminarEmpleado( id )
{
    listaEmpleados = listaEmpleados.filter( empleado => empleado.id !== id );
    guardarListaEmpleados();
    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() 
{
    const divEmpleados = document.querySelector('.div-empleados');
    
    while ( divEmpleados.firstChild ) 
    {
        divEmpleados.removeChild( divEmpleados.firstChild );
    }
}

function guardarListaEmpleados()
{
    localStorage.setItem( 'listaEmpleados', JSON.stringify( listaEmpleados ) );
}
