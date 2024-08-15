const { Router } = require("express");
const { Egc } = require("../Entity/Egc");
const { Egcservice } = require("../service/Egcservice");

var Egcrouter = Router();
var admSvc = new Egcservice();


// ==========================================    add    ====================================================

Egcrouter.post("/", async (req, res) => {
  let egc = req.body;
  let status = new String("N");
  egc.wld_deleted = status;
  let result = await admSvc

    .addEgc(egc)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add" })
    );


  if (result) {
    console.log("added");
    res.status(201).json({ message: "Added successfully" });
  }
});


// =========================================    delete    =====================================================

Egcrouter.post('/delete/:id', async (req, res) => {
  let egc = req.body
  let status = new String("Y");
  egc.wld_deleted = status;
  console.log('delete')
  let result = await admSvc
    .deleteEgc(egc)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json(result)
  }
})


// // ============================================    get all    ======================================================


Egcrouter.get("/get",async(req,res)=>{
// let admin = req.body;
let result = await admSvc
 .getAllEgcs()
 .catch((err)=>
 res.status(500).json({message:"Unable to add new Role"})
 );

if(result) {
console.log("2");
res.status(200).json(result);
 }
});



// // ===============================================    update    ====================================================

Egcrouter.post('/update/:id', async (req, res) => {
  let egc = req.body
  let datetime = new Date();
  datetime = datetime.toString("%d/%m/%Y, %H:%M:%S");
  egc.wld_updatedon = datetime;
  console.log('update')
  let result = await admSvc
    .updateEgc(egc)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})




module.exports = { Egcrouter };

