import { store } from 'react-easy-state';

export default store({
  pages: {
    prevColors: {
      bgColor: '',
      bgColorCircle: ''
    },
    '/': {
      bgColor: '#fcc187',
      bgColorCircle: '#ffffff'
    },
    '/me': {
      bgColor: '#fcc187',
      bgColorCircle: '#ffffff'
    },
    '/work': {
      bgColor: '#ffffff',
      bgColorCircle: '#fcc187'
    },
    '/music': {
      bgColor: '#4985a9',
      bgColorCircle: '#2b4e63'
    }
  }
});
