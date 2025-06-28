const Activity = require("../models/activityModel");
const {
  hayConflictoSala,
  hayConflictoExpositor,
  crearActividad,
} = require("../services/scheduleService");

//Listar todas las actividades de un evento
const getActivitiesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const activities = await Activity.find({ eventoId: eventId })
      .populate("salaId")
      .populate("expositorId");
    res.json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las actividades", error });
  }
};

//Crear una nueva actividad con validación de conflictos
const createActivity = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      eventoId,
      salaId,
      expositorId,
      fechaInicio,
      fechaFin,
    } = req.body;

    const conflictoSala = await hayConflictoSala({
      eventoId,
      salaId,
      fechaInicio,
      fechaFin,
    });

    if (conflictoSala) {
      return res.status(409).json({
        message: "Conflicto: la sala ya está ocupada en ese horario.",
      });
    }

    const conflictoExpositor = await hayConflictoExpositor({
      eventoId,
      expositorId,
      fechaInicio,
      fechaFin,
    });

    if (conflictoExpositor) {
      return res.status(409).json({
        message: "Conflicto: el expositor ya está asignado en ese horario.",
      });
    }

    const nuevaActividad = await crearActividad({
      titulo,
      descripcion,
      eventoId,
      salaId,
      expositorId,
      fechaInicio,
      fechaFin,
    });

    res.status(201).json({
      message: "Actividad creada correctamente",
      actividad: nuevaActividad,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la actividad", error });
  }
};

//Obtener una sola actividad
const getActivityById = async (req, res) => {
  try {
    const { activityId } = req.params;
    const actividad = await Activity.findById(activityId)
      .populate("salaId")
      .populate("expositorId");

    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    res.json(actividad);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la actividad", error });
  }
};

//Actualizar actividad
const updateActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const datosActualizados = req.body;

    const actividadExistente = await Activity.findById(activityId);
    if (!actividadExistente) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    const actividadActualizada = await Activity.findByIdAndUpdate(
      activityId,
      datosActualizados,
      { new: true }
    );

    res.json({
      message: "Actividad actualizada",
      actividad: actividadActualizada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la actividad", error });
  }
};

//Eliminar una actividad
const deleteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const actividad = await Activity.findByIdAndDelete(activityId);

    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    res.json({ message: "Actividad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la actividad", error });
  }
};

module.exports = {
  getActivitiesByEvent,
  createActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
};
