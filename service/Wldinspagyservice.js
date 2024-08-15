const {ScanCommand,PutItemCommand,QueryCommand, DeleteItemCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Wldinspagy } = require("../Entity/Wldinspagy")

  

  class Wldinspagyservice {
    constructor() {
      this.TABLENAME = "welding_master";
    }
  
// ========================================    add Pcategory    ==============================================

    addWldinspagy(wldinspagy) {
      console.log(wldinspagy);
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

    var wldinspagy1 = new Wldinspagy(wldinspagy);

    let params = {

        TableName: this.TABLENAME,

        Item: marshall(wldinspagy1,marshallOptions)

    };

      let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
        console.log("err:" + err);
        return Promise.reject(err);
      });


      console.log("err1:" + result);
      return Promise.resolve(result);
    }

  // =======================================    get all    =================================================

  async getAllWldinspagys() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression : "Entity = :WldInspectionAgency",
      ExpressionAttributeValues : { ":WldInspectionAgency": {S : "WldInspectionAgency"} }
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

   async updateWldinspagy(Wldinspagy) {
    console.log(Wldinspagy)
    let params = {
      TableName: this.TABLENAME,
      Key: {
        wld_master_id: { S: Wldinspagy.wld_master_id },
      },
      UpdateExpression: 'set #ipag=:wia,#desp=:dp,#updatedon=:uon, #updatedby=:uby ',
      ExpressionAttributeNames: {
        '#ipag': 'wld_inspection_agency',
        '#desp': 'wld_description',
        "#updatedon":"wld_updatedon",
        "#updatedby":"wld_updatedby"

      },
      ExpressionAttributeValues: {
        ':wia': { S: Wldinspagy.wld_inspection_agency },
        ':dp': { S: Wldinspagy.wld_description },
        ':uby': { S: Wldinspagy.wld_updatedby },
        ':uon': { S: Wldinspagy.wld_updatedon }
      },
      Item: marshall(Wldinspagy)
    
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


async deleteWldinspagy(Wldinspagy) {
  console.log(Wldinspagy)
  let params = {
    TableName: this.TABLENAME,
    Key: {
      wld_master_id: { S: Wldinspagy.wld_master_id },
    },
    UpdateExpression: 'set #deleted=:dt',

    ExpressionAttributeNames: {
      '#deleted': 'wld_deleted',
    },
    ExpressionAttributeValues: {
      ':dt': { S: Wldinspagy.wld_deleted }
    },
    Item: marshall(Wldinspagy)
  
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
    



module.exports = { Wldinspagyservice }