const { Router } = require("express");
const { Pcategory } = require("../Entity/Pcategory");
const { Wldinspagyservice } = require("../service/Wldinspagyservice");

var Wldinspagyrouter = Router();
var admSvc = new Wldinspagyservice();


// ==========================================    add    ====================================================

Wldinspagyrouter.post("/", async (req, res) => {
  let wldinspagy = req.body;
  let status = new String("N");
  wldinspagy.wld_deleted = status;
  let result = await admSvc

    .addWldinspagy(wldinspagy)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add" })
    );


  if (result) {
    console.log("added");
    res.status(201).json({ message: "Added successfully" });
  }
});


// =========================================    delete    =====================================================

Wldinspagyrouter.post('/delete/:id', async (req, res) => {
  let wldinspagy = req.body
  let status = new String("Y");
  wldinspagy.wld_deleted = status;
  console.log('delete')
  let result = await admSvc
    .deleteWldinspagy(wldinspagy)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json(result)
  }
})


// // ============================================    get all    ======================================================


Wldinspagyrouter.get("/get",async(req,res)=>{
// let admin = req.body;
let result = await admSvc
 .getAllWldinspagys()
 .catch((err)=>
 res.status(500).json({message:"Unable to add new Role"})
 );

if(result) {
console.log("2");
res.status(200).json(result);
 }
});



// // ===============================================    update    ====================================================

Wldinspagyrouter.post('/update/:id', async (req, res) => {
  let wldinspagy = req.body
  let datetime = new Date();
  datetime = datetime.toString("%d/%m/%Y, %H:%M:%S");
  wldinspagy.wld_updatedon = datetime;
  console.log('update')
  let result = await admSvc
    .updateWldinspagy(wldinspagy)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})




module.exports = { Wldinspagyrouter };

