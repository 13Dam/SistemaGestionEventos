const Activity = require("../models/activityModel");

//Valida si hay solapamiento de horarios en una misma sala
const hayConflictoSala = async ({
  eventoId,
  salaId,
  fechaInicio,
  fechaFin,
}) => {
  return await Activity.findOne({
    eventoId,
    salaId,
    $or: [
      {
        fechaInicio: { $lt: fechaFin },
        fechaFin: { $gt: fechaInicio },
      },
    ],
  });
};

//Valida si el expositor ya tiene otra actividad en ese horario
const hayConflictoExpositor = async ({
  eventoId,
  expositorId,
  fechaInicio,
  fechaFin,
}) => {
  return await Activity.findOne({
    eventoId,
    expositorId,
    $or: [
      {
        fechaInicio: { $lt: fechaFin },
        fechaFin: { $gt: fechaInicio },
      },
    ],
  });
};

//Crear actividad (ya se validaron conflictos antes)
const crearActividad = async (datos) => {
  const actividad = new Activity(datos);
  return await actividad.save();
};

module.exports = {
  hayConflictoSala,
  hayConflictoExpositor,
  crearActividad,
};
