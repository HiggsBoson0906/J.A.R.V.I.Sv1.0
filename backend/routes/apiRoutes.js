const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const plannerController = require('../controllers/plannerController');
const topicController = require('../controllers/topicController');
const aiController = require('../controllers/aiController');
const sessionController = require('../controllers/sessionController');

router.get('/dashboard', dashboardController.getDashboard);
router.post('/generate-plan', plannerController.generatePlan);
router.get('/topic/:name', topicController.getTopic);
router.get('/resources', topicController.getResources);
router.post('/ask-doubt', aiController.askDoubt);
router.post('/study-session', sessionController.recordSession);
router.post('/suggest-goals', plannerController.suggestGoals);
router.get('/planner', plannerController.getPlanner);
router.get('/performance', dashboardController.getPerformance);

module.exports = router;
