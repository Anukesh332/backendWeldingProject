const {ScanCommand,PutItemCommand,QueryCommand, DeleteItemCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Pcategory } = require("../Entity/Pcategory")

  

  class Pcategoryservice {
    constructor() {
      this.TABLENAME = "welding_master";
    }
  
// ========================================    add Pcategory    ==============================================

    addPcategory(pcategory) {
      console.log(pcategory);
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

    var pcategory1 = new Pcategory(pcategory);

    let params = {

        TableName: this.TABLENAME,

        Item: marshall(pcategory1,marshallOptions)

    };

      let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
        console.log("err:" + err);
        return Promise.reject(err);
      });


      console.log("err1:" + result);
      return Promise.resolve(result);
    }

  // =======================================    get all    =================================================

  async getAllPcategorys() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression : "Entity = :Pcategory",
      ExpressionAttributeValues : { ":Pcategory": {S : "Pcategory"} }
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

   async updatePcategory(Pcategory) {
    console.log(Pcategory)
    let params = {
      TableName: this.TABLENAME,
      Key: {
        wld_master_id: { S: Pcategory.wld_master_id },
      },
      UpdateExpression: 'set #wldno=:wpno,#wmaterial=:wm,#wldcategory=:wpc,#updatedon=:uon, #updatedby=:uby ',
      ExpressionAttributeNames: {
        '#wldno': 'wld_p_no',
        '#wmaterial': 'wld_material',
        '#wldcategory': 'wld_p_category',
        "#updatedon":"wld_updatedon",
        "#updatedby":"wld_updatedby"

      },
      ExpressionAttributeValues: {
        ':wpno': { S: Pcategory.wld_p_no },
        ':wm': { S: Pcategory.wld_material },
        ':wpc': { S: Pcategory.wld_p_category },
        ':uby': { S: Pcategory.wld_updatedby },
        ':uon': { S: Pcategory.wld_updatedon }
      },
      Item: marshall(Pcategory)
    
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


async deletePcategory(Pcategory) {
  console.log(Pcategory)
  let params = {
    TableName: this.TABLENAME,
    Key: {
      wld_master_id: { S: Pcategory.wld_master_id },
    },
    UpdateExpression: 'set #deleted=:dt',

    ExpressionAttributeNames: {
      '#deleted': 'wld_deleted',
    },
    ExpressionAttributeValues: {
      ':dt': { S: Pcategory.wld_deleted }
    },
    Item: marshall(Pcategory)
  
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



  
    


// ==============================================    get by id    =========================================================



async getPcategoryById(wld_master_id) {
  let params = {
    TableName: this.TABLENAME,
    KeyConditionExpression: "wld_master_id = :id",
    ExpressionAttributeValues: {
      ":id": { S: wld_master_id },
    },

  };

  let result = await ddbClient.send(new QueryCommand(params)).catch((err) => {
    console.log("err:" + err);
    return Promise.reject(err);
  });
  console.log(result);
  return Promise.resolve(result);

  // let admin = [];
  // result.Items.forEach((item) => admin.push(unmarshall(item)));
  // return Promise.resolve(admin);
}



  }




module.exports = { Pcategoryservice }