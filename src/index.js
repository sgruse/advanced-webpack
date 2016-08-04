import $ from 'jquery';
import Button from './Components/Button';

// console.log('hello world');
const button = new Button('google.com');
button.render('a');

// Everything in the ensure callback will be split into a chunk, a seperate bundle that webpack will only load if needed.
// In this case it will be loaded if there is an 'a' tag to attach to.

if (document.querySelectorAll('a').length) {
    require.ensure([], () => {
        const Button = require('./Components/Button').default;
        const button = new Button('google.com');

        button.render('a');
    });
}
