const express = require('express');
const {
    createPrescriptionHandler,
    getDoctorPrescriptionsHandler,
    getPrescriptionsByTcIdHandler,
    getPrescriptionByIdHandler,
    updatePrescriptionMedicineHandler,
    deleteMedicineFromPrescriptionHandler,
    deletePrescriptionHandler
} = require('../../controllers/doctorController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/prescriptions', authMiddleware, createPrescriptionHandler);
router.get('/prescriptions', authMiddleware, getDoctorPrescriptionsHandler);
router.get('/prescriptions/tc/:tcId', authMiddleware, getPrescriptionsByTcIdHandler);
router.get('/prescriptions/:prescriptionId', authMiddleware, getPrescriptionByIdHandler);
router.patch('/prescriptions/:prescriptionId/medicines/:medicineId', authMiddleware, updatePrescriptionMedicineHandler);
router.delete('/prescriptions/:prescriptionId/medicines/:medicineId', authMiddleware, deleteMedicineFromPrescriptionHandler);
router.delete('/prescriptions/:prescriptionId', authMiddleware, deletePrescriptionHandler);

module.exports = router;