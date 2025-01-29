
![Screenshot 2025-01-28 154402](https://github.com/user-attachments/assets/5fba19f6-ba2d-4894-92e5-d233ee970f23)

# Prescription Service API

URL: https://prescriptionservice-bzgca7a4a2feeqge.canadacentral-01.azurewebsites.net/api/v1

---

## Introduction

The **Prescription Service API** manages prescription creation, retrieval, and processing for both doctors and pharmacies. Authentication is required via JWT tokens.

## Features

- **Doctor Operations:** Create, retrieve, update, and delete prescriptions
- **Pharmacy Operations:** Process prescriptions, mark completion status
- **Search Functionality:** Find prescriptions by TC ID
- **Medicine Management:** Update and delete medicines within prescriptions

## API Documentation

### Doctor Endpoints

#### 1. Create Prescription
- **URL:** `/doctor/prescriptions`
- **Method:** `POST`
- **Description:** Create a new prescription
- **Request Body:**
  ```json
  {
    "tcId": "12345678901",
    "medicines": [
      {
        "name": "Aspirin",
        "dosage": "500mg",
        "quantity": 30
      }
    ]
  }
  ```

#### 2. Get Doctor's Prescriptions
- **URL:** `/doctor/prescriptions`
- **Method:** `GET`
- **Description:** Get all prescriptions created by authenticated doctor

#### 3. Get Prescription by TC ID
- **URL:** `/doctor/prescriptions/tc/{tcId}`
- **Method:** `GET`
- **Description:** Get prescriptions for a specific TC ID

### Pharmacy Endpoints

#### 1. Get Pending Prescriptions
- **URL:** `/pharmacy/prescriptions/pending`
- **Method:** `GET`
- **Description:** Retrieve all pending prescriptions

#### 2. Submit Partial Completion
- **URL:** `/pharmacy/prescriptions/{prescriptionId}`
- **Method:** `PATCH`
- **Description:** Update prescription with available medicines

#### 3. Mark Prescription Complete
- **URL:** `/pharmacy/prescriptions/{prescriptionId}/complete`
- **Method:** `PATCH`
- **Description:** Mark prescription as completed

## Security

- Authentication using Bearer JWT tokens
- Role-based access for doctors and pharmacies

For detailed schema information and additional endpoints, please refer to the full API documentation.
