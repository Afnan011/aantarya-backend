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
    getTreasureMems
} = require('../controller/adminController')


router.get('/', adminRoute);


router.get('/get-ids', getAllTeams);

router.get('/get-coding-mems', getCodingMems)

router.get('/get-web-mems', getWebDesigningMems)

router.get('/get-itmanger-mems', getItManagerMems)

router.get('/get-designing-mems', getDesigningMems)

router.get('/get-dumbcharades-mems', getDumbCharadesMems)

router.get('/get-photography-mems', getPhotographyMems)

router.get('/get-productlaunch-mems', getProductLaunchMems)

router.get('/get-quiz-mems', getQuizMems)

router.get('/get-debate-mems', getDebateMems)

router.get('/get-dance-mems', getDanceMems)

router.get('/get-gaming-mems', getGamingMems)

router.get('/get-treasure-mems', getTreasureMems)

module.exports = router;


// coding: [seperate], 2
// web: [seperate], 2
 
// itManager: [pg], 1
// designing: [pg], 1

// dumbCharades: [ug], 2

// photography: [combined], 1
// productLaunch: [combined], 1
// debate: [combined], 1
// quiz: [combined], 2
// dance: [combined], 5
// gaming: [combined], 2
// treasure: [combined], 2