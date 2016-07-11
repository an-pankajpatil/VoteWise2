var Address = require('../models/address');
var User = require('../models/user');
var Geo = require('../models/geoDivPa');
var Questions = require('../models/questions');
var Category = require('../models/categories');

var saltRounds = 10;
var bcrypt = require('bcrypt');

var mailer = require('../middleware/mailer');
var jwt = require('jsonwebtoken');

var helpers = require('./controllers');

module.exports.isValidUser = function ( id, cb ) {
  console.log("isValidUser id: ",id);
  User.find({
    _id: id
  }, {_id: 1}, function ( err, category ) {
    console.log("err: ",err);
    console.log("category: ",category);

    if (err) return cb(false);
    if (category) return cb(true);
  });
};

module.exports.isValidCategoryIds = function ( ids, cb ) {
  console.log("ids: ",ids);
  Category.find({
    _id: {$in: ids}
  }, {_id: 1}, function ( err, category ) {
    console.log("err: ",err);
    console.log("category: ",category);

    if (err) return cb(false);
    if (category) {
      if(category.length == ids.length){
        return cb(true);
      }
      else
        return cb(false);
    };
  });
}

module.exports.storeQuestion = function (author, content, categories, res, app) {
  // Adding new question

  var question = new Questions({
    author: author,
    content: content,
    categories: categories
  });

  // Saving question
  Questions.save( function ( err, resData ) {
    if (err) {
      //res.status(400);
      console.log("err: ",err);
      return res.json( { success: false, error: "Unable to add question." } );
    }

    if(resData){
      return res.json({success: true, data: resData});
    }
  });
}

module.exports.getCategory = function (params, res, app) {
  // list all categories
  /*
  Category.remove({}, function ( err, user ) {
    if (err) console.log("unable to delte all");
    if (user) console.log("delte all");
  });
  */

  console.log("params: ",params);
  if(params.parentId){
    //show all the subcategories of given parent id
    // searchParam = { parentIds: { $elemMatch: { pid: params.parentId } } };
    
    Category.aggregate({$project: {_id: 1, title: 1, description: 1, parentIds: 1}}, {$unwind: "$parentIds"})
    .sort({ "parentIds.viewOrder" : 1})
    .exec(function ( err, resData ) {
      if (err) return res.json({success: false, error: err});
      // if (resData) return res.json({success: false, data: user});
      if (resData){
        var temp = [];
        resData.forEach(function(val, key){
          if(val.parentIds.pid == params.parentId){
            var obj = val
            obj.order = val.parentIds.viewOrder;
            //delete obj.parentIds;
            temp.push(obj);
          }
        });
        return res.json({success: true, data: temp})
      };
    });
  }
  else if(params.id){
    Category.find({_id: params.id}, {_id: 1, title: 1, description: 1, parentIds: 1})
    .exec(function ( err, user ) {
      if (err) return res.json({success: false, error: err});
      if (user) return res.json({success: true, data: user});
    });
  }
  else{
    //show all categories
    Category.find({}, {_id: 1, title: 1, description: 1, parentIds: 1})
    .exec(function ( err, user ) {
      if (err) return res.json({success: false, error: err});
      if (user) return res.json({success: true, data: user});
    });
  }
}

module.exports.removeCategory = function ( id, res, app ) {

  console.log("removeCategory: 2", id);

  Category.find({_id: id}, {_id: 1, title: 1, parentIds: 1})
  .exec(function ( err, resData ) {
    if (err) return res.json({success: false, error: err});
    if (resData) {
      Category.remove({_id: id}, function ( err, delData ) {
        if (err) console.log("unable to delte all");
        if (delData) res.json({success: true, data: delData});
      });


      Category.find({ parentIds: { $elemMatch: { pid: id } } }, {_id: 1})
      .sort({ "parentIds.viewOrder" : 1})
      .exec(function ( err, selData ) {
        if(selData){
          selData.forEach(function(val, key){
            //remove subcategories if any
            console.log("* subcategories: ", val._id);
            Category.update({_id: val._id},
              { $pull:  {parentIds: { pid: id }} },
              {multi: true})
            .exec(function ( err, delData2 ) {
              if (err) console.log("unable to delte all", err);
              if (delData2) console.log("deleted key: "+key+" delData: "+delData2);;
            });
          });
        }
      });
    };//resData
  });//find
}
