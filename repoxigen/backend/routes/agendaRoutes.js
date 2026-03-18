import express from "express";
import {
  createAgenda,
  getAllAgenda,
  getParticipants,
  updateAgenda,
  deleteAgenda,
  kickParticipant,
  getAgendaDetail
} from "../controllers/agendaController.js";
import { submitAbsensi } from "../controllers/absensiController.js";
import { verifyToken, onlyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// KELOLA AGENDA
router.post("/", verifyToken, onlyAdmin, createAgenda);
router.get("/", verifyToken, getAllAgenda);

// GET DETAIL AGENDA
router.get('/:id_agenda', verifyToken, getAgendaDetail);
router.put("/:id_agenda", verifyToken, onlyAdmin, updateAgenda);
router.delete("/:id_agenda", verifyToken,onlyAdmin,deleteAgenda);

// KELOLA ANGGOTA
router.get("/:id_agenda/participants", verifyToken, onlyAdmin, getParticipants);
router.delete("/participants/:id_absensi", verifyToken, onlyAdmin, kickParticipant);
// router.post("/absen", verifyToken, submitAbsensi);
router.post('/:id_agenda/absen', verifyToken, submitAbsensi)

export default router;
