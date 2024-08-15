const { v4: uuidv4 } = require('uuid');


class Egc{

    constructor (Egc) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.wld_master_id = uuidv4()
        console.log(this.wld_master_id)
        

       // this.CustId= SK

        this.wld_access_as = Egc.wld_access_as

        this.wld_name = Egc.wld_name,

        this.wld_value = Egc.wld_value

        this.wld_createdby = Egc.wld_createdby,

        this.wld_updatedby = Egc.wld_updatedby,

        this.wld_deleted =  Egc.wld_deleted,

        this.wld_createdon = new Date().toString("%d/%m/%Y, %H:%M:%S"),


        this.Entity = "EventGlobalConstants"


    }
}



module.exports = {Egc}