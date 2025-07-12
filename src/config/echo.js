import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '46f70135ef0f7542c578', // Replace with your Pusher app key
    cluster: 'ap2', // Replace with your Pusher app cluster
    forceTLS: true,
});



export default echo;
