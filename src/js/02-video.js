import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const video = document.querySelector('iframe');
const player = new VimeoPlayer(video);

const throttledTimeUpdate = throttle(seconds => {
  localStorage.setItem('videoplayer-current-time', seconds);
}, 1000);

player.on('timeupdate', function (data) {
  throttledTimeUpdate(data.seconds);
});

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime);
}
