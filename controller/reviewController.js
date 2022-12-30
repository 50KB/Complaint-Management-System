const uuid = require('uuid').v4;

const catchAsync = require('../utilsServer/catchAsync');
const AppError = require('../utilsServer/appError');
const ComplainModel = require('../models/complain-model');
const User = require('../models/user-model');
const complaintEmail = require('../utilsServer/complainEmail');
const {
  complainCloseEmail,
  reviewerChangeEmail,
} = require('../utilsServer/reviewEmail');

async function forFaculty(params){
  var f;
  
  if(params.length == 3){
    f = await User.find({
      typeOfUser: 'Chairman',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}, {_id: {'$ne': params[2]._id}}],
    });
  } else if(params.length == 2){
    f = await User.find({
      typeOfUser: 'Chairman',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}],
    });
  }else{
    f = await User.find({
      typeOfUser: 'Chairman',
      $and: [{_id: {'$ne': params[0]._id}}],
    });
  }

  return f[Math.floor(Math.random() * f.length)]
}

async function forAdminStaff(params){
  var f;
  
  if(params.length == 3){
    f = await User.find({
      typeOfUser: 'Academic-Council',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}, {_id: {'$ne': params[2]._id}}],
    });
  } else if(params.length == 2){
    f = await User.find({
      typeOfUser: 'Academic-Council',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}],
    });
  }else{
    f = await User.find({
      typeOfUser: 'Academic-Council',
      $and: [{_id: {'$ne': params[0]._id}}],
    });
  }

  return f[Math.floor(Math.random() * f.length)]
}

async function forChairman(params){
  var f;
  
  if(params.length == 3){
    f = await User.find({
      typeOfUser: 'Dean',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}, {_id: {'$ne': params[2]._id}}],
    });
  } else if(params.length == 2){
    f = await User.find({
      typeOfUser: 'Dean',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}],
    });
  }else{
    f = await User.find({
      typeOfUser: 'Dean',
      $and: [{_id: {'$ne': params[0]._id}}],
    });
  }

  //console.log(f);

  var a = Math.floor(Math.random() * f.length);

  //console.log(f[a]);

  return f[a]._id;
}

async function forDean(params){
  var f;
  
  if(params.length == 3){
    f = await User.find({
      typeOfUser: 'Academic-Council',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}, {_id: {'$ne': params[2]._id}}],
    });
  } else if(params.length == 2){
    f = await User.find({
      typeOfUser: 'Academic-Council',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}],
    });
  }else{
    f = await User.find({
      typeOfUser: 'Academic-Council',
      $and: [{_id: {'$ne': params[0]._id}}],
    });
  }

  return f[Math.floor(Math.random() * f.length)]
}

async function forAcaCouncil(params){
  var f;
  
  if(params.length == 3){
    f = await User.find({
      typeOfUser: 'Pro-Vice-Chancellor',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}, {_id: {'$ne': params[2]._id}}],
    });
  } else if(params.length == 2){
    f = await User.find({
      typeOfUser: 'Pro-Vice-Chancellor',
      $and: [{_id: {'$ne': params[0]._id}}, {_id: {'$ne': params[1]._id}}],
    });
  }else{
    f = await User.find({
      typeOfUser: 'Pro-Vice-Chancellor',
      $and: [{_id: {'$ne': params[0]._id}}],
    });
  }

  return f[Math.floor(Math.random() * f.length)]
}

exports.myReviewComplains = catchAsync(async (req, res, next) => {
  const complains = await ComplainModel.find({
    reviewer: {_id: req.userID},
    status: 'Open',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  res.status(200).json({
    status: 'success',
    complains,
  });
});

exports.myReviewComplainsClosed = catchAsync(async (req, res, next) => {
  const complains = await ComplainModel.find({
    reviewer: {_id: req.userID},
    status: 'Close',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  res.status(200).json({
    status: 'success',
    complains,
  });
});

exports.closeComplain = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { user, comment } = req.body;

  const closer = await User.findById(user._id);

  if (!closer) return res.status(401).json('Closer does not exist');

  if (comment.length < 1)
    return res
      .status(401)
      .json('In order to close a complain, there must be a closing comment.');

  /*
    const newComment = {
      _id: uuid,
      text,
      commenter: req.userID,
      date: Date.now(),
    };
  */

  const newStatus = {
    statusComment: comment,
    statusCloser: user._id,
    statusDate: Date.now(),
  };

  const complain = await ComplainModel.findById(id);

  await complain.statuses.unshift(newStatus);

  await complain.save();

  var myCom = await ComplainModel.findById(id);

  if(myCom.reviewer.length == myCom.statuses.length){
    var p = await ComplainModel.findByIdAndUpdate(id, {
      status: 'Close',
    });

    await complainCloseEmail(complain._id);
  }

  res.status(201).json({
    status: 'success',
    complain,
  });
});

exports.reviewerChange = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { user } = req.body;

  const changer = await User.findById(user._id);

  if (!changer) return res.status(401).json('Changer does not exist');

  let complain = await ComplainModel.findById(id).populate('reviewer._id');

  var reviewer = complain.reviewer;

  var index = 0;

  //console.log(reviewer[1]._id, changer);

  for (var i = 0; i < reviewer.length; i++) {
    if(reviewer[i]._id.email == changer.email){
      index = i;
      break;
    }
  }

  if(changer.typeOfUser == 'Faculty') {
    reviewer[index] = await forFaculty(reviewer);
  }
  else if(changer.typeOfUser == 'Admin-Staff') reviewer[index] = await forAdminStaff(reviewer);
  else if(changer.typeOfUser == 'Chairman') reviewer[index] = await forChairman(reviewer);
  else if(changer.typeOfUser == 'Dean') reviewer[index] = await forDean(reviewer);
  else if(changer.typeOfUser == 'Academic-Council') reviewer[index] = await forAcaCouncil(reviewer);

  //console.log(reviewer);

  complain = await ComplainModel.findByIdAndUpdate(id, {
    reviewer: reviewer,
  });

  await reviewerChangeEmail(complain._id);

  res.status(201).json({
    status: 'success',
    complain,
  });
});
