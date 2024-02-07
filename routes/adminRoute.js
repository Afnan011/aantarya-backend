const express = require("express");
const router = express.Router();
const {verifyAdmin} = require('../middleware/validation')
const {
    adminRoute, 
    getAllTeams, 
    getCodingMems, 
    getWebDesigningMems,
    getItManagerMems,
    getDesigningMems,
    getDumbCharadesMems,
    getPhotographyMems,
    getProductLaunchMems,
    getQuizMems,
    getDebateMems,
    getDanceMems,
    getGamingMems,
    getTreasureMems,
    getTeamById,
    updateTeamStatus
} = require('../controller/adminController')


router.get('/',verifyAdmin, adminRoute);


router.get('/get-ids',verifyAdmin, getAllTeams);

router.get('/get-ids/:teamId',verifyAdmin, getTeamById);

router.get('/get-coding-mems',verifyAdmin, getCodingMems)

router.get('/get-web-mems', verifyAdmin, getWebDesigningMems)

router.get('/get-itmanger-mems', verifyAdmin, getItManagerMems)

router.get('/get-designing-mems', verifyAdmin, getDesigningMems)

router.get('/get-dumbcharades-mems', verifyAdmin, getDumbCharadesMems)

router.get('/get-photography-mems', verifyAdmin, getPhotographyMems)

router.get('/get-productlaunch-mems', verifyAdmin, getProductLaunchMems)

router.get('/get-quiz-mems', verifyAdmin, getQuizMems)

router.get('/get-debate-mems', verifyAdmin, getDebateMems)

router.get('/get-gaming-mems', verifyAdmin, getGamingMems)

router.get('/get-treasure-mems', verifyAdmin, getTreasureMems)

router.get('/get-dance-mems', verifyAdmin, getDanceMems)


router.put('/update-team-status/:teamId', verifyAdmin, updateTeamStatus);


module.exports = router;


// coding: [seperate], 2
// web: [seperate], 2
 
// itManager: [pg], 1
// designing: [pg], 1
// photography: [combined], 1
// productLaunch: [combined], 1
// debate: [combined], 1

// dumbCharades: [ug], 2

// quiz: [combined], 2
// gaming: [combined], 2
// treasure: [combined], 2
// dance: [combined], 5

// test routes
/*
https://mca-fest-v1.onrender.com/admin/get-coding-mems
https://mca-fest-v1.onrender.com/admin/get-web-mems
https://mca-fest-v1.onrender.com/admin/get-itmanger-mems
https://mca-fest-v1.onrender.com/admin/get-designing-mems
https://mca-fest-v1.onrender.com/admin/get-dumbcharades-mems
https://mca-fest-v1.onrender.com/admin/get-photography-mems
https://mca-fest-v1.onrender.com/admin/get-productlaunch-mems
https://mca-fest-v1.onrender.com/admin/get-quiz-mems
https://mca-fest-v1.onrender.com/admin/get-debate-mems
https://mca-fest-v1.onrender.com/admin/get-gaming-mems
https://mca-fest-v1.onrender.com/admin/get-treasure-mems
https://mca-fest-v1.onrender.com/admin/get-dance-mems

*/