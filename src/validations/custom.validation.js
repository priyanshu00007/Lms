const Joi = require('joi');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid MongoDB ObjectId');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }
  if (!value.match(/\d/)) {
    return helpers.message('Password must contain at least 1 number');
  }
  if (!value.match(/[a-z]/)) {
    return helpers.message('Password must contain at least 1 lowercase letter');
  }
  if (!value.match(/[A-Z]/)) {
    return helpers.message('Password must contain at least 1 uppercase letter');
  }
  if (!value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    return helpers.message('Password must contain at least 1 special character');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(value)) {
    return helpers.message('Please provide a valid phone number');
  }
  return value;
};

const url = (value, helpers) => {
  try {
    new URL(value);
    return value;
  } catch (error) {
    return helpers.message('Please provide a valid URL');
  }
};

const dateRange = (start, end) => (value, helpers) => {
  const startDate = helpers.state.ancestors[0]?.[start];
  const endDate = helpers.state.ancestors[0]?.[end];
  
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return helpers.message('Start date must be before end date');
  }
  return value;
};

const positiveInteger = (value, helpers) => {
  if (!Number.isInteger(value) || value < 0) {
    return helpers.message('"{{#label}}" must be a positive integer');
  }
  return value;
};

const currency = (value, helpers) => {
  if (typeof value !== 'number' || value < 0) {
    return helpers.message('"{{#label}}" must be a valid currency amount');
  }
  // Check for valid decimal places
  if (value.toString().split('.')[1]?.length > 2) {
    return helpers.message('"{{#label}}" can have maximum 2 decimal places');
  }
  return value;
};

const colorHex = (value, helpers) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(value)) {
    return helpers.message('"{{#label}}" must be a valid hex color code');
  }
  return value;
};

const emailDomain = (domains) => (value, helpers) => {
  const emailDomain = value.split('@')[1];
  if (!domains.includes(emailDomain)) {
    return helpers.message(`Email must be from one of these domains: ${domains.join(', ')}`);
  }
  return value;
};

module.exports = {
  objectId,
  password,
  phoneNumber,
  url,
  dateRange,
  positiveInteger,
  currency,
  colorHex,
  emailDomain,
};