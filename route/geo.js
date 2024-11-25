const Router = require("@koa/router");
const joi = require('joi')
const router = new Router();
const geoRepo = require("../repo/geo");
const areaRepo = require("../repo/area");
const fetchApiData = require("../repo/fetchApi")
const validate = require("../middleware/validate");
let data = undefined;

router.post("/closest",validate.body({
    lat:joi.number().required().precision(15),
    lng:joi.number().required().precision(15),
    count:joi.number()
}) ,async (ctx) => {
    if (data === undefined || Math.floor(Date.now() / 1000) - data.timestamp>=6*60*60){//6 hours api data retention period
        data = await fetchApiData.fetchApiData()
    }
    if(ctx.v.body.count===undefined){
        ctx.body = await geoRepo.findNearestRoutes(data, ctx.v.body.lng, ctx.v.body.lat, 10);
    }else{
        ctx.body = await geoRepo.findNearestRoutes(data, ctx.v.body.lng, ctx.v.body.lat, ctx.v.body.count);
    }
});
router.post("/area", validate.body({
    lat1:joi.number().required().precision(15),
    lng1:joi.number().required().precision(15),
    lat2:joi.number().required().precision(15),
    lng2:joi.number().required().precision(15)
}) ,async (ctx) => {
    if (data === undefined || Math.floor(Date.now() / 1000) - data.timestamp>=6*60*60){//6 hours api data retention period
        data = await fetchApiData.fetchApiData()
    }
  ctx.body = await areaRepo.findPointsInRange(
    data,
    ctx.v.body.lng1,
    ctx.v.body.lat1,
    ctx.v.body.lng2,
    ctx.v.body.lat2
  );
});
module.exports = router;
