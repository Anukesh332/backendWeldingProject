const {ScanCommand,PutItemCommand,QueryCommand, DeleteItemCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Egc } = require("../Entity/Egc")

  

  class Egcservice {
    constructor() {
      this.TABLENAME = "welding_master";
    }
  
// ========================================    add Pcategory    ==============================================

    addEgc(egc) {
      console.log(egc);
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

    var egc1 = new Egc(egc);

    let params = {

        TableName: this.TABLENAME,

        Item: marshall(egc1,marshallOptions)

    };

      let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
        console.log("err:" + err);
        return Promise.reject(err);
      });


      console.log("err1:" + result);
      return Promise.resolve(result);
    }

  // =======================================    get all    =================================================

  async getAllEgcs() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression : "Entity = :EventGlobalConstants",
      ExpressionAttributeValues : { ":EventGlobalConstants": {S : "EventGlobalConstants"} }
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

   async updateEgc(Egc) {
    console.log(Egc)
    let params = {
      TableName: this.TABLENAME,
      Key: {
        wld_master_id: { S: Egc.wld_master_id },
      },
      UpdateExpression: 'set #accas=:aa,#name=:nm,#value=:vl,#updatedon=:uon, #updatedby=:uby ',
      ExpressionAttributeNames: {
        '#accas': 'wld_access_as',
        '#name': 'wld_name',
        '#value': 'wld_value',
        "#updatedon":"wld_updatedon",
        "#updatedby":"wld_updatedby"
      },
      ExpressionAttributeValues: {
        ':aa': { S: Egc.wld_access_as },
        ':nm': { S: Egc.wld_name },
        ':vl': { S: Egc.wld_value },
        ':uby': { S: Egc.wld_updatedby },
        ':uon': { S: Egc.wld_updatedon }
      },
      Item: marshall(Egc)
    
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


async deleteEgc(Egc) {
  console.log(Egc)
  let params = {
    TableName: this.TABLENAME,
    Key: {
      wld_master_id: { S: Egc.wld_master_id },
    },
    UpdateExpression: 'set #deleted=:dt',

    ExpressionAttributeNames: {
      '#deleted': 'wld_deleted',
    },
    ExpressionAttributeValues: {
      ':dt': { S: Egc.wld_deleted }
    },
    Item: marshall(Egc)
  
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


module.exports = { Egcservice }