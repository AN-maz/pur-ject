import express from 'express';
import * as humanioraController from '../controllers/humanioraController.js';
import {verifyToken, onlyHumaniora, onlyPengurus} from '../middlewares/authMiddleware.js';

const router = express.Router();

// FITUR ADMIN
router.post('/meet', verifyToken, onlyHumaniora,humanioraController.createMeet);
router.get('/meet',verifyToken, onlyHumaniora, humanioraController.getAllMeets);
router.get('/meet/:id_meet',verifyToken,onlyHumaniora,humanioraController.getMeetDetail);
router.put('/meet/:id_meet', verifyToken, onlyHumaniora, humanioraController.updateMeet);
router.post('/meet/kick', verifyToken,onlyHumaniora, humanioraController.kickPerseta);
router.delete('/meet/:id_meet', verifyToken, onlyHumaniora, humanioraController.deleteMeet)

// FITUR PENGURUS
router.post('/meet/absen',verifyToken,onlyPengurus,humanioraController.absenPengurus);

export default router;