const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

/**
 * @swagger
 * tags:
 *   - name: Applications
 *     description: API for managing job applications
 * components:
 *   schemas:
 *     JobApplication:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - description
 *         - jobRole
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the applicant
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email of the applicant
 *           example: johndoe@example.com
 *         description:
 *           type: string
 *           description: A brief description or cover letter
 *           example: Applying for the Senior Backend Developer position
 *         jobRole:
 *           type: string
 *           description: The job role the applicant is applying for
 *           example: Senior Backend Developer
 *     ApplicationResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60c72b2f9b1d1f001c8e4d3a"
 *         uniqueId:
 *           type: string
 *           example: "8e9e1c1b-6d6f-4d4b-9e4a-1c1b6d6f4d4b"
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         description:
 *           type: string
 *           example: Applying for the Senior Backend Developer position
 *         jobRole:
 *           type: string
 *           example: Senior Backend Developer
 *         receivedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T10:30:00Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T10:30:00Z"
 *
 * /api/applications:
 *   post:
 *     summary: Submit a new job application
 *     tags:
 *       - Applications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobApplication'
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application submitted successfully
 *                 application:
 *                   $ref: '#/components/schemas/ApplicationResponse'
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Something went wrong
 *   get:
 *     summary: Get all job applications
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: A list of all job applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ApplicationResponse'
 *       500:
 *         description: Something went wrong
 *
 * /api/applications/{id}:
 *   get:
 *     summary: Get a single job application by ID
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the job application
 *     responses:
 *       200:
 *         description: Application found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationResponse'
 *       404:
 *         description: Application not found
 *       500:
 *         description: Something went wrong
 *   put:
 *     summary: Update a job application by ID
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the job application to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobApplication'
 *     responses:
 *       200:
 *         description: Application updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application updated successfully
 *                 application:
 *                   $ref: '#/components/schemas/ApplicationResponse'
 *       404:
 *         description: Application not found
 *       500:
 *         description: Something went wrong
 *   delete:
 *     summary: Delete a job application by ID
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the job application to delete
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *       404:
 *         description: Application not found
 *       500:
 *         description: Something went wrong
 */

// Routes
router.post('/applications', applicationController.submitApplication);
router.get('/applications', applicationController.getAllApplications);
router.get('/applications/:id', applicationController.getApplicationById);
router.put('/applications/:id', applicationController.updateApplication);
router.delete('/applications/:id', applicationController.deleteApplication);

module.exports = router;
