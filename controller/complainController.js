const catchAsync = require('../utilsServer/catchAsync');
const AppError = require('../utilsServer/appError');
const ComplainModel = require('../models/complain-model');
const User = require('../models/user-model');
const ComplainHistoryModel = require('../models/complain-model-history');
const complaintCreationEmail = require('../utilsServer/complainEmail');
const { getLocationOrigin } = require('next/dist/shared/lib/utils');
const uuid = require('uuid').v4;

async function forHelper(param) {
  const aca_coun = await User.find({
    typeOfUser: 'Admin-Staff',
    _id: {'$ne': param},
  });

  const fac = await User.find({
    typeOfUser: 'Academic-Council',
    _id: {'$ne': param},
  });

  var a = Math.floor(Math.random() * aca_coun.length);
  var b = Math.floor(Math.random() * aca_coun.length);

  var reviewer;

  if(a != b) reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[a], aca_coun[b]];

  else reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[0], aca_coun[1]];

  return reviewer;
}

async function forNormal(param) {
  const fac = await User.find({
    typeOfUser: 'Dean',
    _id: {'$ne': param},
  });

  const aca_coun = await User.find({
    typeOfUser: 'Academic-Council',
    _id: {'$ne': param},
  });

  var a = Math.floor(Math.random() * aca_coun.length);
  var b = Math.floor(Math.random() * aca_coun.length);

  var reviewer;

  if(a != b) reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[a], aca_coun[b]];

  else reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[0], aca_coun[1]];

  return reviewer;
}

async function forStudents(param) {
  const fac = await User.find({
    typeOfUser: 'Faculty',
    _id: {'$ne': param},
  });

  const chair = await User.find({
    typeOfUser: 'Chairman',
    _id: {'$ne': param},
  });

  const aca_coun = await User.find({
    typeOfUser: 'Academic-Council',
    _id: {'$ne': param},
  });

  var a = Math.floor(Math.random() * fac.length);
  var b = Math.floor(Math.random() * chair.length);
  var c = Math.floor(Math.random() * aca_coun.length);

  var reviewer=[fac[a], chair[b], aca_coun[c]];

  return reviewer;
}

async function forFaculty(param) {
  const fac = await User.find({
    typeOfUser: 'Dean',
    _id: {'$ne': param},
  });

  const chair = await User.find({
    typeOfUser: 'Chairman',
    _id: {'$ne': param},
  });

  const aca_coun = await User.find({
    typeOfUser: 'Academic-Council',
    _id: {'$ne': param},
  });

  const reviewer=[fac[Math.floor(Math.random() * fac.length)], chair[Math.floor(Math.random() * chair.length)], aca_coun[Math.floor(Math.random() * aca_coun.length)]];

  return reviewer;
}

async function forChairman(param) {
  const fac = await User.find({
    typeOfUser: 'Dean',
    _id: {'$ne': param},
  });

  const aca_coun = await User.find({
    typeOfUser: 'Academic-Council',
    _id: {'$ne': param},
  });

  var a = Math.floor(Math.random() * aca_coun.length);
  var b = Math.floor(Math.random() * aca_coun.length);

  var reviewer;

  if(a != b) reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[a], aca_coun[b]];

  else reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[0], aca_coun[1]];

  return reviewer;
}

async function forDean(param) {
  const fac = await User.find({
    typeOfUser: 'Pro-Vice-Chancellor',
    _id: {'$ne': param},
  });

  const aca_coun = await User.find({
    typeOfUser: 'Academic-Council',
    _id: {'$ne': param},
  });

  var a = Math.floor(Math.random() * aca_coun.length);
  var b = Math.floor(Math.random() * aca_coun.length);

  var reviewer;

  if(a != b) reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[a], aca_coun[b]];

  else reviewer=[fac[Math.floor(Math.random() * fac.length)], aca_coun[0], aca_coun[1]];

  return reviewer;
}

async function forAcaCouncil(param) {
  const fac = await User.find({
    typeOfUser: 'Pro-Vice-Chancellor',
    _id: {'$ne': param},
  });

  const aca_coun = await User.find({
    typeOfUser: 'Vice-Chancellor',
    _id: {'$ne': param},
  });

  var reviewer=[fac[0], aca_coun[0]];

  return reviewer;
}

async function forProVC(param) {
  const fac = await User.find({
    typeOfUser: 'Vice-Chancellor',
    _id: {'$ne': param},
  });

  return fac;
}

exports.activeComplains = async (req, res, next) => {
  const complains = await ComplainModel.find({
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
};

exports.allResolvedComplains = async (req, res, next) => {
  const complains = await ComplainModel.find({
    status: 'Close',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  //console.log(complains);

  res.status(200).json({
    status: 'success',
    complains,
  });
};

exports.createComplain = catchAsync(async (req, res, next) => {
  const { complainer, faulty, title, complaintext } =
    req.body.complain;

  //checking whether the complainer is faulty
  if (complainer === faulty) {
    return next(res.status(400).json("Complainer can't be accused"));
  }

  //checking whether the reviewer is a Faculty or Admin-Staff
  const faultyData = await User.findById(faulty);

  var reviewer;

  if(faultyData.typeOfUser == 'Helper') reviewer = await forHelper(complainer);
  else if(faultyData.typeOfUser == 'Student') reviewer = await forStudents(complainer);
  else if(faultyData.typeOfUser == 'Faculty') reviewer = await forFaculty(complainer);
  else if(faultyData.typeOfUser == 'Chairman') reviewer = await forChairman(complainer);
  else if(faultyData.typeOfUser == 'Dean') reviewer = await forDean(complainer);
  else if(faultyData.typeOfUser == 'Academic-Council') reviewer = await forAcaCouncil(complainer);
  else if(faultyData.typeOfUser == 'Pro-Vice-Chancellor') reviewer = await forProVC(complainer);
  else reviewer = await forNormal(complainer);

  try {
    let doc = await ComplainModel.create({
      title,
      complain: complaintext,
      evidence: req.body.evidence,
      complainer,
      faulty,
      reviewer,
    });

    await complaintCreationEmail.complaintCreationEmail(doc._id);

    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    return next(res.status(500).json('Server Error'));
  }
});

exports.createComplainMobile = catchAsync(async (req, res, next) => {
  const { complainer, faulty, reviewer, title, complaintext } =
    req.body.complain;
  console.log(req.body.complain);
  //checking whether the faulty and reviewer same paerson
  if (faulty === reviewer) {
    return next(
      res.status(400).json("Faulty and Reviewer can't ne the same person")
    );
  }

  //checking whether the complainer is faulty or reviewer
  if (complainer === faulty || complainer === reviewer) {
    return next(res.status(400).json("Complainer can't be faulty or reviewer"));
  }

  //checking whether the reviewer is a Faculty or Admin-Staff
  const faultyData = await User.findOne({
    email: faulty,
  });
  const reviewerData = await User.findOne({
    email: reviewer,
  });
  const complainerData = await User.findOne({
    email: complainer,
  });
  if (
    reviewerData.typeOfUser !== 'Faculty' &&
    reviewerData.typeOfUser !== 'Admin-Staff'
  ) {
    return next(
      res.status(400).json('Reviewer must be a Faculty or an Admin-Staff')
    );
  }

  try {
    let doc = await ComplainModel.create({
      title,
      complain: complaintext,
      evidence: req.body.evidence,
      complainer: {
        _id: complainerData._id,
      },
      reviewer: {
        _id: reviewerData._id,
      },
      faulty: {
        _id: faultyData._id,
      },
    });

    await complaintCreationEmail.complaintCreationEmail(doc._id);

    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    return next(res.status(500).json('Server Error'));
  }
});

exports.getByMeComplains = catchAsync(async (req, res, next) => {
  const complains = await ComplainModel.find({
    complainer: req.userID,
    status: 'Open',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  //console.log(complains);

  res.status(200).json({
    status: 'success',
    complains,
  });
});

exports.getByMeComplainsClosed = catchAsync(async (req, res, next) => {
  const complains = await ComplainModel.find({
    complainer: req.userID,
    status: 'Close',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  //console.log(complains);

  res.status(200).json({
    status: 'success',
    complains,
  });
});

exports.getAgainstMeComplains = catchAsync(async (req, res, next) => {
  let complains = await ComplainModel.find({
    faulty: req.userID,
    status: 'Open',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  //complain = JSON.stringify(complain);

  res.status(200).json({
    status: 'success',
    complains,
  });
});

exports.getAgainstMeComplainsClosed = catchAsync(async (req, res, next) => {
  let complains = await ComplainModel.find({
    faulty: req.userID,
    status: 'Close',
  })
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id')
    .populate('statuses.statusCloser');

  //complain = JSON.stringify(complain);

  res.status(200).json({
    status: 'success',
    complains,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const { text } = req.body;

    if (text.length < 1)
      return res.status(401).json('Comment should be atleast 1 character');

    const complain = await ComplainModel.findById(id);

    if (!complain) return res.status(404).json('Complain Not Found');

    const newComment = {
      _id: uuid,
      text,
      commenter: req.userID,
      date: Date.now(),
    };

    await complain.comments.unshift(newComment);
    await complain.save();

    await complaintCreationEmail.statusUpdateEmail(complain._id);

    return res.status(200).json(newComment._id);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server Error');
  }
});

exports.editMyComplain = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const editComplain = req.body.editComplain;
    const checkComplain = req.body.complain;

    //checking whether new faulty and reviewer are same
    if (editComplain.faulty === checkComplain.reviewer._id) {
      return res.status(400).json("Faulty and reviewer can't be same person");
    }

    //checking whether complainer and faulty are same
    if (editComplain.faulty === checkComplain.complainer._id) {
      return res.status(400).json("Faulty and complainer can't be same person");
    }

    //creating history of the complain
    let complainHistory = await ComplainHistoryModel.create({
      title: checkComplain.title,
      complain: checkComplain.complain,
      evidence: checkComplain.evidence,
      faulty: checkComplain.faulty,
      reviewer: checkComplain.reviewer,
      version: checkComplain.versionNumber,
    });

    //ading the new added evidence
    checkComplain.evidence.push(req.body.evidence);

    //to update the version and add versions list
    const newVersion = {
      _id: complainHistory._id,
      editor: req.body.user._id,
      date: checkComplain.createdAt,
    };

    checkComplain.versionNumber += 1;
    checkComplain.versions.unshift(newVersion);

    //editing the complaint
    let complain = await ComplainModel.findByIdAndUpdate(checkComplain._id, {
      title: editComplain.title,
      complain: editComplain.complaintext,
      evidence: checkComplain.evidence,
      versionNumber: checkComplain.versionNumber,
      versions: checkComplain.versions,
      faulty: editComplain.faulty,
      createdAt: Date.now(),
    })
      .populate('complainer')
      .populate('faulty')
      .populate('reviewer._id')
      .populate('comments.commenter')
      .populate('versions.editor')
      .populate('versions._id')
      .populate('statuses.statusCloser');

    await complaintCreationEmail.editComplainEmail(complain._id);

    res.status(200).json({
      status: 'success',
      complain,
    });
  } catch (error) {
    return next(res.status(500).json('Error in editing complain'));
  }
});
