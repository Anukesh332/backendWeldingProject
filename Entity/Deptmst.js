const { v4: uuidv4 } = require('uuid');


class Deptmst{

    constructor (Department_mst) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.wld_master_id = uuidv4()
        console.log(this.wld_master_id)
        

       // this.CustId= SK

       
       this.wld_name = Department_mst.wld_name,
       
       this.wld_id = Department_mst.wld_id,
       
       this.wld_createdby = Department_mst.wld_createdby,

        this.wld_updatedby = Department_mst.wld_updatedby,

        this.wld_deleted =  Department_mst.wld_deleted,

        this.wld_createdon = new Date().toString("%d/%m/%Y, %H:%M:%S"),

        


        this.Entity = "WldDepartmentmst"


    }
}



module.exports = {Deptmst}