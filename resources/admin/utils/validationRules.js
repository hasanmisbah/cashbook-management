const min = (character, field, trigger = 'blur') => ({
  min: character,
  message: `${field || 'This field'} require at least ${character} character`,
  trigger: trigger
});

const max = (character, field, trigger = 'blur') => ({
  max: character,
  message: `${field || 'This field'} content cannot be more than ${character} character`,
  trigger: trigger
});

const required = (field, trigger = 'blur') => ({
  required: true,
  message: `${field || 'This field'} is required`,
  trigger: trigger
});

const number = (field, trigger = 'blur') => ({
  type: 'number',
  message: `${field || 'This field'} content must be number`,
  trigger: trigger
});

const email = (field, trigger = 'blur') => ({
  type: 'email',
  message: `${field || 'This field'} content must be email`,
  trigger: trigger
});

const integer = (field, trigger = 'blur') => ({
  type: 'integer',
  message: `${field || 'This field'} content must be integer`,
  trigger: trigger
});

export {
  min,
  max,
  required,
  number,
  email,
  integer
};
