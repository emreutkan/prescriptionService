const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');
const { PORT, MONGO_URI } = require('./utils/env');
const pharmacyRoutes = require('./routes/v1/pharmacyRoutes');
const doctorRoutes = require('./routes/v1/doctorRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/swagger');
});

app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/pharmacy', pharmacyRoutes);

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Doctor Service running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/swagger`);
});
