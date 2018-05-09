import moment from 'moment';

export default value => {
  const date = moment(value);
  return date.format('dddd, MMMM Do YYYY, h:mmA');
};
