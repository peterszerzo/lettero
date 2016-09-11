import attachFastClick from 'fastclick';

export default function homePage() {
  attachFastClick.attach(document.body);
  const form = document.querySelector('form');
  const start = document.querySelector('.start');
  const button = document.querySelector('button');
  button.addEventListener('click', function() {
    start.classList.add('start--create-room');
  });
}
