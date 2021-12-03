import { Router } from "express";
import { agregarmascota, editarmascota, obtenermascota, eliminarmascota,obtenermascotas } from "../controllers/adopcionController";

const adopcionRoutes = (app) => {
    const router = Router();
    app.use('/', router);

    router.get('/obtenermascotas', obtenermascotas);// todas las mascotas
    router.get('/obtenermascota/:id', obtenermascota);// Solo una mascota
    router.post('/agregarmascota', agregarmascota);
    router.put('/editarmascota/:id', editarmascota);
    router.delete('/eliminarmascota/:id', eliminarmascota);
}

export default adopcionRoutes;