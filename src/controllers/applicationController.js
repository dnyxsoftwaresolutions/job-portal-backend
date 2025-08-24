const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

// Create: Submit a new job application
exports.submitApplication = async (req, res) => {
  try {
    const { name, email, description, jobRole } = req.body;
    if (!name || !email || !description || !jobRole) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const uniqueId = uuidv4();
    const newApplication = await prisma.application.create({
      data: {
        uniqueId,
        name,
        email,
        description,
        jobRole,
        receivedAt: new Date(),
      },
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Read: Get a single job application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) return res.status(404).json({ message: 'Application not found.' });

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Read: Get all job applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Update: Update a job application by ID
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, description, jobRole } = req.body;

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { name, email, description, jobRole },
    });

    res.status(200).json({
      message: 'Application updated successfully',
      application: updatedApplication,
    });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Application not found.' });
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete: Delete a job application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.application.delete({ where: { id } });
    res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Application not found.' });
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
