const Prescription = require('../models/prescriptionModel');

const getPendingPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ status: 'Pending' });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
};
const submitPrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const { medicines, missingMedicines } = req.body;

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        prescription.medicines = medicines || prescription.medicines;
        prescription.missingMedicines = missingMedicines || [];
        prescription.pharmacyId = req.user.pharmacyId;
        prescription.IssuerPharmacyEmail = req.user.email; // Automatically set IssuerPharmacyEmail

        prescription.status =
            missingMedicines && missingMedicines.length > 0 ? 'Incomplete' : 'Completed';

        prescription.updatedAt = new Date();

        const updatedPrescription = await prescription.save();
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting prescription', error });
    }
};


const getIncompletePrescriptions = async (req, res) => {
    try {
        // Build the query filter
        // If the user is admin, we do NOT restrict by pharmacyId
        // Otherwise, only retrieve prescriptions for the user’s pharmacy
        let filter = { status: 'Incomplete' };

        if (req.user.email !== 'admin@admin.com') {
            // For non-admin users, add the pharmacyId condition
            filter.pharmacyId = req.user.pharmacyId;
        }

        // Fetch prescriptions based on the constructed filter
        const prescriptions = await Prescription.find(filter);
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incomplete prescriptions', error });
    }
};


const completePrescriptionHandler = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        prescription.missingMedicines = [];
        prescription.status = 'Completed';
        prescription.IssuerPharmacyEmail = req.user.email;
        prescription.updatedAt = new Date();

        const updatedPrescription = await prescription.save();
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ message: 'Error completing prescription', error });
    }
};

const searchPrescriptionByTcId = async (req, res) => {
    try {
        const { tcId } = req.params;

        const prescriptions = await Prescription.find({ tcId });
        if (!prescriptions.length) {
            return res.status(404).json({ message: 'No prescriptions found for the given TC ID' });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error searching prescriptions by TC ID', error });
    }
};



module.exports = {
    getPendingPrescriptions,
    submitPrescription,
    getIncompletePrescriptions,
    completePrescriptionHandler,
    searchPrescriptionByTcId,
};
