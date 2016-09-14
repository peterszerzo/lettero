import attachFastClick from 'fastclick';

export default function homePage() {
  attachFastClick.attach(document.body);
  const start = document.querySelector('.start');
  const button = document.querySelector('#create-room');
  button.addEventListener('click', function() {
    start.classList.add('start--create-room');
  });
}
