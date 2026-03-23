const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const plannerController = require('../controllers/plannerController');
const aiController = require('../controllers/aiController');
const sessionController = require('../controllers/sessionController');
const videoController = require('../controllers/videoController');
const practiceController = require('../controllers/practiceController');
const authController = require('../controllers/authController');

router.get('/dashboard', dashboardController.getDashboard);
router.post('/generate-plan', plannerController.generatePlan);
router.post('/ask-doubt', aiController.askDoubt);
router.post('/study-session', sessionController.recordSession);
router.post('/suggest-goals', plannerController.suggestGoals);
router.get('/planner', plannerController.getPlanner);
router.get('/performance', dashboardController.getPerformance);
router.post('/process-video', videoController.processVideo);
router.post('/sync-plan', dashboardController.syncPlan);

// Practice routes
router.get('/practice/subjects', practiceController.getSubjects);
router.get('/practice/topics',   practiceController.getTopics);
router.post('/practice/questions', practiceController.getQuestions);
router.post('/practice/submit',    practiceController.submitPractice);

// Auth routes
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);

module.exports = router;

