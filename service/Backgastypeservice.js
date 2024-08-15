const {ScanCommand,PutItemCommand,QueryCommand, DeleteItemCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Backgastype } = require("../Entity/Backgastype")

  

  class Backgastypeservice {
    constructor() {
      this.TABLENAME = "welding_master";
    }
  
// ========================================    add Pcategory    ==============================================

    addBackgastype(backgastype) {
      console.log(backgastype);
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

    var backgastype1 = new Backgastype(backgastype);

    let params = {

        TableName: this.TABLENAME,

        Item: marshall(backgastype1,marshallOptions)

    };

      let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
        console.log("err:" + err);
        return Promise.reject(err);
      });


      console.log("err1:" + result);
      return Promise.resolve(result);
    }

  // =======================================    get all    =================================================

  async getAllBackgastypes() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression : "Entity = :Backgastype",
      ExpressionAttributeValues : { ":Backgastype": {S : "Backgastype"} }
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

   async updateBackgastype(Backgastype) {
    console.log(Backgastype)
    let params = {
      TableName: this.TABLENAME,
      Key: {
        wld_master_id: { S: Backgastype.wld_master_id },
      },
      UpdateExpression: 'set #name=:nm,#wlddes=:de,#updatedon=:uon, #updatedby=:uby ',
      ExpressionAttributeNames: {
        '#name': 'wld_name',
        '#wlddes': 'wld_description',
        "#updatedon":"wld_updatedon",
        "#updatedby":"wld_updatedby"

      },
      ExpressionAttributeValues: {
        ':nm': { S: Backgastype.wld_name },
        ':de': { S: Backgastype.wld_description },
        ':uby': { S: Backgastype.wld_updatedby },
        ':uon': { S: Backgastype.wld_updatedon }
      },
      Item: marshall(Backgastype)
    
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


async deleteBackgastype(Backgastype) {
  console.log(Backgastype)
  let params = {
    TableName: this.TABLENAME,
    Key: {
      wld_master_id: { S: Backgastype.wld_master_id },
    },
    UpdateExpression: 'set #deleted=:dt',

    ExpressionAttributeNames: {
      '#deleted': 'wld_deleted',
    },
    ExpressionAttributeValues: {
      ':dt': { S: Backgastype.wld_deleted }
    },
    Item: marshall(Backgastype)
  
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
    



module.exports = { Backgastypeservice }