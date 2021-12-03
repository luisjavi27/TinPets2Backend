import executeQuery from "../services/mysql.service"

const obtenermascotas = async (req, res) => {
    try{
        const response = await executeQuery('SELECT * FROM mascotas');
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response : null
        }
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}


const obtenermascota  = (req, res) => {
        const {id} = req.params;
        executeQuery(`SELECT * FROM mascotas WHERE idmascotas = ${req.params.id}`).then((response) => {
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response[0] : null
        }
        res.json(data);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
}
const agregarmascota = async(req, res) => {
    const {nombre, edad, especie, fundacion, especial} = req.body;  // aqui se deben agregar las columnas de la tabal que quiero llamar
    try{
        const response = await executeQuery(`INSERT INTO mascotas (nombre, edad, especie, fundacion, especial) VALUES ('${nombre}', ${edad}, '${especie}', '${fundacion}', '${especial}')`);
        res.status(201).json({message: 'created', id: response.insertId});
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
const editarmascota = async(req, res) => {
    const {nombre, edad, especie, fundacion, especial} = req.body;
    console.log("edad ", edad);
    try{
        const response = await executeQuery(`UPDATE mascotas SET nombre = '${nombre}', edad = ${edad}, especie = '${especie}', 
                                            fundacion = '${fundacion}', especial = '${especial}' WHERE idmascotas = ${req.params.id}`);
        console.log("edad back", edad);
        if(response.affectedRows > 0){
            res.json({message: 'updated'});
        }else{
            res.status(404).json({message: `No existe registro con id: ${req.params.id}`})
        }
    }catch(error){
        console.log("error editar",error);
        res.status(500).send(error);
    }
}
const eliminarmascota = async(req, res) => {
    try{
        const response = await executeQuery(`DELETE FROM mascotas WHERE idmascotas = ${req.params.id}`);
        // console.log(response);
        if(response.affectedRows > 0){
            res.json({message: 'deleted'});
        }else{
            res.status(404).json({message: `No existe registro con id: ${req.params.id}`})
        }
    }catch(error){
        console.log("error eliminar",error);
        res.status(500).send(error);
    }
}

export {obtenermascotas, obtenermascota, agregarmascota, editarmascota, eliminarmascota}
