//===== DAL =====//
const _utQueryService = require("../DAL/utQueryService");

//===== BLL =====//
//const _utApplicationService = require("../BLL/utApplicationService");

module.exports.getAllByCode = async (code) => {
    console.log("   ut [getAllByCode] (params) code : ",code);
    
    // get UT from BDD filtered by code
    let data = await _utQueryService.getAllByCode(code);
    
    return data;
};