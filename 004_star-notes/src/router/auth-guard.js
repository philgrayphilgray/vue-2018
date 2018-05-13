import * as firebase from 'firebase';

export default (to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  // eslint-disable-next-line
  console.log(currentUser);
  if (currentUser) {
    next();
  } else {
    next('/');
  }
};
