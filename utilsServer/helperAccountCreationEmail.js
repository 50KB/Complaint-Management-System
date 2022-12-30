const User = require('../models/user-model');
const catchAsync = require('./catchAsync');
const sendEmail = require('./email');

exports.accountCreationEmail = catchAsync(async (id) => {
  const user = await User.findById(id);

  const userName = user.firstName + ' ' + user.lastName;

  const message = `${userName}, an account has been created for you binded to this mail edress. With the following mail and password, you can use the service of NSU Ovijog.\n\n\nMail: ${user.email}\nPassword: helper123\n\n\nReset the password for the safety of your information\n\nRegards,\nNSU Ovijog.`;

  await sendEmail({
    email: user.email,
    subject: 'Account Registration for NSU_Ovijog',
    message,
  });
});
