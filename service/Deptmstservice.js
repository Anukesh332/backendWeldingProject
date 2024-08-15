const {ScanCommand,PutItemCommand,QueryCommand, DeleteItemCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Deptmst } = require("../Entity/Deptmst")

  

  class Deptmstservice {
    constructor() {
      this.TABLENAME = "welding_master";
    }
  
// ========================================    add Pcategory    ==============================================

    addDeptmst(deptmst) {
      console.log(deptmst);
    //   let params = {
    //     TableName: this.TABLENAME,
    //     Item: marshall(customer),
    //   };


      const marshallOptions = {

        // Whether to automatically convert empty strings, blobs, and sets to `null`.

        convertEmptyValues: false, // false, by default.

        // Whether to remove undefined values while marshalling.

        removeUndefinedValues: true, // false, by default.

        // Whether to convert typeof object to map attribute.

        convertClassInstanceToMap: true, // false, by default. <-- HERE IS THE ISSUE

    };

    var deptmst1 = new Deptmst(deptmst);

    let params = {

        TableName: this.TABLENAME,

        Item: marshall(deptmst1,marshallOptions)

    };

      let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
        console.log("err:" + err);
        return Promise.reject(err);
      });


      console.log("err1:" + result);
      return Promise.resolve(result);
    }

  // =======================================    get all    =================================================

  async getAllDeptmsts() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression : "Entity = :WldDepartmentmst",
      ExpressionAttributeValues : { ":WldDepartmentmst": {S : "WldDepartmentmst"} }
      }
   
    
    let result = await ddbClient.send(new ScanCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });
    console.log(result);
    let admins = [];
    result.Items.forEach((Item) => admins.push(unmarshall(Item)));
    return Promise.resolve(admins);
  
};





   // ==========================================    update    ==================================================

   async updateDeptmst(Deptmst) {
    console.log(Deptmst)
    let params = {
      TableName: this.TABLENAME,
      Key: {
        wld_master_id: { S: Deptmst.wld_master_id },
      },
      UpdateExpression: 'set #name=:nm,#wldid=:id,#updatedon=:uon, #updatedby=:uby ',
      ExpressionAttributeNames: {
        '#name': 'wld_name',
        '#wldid': 'wld_id',
        "#updatedon":"wld_updatedon",
        "#updatedby":"wld_updatedby"

      },
      ExpressionAttributeValues: {
        ':nm': { S: Deptmst.wld_name },
        ':id': { S: Deptmst.wld_id },
        ':uby': { S: Deptmst.wld_updatedby },
        ':uon': { S: Deptmst.wld_updatedon }
      },
      Item: marshall(Deptmst)
    
    }
    let result = ddbClient.send(new UpdateItemCommand(params)).catch((err) => {
      if (err) {
        console.error('Unable to Update entry', err)
      } else {
        console.log(`Updated the entry succesfully`)
      }
      return Promise.error(err);

    })
    return Promise.resolve(result);
  }



// =============================================    delete    =======================================================


async deleteDeptmst(Deptmst) {
  console.log(Deptmst)
  let params = {
    TableName: this.TABLENAME,
    Key: {
      wld_master_id: { S: Deptmst.wld_master_id },
    },
    UpdateExpression: 'set #deleted=:dt',

    ExpressionAttributeNames: {
      '#deleted': 'wld_deleted',
    },
    ExpressionAttributeValues: {
      ':dt': { S: Deptmst.wld_deleted }
    },
    Item: marshall(Deptmst)
  
  }
  let result = ddbClient.send(new UpdateItemCommand(params)).catch((err) => {
    if (err) {
      console.error('Unable to Update entry', err)
    } else {
      console.log(`Updated the entry succesfully`)
    }
    return Promise.error(err);

  })
  return Promise.resolve(result);
}



  }
    



module.exports = { Deptmstservice }