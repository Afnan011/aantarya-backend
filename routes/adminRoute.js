const express = require("express");
const router = express.Router();
const {adminRoute, 
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


router.get('/', adminRoute);


router.get('/get-ids', getAllTeams);

router.get('/get-ids/:teamId', getTeamById);

router.get('/get-coding-mems', getCodingMems)

router.get('/get-web-mems', getWebDesigningMems)

router.get('/get-itmanger-mems', getItManagerMems)

router.get('/get-designing-mems', getDesigningMems)

router.get('/get-dumbcharades-mems', getDumbCharadesMems)

router.get('/get-photography-mems', getPhotographyMems)

router.get('/get-productlaunch-mems', getProductLaunchMems)

router.get('/get-quiz-mems', getQuizMems)

router.get('/get-debate-mems', getDebateMems)

router.get('/get-gaming-mems', getGamingMems)

router.get('/get-treasure-mems', getTreasureMems)

router.get('/get-dance-mems', getDanceMems)


router.put('/update-team-status/:teamId', updateTeamStatus);


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