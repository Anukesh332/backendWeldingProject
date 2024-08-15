const { v4: uuidv4 } = require('uuid');


class Backgastype{

    constructor (Backgastype) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.wld_master_id = uuidv4()
        console.log(this.wld_master_id)
        

       // this.CustId= SK

       
       this.wld_name = Backgastype.wld_name,
       
       this.wld_description = Backgastype.wld_description,
       
       this.wld_createdby = Backgastype.wld_createdby,

        this.wld_updatedby = Backgastype.wld_updatedby,

        this.wld_deleted =  Backgastype.wld_deleted,

        this.wld_createdon = new Date().toString("%d/%m/%Y, %H:%M:%S"),

        


        this.Entity = "Backgastype"


    }
}



module.exports = {Backgastype}