const {ScanCommand,PutItemCommand,QueryCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");





  class Commonservice {
    constructor() {
      this.TABLENAME = "welding_master";
    }


// ========================================================================================================================

  async getAllEntity() {
    let params = {
      TableName: this.TABLENAME,
      // FilterExpression : "Entity = :Backgastype OR Entity = :Pcategory",
      // ExpressionAttributeValues : { ":Backgastype": {S : "Backgastype"}, ":Pcategory": {S : "Pcategory"} }
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


// =============================================================================================================================

async getPcategory() {
  let params = {
    TableName: this.TABLENAME,
     FilterExpression : "Entity = :Pcategory",
     ExpressionAttributeValues : {":Pcategory": {S : "Pcategory"} }
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

// =====================================================================================================================

async getBackgastype() {
  let params = {
    TableName: this.TABLENAME,
     FilterExpression : "Entity = :Backgastype",
     ExpressionAttributeValues : {":Backgastype": {S : "Backgastype"} }
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


// ======================================================================================================================


async gettwoEntity() {
  let params = {
    TableName: this.TABLENAME,
    FilterExpression : "Entity = :Backgastype OR Entity = :Pcategory ",
    ExpressionAttributeValues : { ":Backgastype": {S : "Backgastype"}, ":Pcategory": {S : "Pcategory"} }
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


}


module.exports = { Commonservice }