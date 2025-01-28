const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    tcId: { type: String, required: true },
    doctorId: { type: String, required: true },
    pharmacyId: { type: String },
    IssuerPharmacyEmail: { type: String },
    medicines: [
        {
            name: { type: String, required: true }, // Name of the medicine
            quantity: { type: Number, required: true }, // Quantity prescribed
        },
    ],
    status: {
        type: String,
        enum: ['Pending', 'Incomplete', 'Completed'], // Prescribed status options
        default: 'Pending'
    },
    missingMedicines: [
        {
            name: { type: String }, // Name of the missing medicine
        },
    ],
    createdAt: { type: Date, default: Date.now }, // Timestamp of creation
    updatedAt: { type: Date, default: Date.now }, // Timestamp of the last update
});

// Add a pre-save hook to update `updatedAt` automatically on save
prescriptionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
