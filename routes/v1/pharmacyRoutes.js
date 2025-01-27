const express = require('express');
const {
    getPendingPrescriptions,
    submitPrescription,
    getIncompletePrescriptions, completePrescriptionHandler, searchPrescriptionByTcId,
} = require('../../controllers/pharmacyController');
const authMiddleware = require('../../../pharmacyService/middlewares/authMiddleware');

const router = express.Router();

router.get('/prescriptions/pending', authMiddleware, getPendingPrescriptions);
router.patch('/prescriptions/:prescriptionId', authMiddleware, submitPrescription);
router.get('/prescriptions/incomplete', authMiddleware, getIncompletePrescriptions);
router.patch('/prescriptions/:prescriptionId/complete', completePrescriptionHandler);
router.get('/prescriptions/search/:tcId', searchPrescriptionByTcId);

module.exports = router;
