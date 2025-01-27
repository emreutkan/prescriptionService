const Prescription = require('../models/prescriptionModel');

// Create a new prescription
const createPrescriptionHandler = async (req, res) => {
    try {
        const { tcId, medicines } = req.body;
        const doctorId = req.user.doctorId;

        const prescription = new Prescription({
            tcId,
            doctorId,
            medicines: medicines.map(med => ({
                name: med.name,
                quantity: med.quantity,
            })),
        });

        const savedPrescription = await prescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(500).json({ message: 'Error creating prescription', error });
    }
};

// Get prescriptions created by the logged-in doctor
const getDoctorPrescriptionsHandler = async (req, res) => {
    try {
        const doctorId = req.user.doctorId;

        const prescriptions = await Prescription.find({ doctorId });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
};

// Get prescriptions for a patient by TC ID
const getPrescriptionsByTcIdHandler = async (req, res) => {
    try {
        const { tcId } = req.params;

        const prescriptions = await Prescription.find({ tcId });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
};

// Get a specific prescription by ID
const getPrescriptionByIdHandler = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescription', error });
    }
};

// Update a specific medicine in a prescription
const updatePrescriptionMedicineHandler = async (req, res) => {
    try {
        const { prescriptionId, medicineId } = req.params;
        const { name, quantity } = req.body;

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        const medicineIndex = prescription.medicines.findIndex(
            medicine => medicine._id.toString() === medicineId
        );

        if (medicineIndex === -1) {
            return res.status(404).json({ message: 'Medicine not found in prescription' });
        }

        prescription.medicines[medicineIndex] = {
            ...prescription.medicines[medicineIndex],
            name: name || prescription.medicines[medicineIndex].name,
            quantity: quantity || prescription.medicines[medicineIndex].quantity,
        };

        const updatedPrescription = await prescription.save();
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ message: 'Error updating prescription medicine', error });
    }
};

// Delete a specific medicine from a prescription
const deleteMedicineFromPrescriptionHandler = async (req, res) => {
    try {
        const { prescriptionId, medicineId } = req.params;

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        prescription.medicines = prescription.medicines.filter(
            medicine => medicine._id.toString() !== medicineId
        );

        const updatedPrescription = await prescription.save();
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting medicine from prescription', error });
    }
};

// Delete a prescription
const deletePrescriptionHandler = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const prescription = await Prescription.findByIdAndDelete(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting prescription', error });
    }
};

module.exports = {
    createPrescriptionHandler,
    getDoctorPrescriptionsHandler,
    getPrescriptionsByTcIdHandler,
    getPrescriptionByIdHandler,
    updatePrescriptionMedicineHandler,
    deleteMedicineFromPrescriptionHandler,
    deletePrescriptionHandler,
};
