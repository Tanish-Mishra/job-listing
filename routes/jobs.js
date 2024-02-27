const express = require('express')
const Router = express.Router();
const {createJob,getJobById,editJobById,getAllJob} = require('../controllers/jobsController')
const verifyToken = require('../middlewares/authMiddleware')

Router.post('/create',verifyToken,createJob) 
Router.get('/details/:jobId',getJobById)
Router.put('/edit/:jobId',verifyToken,editJobById)
Router.get('/all-job',getAllJob)

module.exports = Router