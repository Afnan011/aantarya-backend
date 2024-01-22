const express = require("express");
const router = express.Router();
const {getTeams, getTeamById, updateTeamById, clearEvents, verifyUpload, sendEmail1} = require("../controller/teamController");

router.get('/', getTeams);

router.get("/:teamId", getTeamById);

router.get('/:teamId/verify', verifyUpload);

router.get('/:teamId/sendPayment1', sendEmail1);

router.put('/:teamId', updateTeamById);

router.put('/event/:teamId', clearEvents);




module.exports = router;