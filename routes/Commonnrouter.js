const { Router } = require("express");
const { Commonservice } = require("../service/Commonservice");

var Commonrouter = Router();
var admSvc = new Commonservice();


// ============================================    get all Entity    ============================================================

Commonrouter.get("/get",async(req,res)=>{
    let result = await admSvc
     .getAllEntity()
     .catch((err)=>
     res.status(500).json({message:"Unable to add new Role"})
     );
    
    if(result) {
    console.log("2");
    res.status(200).json(result);
     }
    });

// =======================================================================================================================


Commonrouter.get("/get/Pcategory",async(req,res)=>{
    let result = await admSvc
     .getPcategory()
     .catch((err)=>
     res.status(500).json({message:"Unable to add new Role"})
     );
    
    if(result) {
    console.log("2");
    res.status(200).json(result);
     }
    });


    // ===================================================================================================================

    Commonrouter.get("/get/Backgastype",async(req,res)=>{
        let result = await admSvc
         .getBackgastype()
         .catch((err)=>
         res.status(500).json({message:"Unable to add new Role"})
         );
        
        if(result) {
        console.log("2");
        res.status(200).json(result);
         }
        });


// ======================================================================================================================


Commonrouter.get(["/get/Backgastype/Pcategory","/get/Pcategory/Backgastype"],async(req,res)=>{
    let result = await admSvc
     .gettwoEntity()
     .catch((err)=>
     res.status(500).json({message:"Unable to add new Role"})
     );
    
    if(result) {
    console.log("2");
    res.status(200).json(result);
     }
    });


module.exports = { Commonrouter };
