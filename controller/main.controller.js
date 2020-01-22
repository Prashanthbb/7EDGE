const MongoClient = require('mongodb').MongoClient;
const assertabc = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const DatabaseName = 'Employee_details';

exports.employee_create = function (req, res) {
  let insert_data= {
    name:req.body.name,
    employee_id:req.body.employee_id,
    date_of_birth:req.body.date_of_birth,
    report_to:req.body.report_to,
    created_date:new Date(),
    updated_at:new Date()
  }

  MongoClient.connect(url, function(err, client) {
    assertabc.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(DatabaseName);
    db.collection('users').insert(insert_data, function(err,result){
      assertabc.equal(null, err);
      client.close();
      console.log(result);

      res.send('created employee successfully ')
    })
  });
};

exports.employee_delete = function (req, res) {
  var where = {
    employee_id : req.body.employee_id
  };

  MongoClient.connect(url, function(err, client) {
    assertabc.equal(null, err);
    const db = client.db(DatabaseName);
    // to get removing employee's reporters details
    db.collection('users').find(where).toArray(function(err,result){
      if(result && result.length > 0){
        //updating data to all the reporters with new reportee employee id
        var update_data = {
          report_to   : result[0].report_to,
          updated_at  : new Date()
        }
        var update_where = {
          report_to : req.body.employee_id
        } 
        db.collection("users").update(update_where,{$set: update_data},{multi:true},function(err,update_result){
          if (err) return next(err);
          db.collection("users").deleteOne(where, function (err,remove_result)  {
            if (err) return next(err);
            res.send({code:200,message:'employee removed successfully '})
          })
        })
      }else{
        res.send({code:204,message:'Employee Not available'})
      }
    })
  })
};
