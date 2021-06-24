const Tarea = require('./tarea');

/**
 * _listado:
 *  { uuid-12346736-121231-2: {id:12, desc:asd, completadoEn: 92929}}
 */

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFronArray(tareas=[]) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) =>{
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const completo = (completadoEn) 
            ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${completo}`);
        })

    }

    listarPendientesCompletados(completadas = true) {
        console.log();
        let i = 0;
        this.listadoArr.forEach(tarea =>{
            
            const {desc, completadoEn} = tarea;
            const completo = (completadoEn) 
                ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    i++;
                    console.log(`${(i + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            }else {
                if (!completadoEn) {
                    i++;
                    console.log(`${(i + '.').green} ${desc} :: ${completo}`);
                }
            }
        })
    }

    cambiarEstadoTareas( ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;