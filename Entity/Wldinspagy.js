const { v4: uuidv4 } = require('uuid');


class Wldinspagy{

    constructor (Wldinspagy) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.wld_master_id = uuidv4()
        console.log(this.wld_master_id)
        

       // this.CustId= SK

       
       this.wld_inspection_agency = Wldinspagy.wld_inspection_agency,
       
       this.wld_description = Wldinspagy.wld_description,
       
       this.wld_createdby = Wldinspagy.wld_createdby,

        this.wld_updatedby = Wldinspagy.wld_updatedby,

        this.wld_deleted =  Wldinspagy.wld_deleted,

        this.wld_createdon = new Date().toString("%d/%m/%Y, %H:%M:%S"),

        


        this.Entity = "WldInspectionAgency"


    }
}



module.exports = {Wldinspagy}