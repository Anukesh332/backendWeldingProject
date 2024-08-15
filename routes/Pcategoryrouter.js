const { Router } = require("express");
const { Pcategory } = require("../Entity/Pcategory");
const { Pcategoryservice } = require("../service/Pcategoryservice");

var Pcategoryrouter = Router();
var admSvc = new Pcategoryservice();


// ==========================================    add    ====================================================

Pcategoryrouter.post("/", async (req, res) => {
  let pcategory = req.body;
  let status = new String("N");
  pcategory.wld_deleted = status;
  let result = await admSvc

    .addPcategory(pcategory)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add" })
    );


  if (result) {
    console.log("added");
    res.status(201).json({ message: "Added successfully" });
  }
});


// =========================================    delete    =====================================================

Pcategoryrouter.post('/delete/:id', async (req, res) => {
  let pcategory = req.body
  let status = new String("Y");
  pcategory.wld_deleted = status;
  console.log('delete')
  let result = await admSvc
    .deletePcategory(pcategory)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json(result)
  }
})


// // ============================================    get all    ======================================================


Pcategoryrouter.get("/get",async(req,res)=>{
// let admin = req.body;
let result = await admSvc
 .getAllPcategorys()
 .catch((err)=>
 res.status(500).json({message:"Unable to get all data"})
 );

if(result) {
console.log("2");
res.status(200).json(result);
 }
});



// // ===============================================    update    ====================================================

Pcategoryrouter.post('/update/:id', async (req, res) => {
  let pcategory = req.body
  let datetime = new Date();
  datetime = datetime.toString("%d/%m/%Y, %H:%M:%S");
  pcategory.wld_updatedon = datetime;
  console.log('update')
  let result = await admSvc
    .updatePcategory(pcategory)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})


// ===================================================    get by id    ======================================================



Pcategoryrouter.get("/get/:id", async (req, res) => {
  //let admin = req.body;
  var wld_master_id = req.params["id"];
  //   console.log("getbyId");
  //   console.log(CustomerCode);

  let result = await admSvc

    .getPcategoryById(wld_master_id)

    .catch((err) =>

      res.status(500).json({ message: "Unable to add" })

    );



  if (result) {

    console.log("2");

    console.log("getbyid");

    res.status(200).json(result);

  }

});



module.exports = { Pcategoryrouter };

