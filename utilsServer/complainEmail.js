const catchAsync = require('./catchAsync');
const sendEmail = require('./email');

const ComplainModel = require('./../models/complain-model');
const User = require('../models/user-model');
//const Complain = require('./../models/complain-model');

exports.complaintCreationEmail = catchAsync(async (id) => {
  //console.log(id);
  const complain = await ComplainModel.findById(id);

  const complainer = await User.findById(complain.complainer).select(
    'name email'
  );
  const faulty = await User.findById(complain.faulty).select('name email');
  const reviewer = await User.findById(complain.reviewer).select('name email');

  const complainerName = complainer.name;
  const faultyName = faulty.name;
  const reviewerName = reviewer.name;

  let message = `Complain Title: ${complain.title} \n\n ${complainerName}, your complain has been lodged against ${faultyName}, and your selected ${reviewerName} as the reviewer`;

  await sendEmail({
    email: complainer.email,
    subject: 'Complain Lodged',
    message,
  });

  message = `Complain Title: ${complain.title} \n\n ${faultyName}, there is a complain against you made by ${complainerName}, and ${reviewerName} is the reviewer`;

  await sendEmail({
    email: faulty.email,
    subject: 'Complain against you',
    message,
  });

  message = `Complain Title: ${complain.title} \n\n ${reviewerName}, there is a complain to review, against ${faultyName} by ${complainerName}`;

  await sendEmail({
    email: reviewer.email,
    subject: 'Complain to review',
    message,
  });
});

exports.editComplainEmail = catchAsync(async (id) => {
  const complain = await ComplainModel.findById(id)
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer')
    .populate('comments.commenter')
    .populate('versions.editor')
    .populate('versions._id');

  const complainer = complain.complainer;
  const faulty = complain.faulty;
  const reviewer = complain.reviewer;
  const editor = complain.versions[0].editor;

  let message;

  if (complain.faulty._id === complain.versions[0]._id.faulty) {
    message = `Complain Title: ${complain.title}\n\nThis complain has been updated\n\nComplainer: ${complainer.name}\nFaulty: ${faulty.name}\nReviewer: ${reviewer.name}`;

    await sendEmail({
      email: faulty.email,
      subject: 'Complain Edited against you',
      message,
    });
  } else {
    message = `Complain Title: ${complain.title}\n\nThis complain has been updated\n\nComplainer: ${complainer.name}\nNew Faulty: ${faulty.name}\nReviewer: ${reviewer.name}`;

    await sendEmail({
      email: faulty.email,
      subject: 'Complain lodged against you',
      message,
    });
  }

  await sendEmail({
    email: complainer.email,
    subject: 'Complain Edited',
    message,
  });

  await sendEmail({
    email: reviewer.email,
    subject: 'Edited Complain to review',
    message,
  });
});

exports.statusUpdateEmail = catchAsync(async (id) => {
  const complain = await ComplainModel.findById(id)
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer')
    .populate('comments.commenter');

  const complainer = complain.complainer;
  const faulty = complain.faulty;
  const reviewer = complain.reviewer;
  const commenter = complain.comments[0].commenter;

  let message =
    `Complain Title: ${complain.title} \n\nComplainer Name: ${complainer.name}\nFaulty: ${faulty.name}\nReviewer: ${reviewer.name}\nCommenter: ${commenter.name}\n\nLatest status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: complainer.email,
    subject: 'Status Update',
    message,
  });

  await sendEmail({
    email: faulty.email,
    subject: 'Status Update',
    message,
  });

  await sendEmail({
    email: reviewer.email,
    subject: 'Status Update',
    message,
  });
});

exports.systemAdminStatusUpdateEmail = catchAsync(async (id) => {
  const complain = await ComplainModel.findById(id);

  const complainer = await User.findById(complain.complainer).select(
    'firstName lastName email'
  );
  const faulty = await User.findById(complain.faulty).select(
    'firstName lastName email'
  );
  const reviewer = await User.findById(complain.reviewer).select(
    'firstName lastName email'
  );

  const complainerName = complainer.firstName + ' ' + complainer.lastName;
  const faultyName = faulty.firstName + ' ' + faulty.lastName;
  const reviewerName = reviewer.firstName + ' ' + reviewer.lastName;

  let message =
    `Complain Title: ${complain.title}\n\n${complainerName}, your complain has a status update made by the System Admin\n\nLatest status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: complainer.email,
    subject: 'Status Update',
    message,
  });

  message =
    `Complain Title: ${complain.title}\n\n${faultyName}, the complain against you has a status update made by the System Admin \n\nLatest status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: faulty.email,
    subject: 'Status Update',
    message,
  });

  message =
    `Complain Title: ${complain.title}\n\n${reviewerName}, the complain you are reviewing has a status update made by the System Admin \n\nLatest status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: reviewer.email,
    subject: 'Status Update',
    message,
  });
});

exports.systemAdminComplainClosingEmail = catchAsync(async (id) => {
  const complain = await ComplainModel.findById(id);

  const complainer = await User.findById(complain.complainer).select(
    'firstName lastName email'
  );
  const faulty = await User.findById(complain.faulty).select(
    'firstName lastName email'
  );
  const reviewer = await User.findById(complain.reviewer).select(
    'firstName lastName email'
  );

  const complainerName = complainer.firstName + ' ' + complainer.lastName;
  const faultyName = faulty.firstName + ' ' + faulty.lastName;
  const reviewerName = reviewer.firstName + ' ' + reviewer.lastName;

  let message =
    `Complain Title: ${complain.title}\n\n${complainerName}, your complain has been closed by the System Admin\n\nFinal status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: complainer.email,
    subject: 'Complain Closed',
    message,
  });

  message =
    `Complain Title: ${complain.title}\n\n${faultyName}, the complain against you has been closed by the System Admin \n\nFinal status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: faulty.email,
    subject: 'Complain Closed',
    message,
  });

  message =
    `Complain Title: ${complain.title}\n\n${reviewerName}, the complain you are reviewing has been closed by the System Admin \n\nFinal status: ` +
    complain.comments[0].text;

  await sendEmail({
    email: reviewer.email,
    subject: 'Complain Closed',
    message,
  });
});
