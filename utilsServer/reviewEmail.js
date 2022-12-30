const catchAsync = require('./catchAsync');
const sendEmail = require('./email');

const ComplainModel = require('./../models/complain-model');
const User = require('../models/user-model');

exports.complainCloseEmail = catchAsync(async (id) => {
  const complain = await ComplainModel.findById(id)
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer._id')
    .populate('statuses.statusCloser');

  const complainer = complain.complainer;
  const faulty = complain.faulty;
  const reviewer = complain.reviewer;
  const statuses = complain.statuses;

  let message = `Complain Title: ${complain.title}\n\nThis complain has been closed\n\nComplainer: ${complainer.name}\nFaulty: ${faulty.name}\nReviewer: ${reviewer.map(rev => rev.name)}\n\nVerdict: ${statuses.map(status => status.statusComment)}\n\nClosed By: ${statuses.map(status => status.statusCloser.name)}`;

  await sendEmail({
    email: complainer.email,
    subject: 'Complain Closed',
    message,
  });

  await sendEmail({
    email: faulty.email,
    subject: 'Complain Closed',
    message,
  });

  for(var i = 0; i < reviewer.length; i++){
    await sendEmail({
      email: reviewer[i].email,
      subject: 'Complain Closed',
      message,
    });
  }
});

exports.reviewerChangeEmail = catchAsync(async (id) => {
  const complain = await ComplainModel.findById(id)
    .populate('complainer')
    .populate('faulty')
    .populate('reviewer');

  const complainer = complain.complainer;
  const faulty = complain.faulty;
  const reviewer = complain.reviewer;

  let message = `Complain Title: ${complain.title}\n\nThe reviewer for the complain has been changed\n\nComplainer: ${complainer.name}\nFaulty: ${faulty.name}\nNew Reviewer: ${reviewer.name}\n\n`;

  await sendEmail({
    email: complainer.email,
    subject: 'Reviewer Changed',
    message,
  });

  await sendEmail({
    email: faulty.email,
    subject: 'Reviewer Changed',
    message,
  });

  await sendEmail({
    email: reviewer.email,
    subject: 'Reviewer Changed',
    message,
  });
});
