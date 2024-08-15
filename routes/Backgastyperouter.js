const { Router } = require("express");
const { Backgastypeservice } = require("../service/Backgastypeservice");

var Backgastyperouter = Router();
var admSvc = new Backgastypeservice();


// ==========================================    add    ====================================================

Backgastyperouter.post("/", async (req, res) => {
  let backgastype = req.body;
  let status = new String("N");
  backgastype.wld_deleted = status;
  let result = await admSvc

    .addBackgastype(backgastype)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add" })
    );


  if (result) {
    console.log("added");
    res.status(201).json({ message: "Added successfully" });
  }
});


// =========================================    delete    =====================================================

Backgastyperouter.post('/delete/:id', async (req, res) => {
  let backgastype = req.body
  let status = new String("Y");
  backgastype.wld_deleted = status;
  console.log('delete')
  let result = await admSvc
    .deleteBackgastype(backgastype)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json(result)
  }
})


// // ============================================    get all    ======================================================


Backgastyperouter.get("/get",async(req,res)=>{
// let admin = req.body;
let result = await admSvc
 .getAllBackgastypes()
 .catch((err)=>
 res.status(500).json({message:"Unable to add new Role"})
 );

if(result) {
console.log("2");
res.status(200).json(result);
 }
});



// // ===============================================    update    ====================================================

Backgastyperouter.post('/update/:id', async (req, res) => {
  let backgastype = req.body
  let datetime = new Date();
  datetime = datetime.toString("%d/%m/%Y, %H:%M:%S");
  backgastype.wld_updatedon = datetime;
  console.log('update')
  let result = await admSvc
    .updateBackgastype(backgastype)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})




module.exports = { Backgastyperouter };

