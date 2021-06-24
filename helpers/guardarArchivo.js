const fs = require('fs');

const archivo = './database/data.json';
const guardarArchivo = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerArchivo = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarArchivo,
    leerArchivo
}