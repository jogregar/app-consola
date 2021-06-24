require('colors');

const {inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareaBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const {guardarArchivo, leerArchivo} = require('./helpers/guardarArchivo');
const Tareas = require('./modelos/tareas');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasArchivo = leerArchivo();
    if (tareasArchivo) {
        tareas.cargarTareasFronArray(tareasArchivo);
    }
    
    do {
        // Se muestra el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletados(true);
                break;
            case '4':
                tareas.listarPendientesCompletados(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.cambiarEstadoTareas(ids);
                break;
            case '6':
                const id =await listadoTareaBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const borrar = await confirmar('¿Está seguro?');
                    if (borrar) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }
                }
                break;
        }
        guardarArchivo(tareas.listadoArr);
        await pausa();
    }while ( opt !== '0');
} 

main();