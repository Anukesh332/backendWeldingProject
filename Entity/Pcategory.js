const { v4: uuidv4 } = require('uuid');


class Pcategory{

    constructor (Pcategory) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.wld_master_id = uuidv4()
        console.log(this.wld_master_id)
        

       // this.CustId= SK

        this.wld_p_no = Pcategory.wld_p_no,

        this.wld_p_category = Pcategory.wld_p_category,

        this.wld_material = Pcategory.wld_material,

        this.wld_createdby = Pcategory.wld_createdby,


        this.wld_updatedby = Pcategory.wld_updatedby,

        this.wld_deleted =  Pcategory.wld_deleted,

        this.wld_createdon = new Date().toString("%d/%m/%Y, %H:%M:%S"),

        


        this.Entity = "Pcategory"


    }
}



module.exports = {Pcategory}