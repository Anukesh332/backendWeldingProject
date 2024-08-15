const { Router } = require("express");
const { Deptmstservice } = require("../service/Deptmstservice");

var Deptmstrouter = Router();
var admSvc = new Deptmstservice();


// ==========================================    add    ====================================================

Deptmstrouter.post("/", async (req, res) => {
  let deptmst = req.body;
  let status = new String("N");
  deptmst.wld_deleted = status;
  let result = await admSvc

    .addDeptmst(deptmst)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add" })
    );


  if (result) {
    console.log("added");
    res.status(201).json({ message: "Added successfully" });
  }
});


// =========================================    delete    =====================================================

Deptmstrouter.post('/delete/:id', async (req, res) => {
  let deptmst = req.body
  let status = new String("Y");
  deptmst.wld_deleted = status;
  console.log('delete')
  let result = await admSvc
    .deleteDeptmst(deptmst)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json(result)
  }
})


// // ============================================    get all    ======================================================


Deptmstrouter.get("/get",async(req,res)=>{
// let admin = req.body;
let result = await admSvc
 .getAllDeptmsts()
 .catch((err)=>
 res.status(500).json({message:"Unable to add new Role"})
 );

if(result) {
console.log("2");
res.status(200).json(result);
 }
});



// // ===============================================    update    ====================================================

Deptmstrouter.post('/update/:id', async (req, res) => {
  let deptmst = req.body
  let datetime = new Date();
  datetime = datetime.toString("%d/%m/%Y, %H:%M:%S");
  deptmst.wld_updatedon = datetime;
  console.log('update')
  let result = await admSvc
    .updateDeptmst(deptmst)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})




module.exports = { Deptmstrouter };

