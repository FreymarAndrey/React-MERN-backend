/* 
    Event Routes
    /api/events
*/
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEventos,
} = require("../controllers/events");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Todas tienen que pasar por la validación del JWT
//Obtener Eventos
router.get("/", validarJWT, getEventos);

// Crear un evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
    validarJWT,
  ],
  crearEvento
);

// Actualizar Evento
router.put("/:id", validarJWT, actualizarEvento);

//Borrar evento
router.delete("/:id", validarJWT, eliminarEventos);

module.exports = router;
