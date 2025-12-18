// var fs = require('fs');
// var files = fs.readdirSync('./templates');
const files = [
    'api_request_study',
    'card_test',
    'chrome_prank',
    'chrome_todo',
    'flex_test',
    'get_started',
    'hello_jquery',
    'input_custom_slider',
    'simple_ai',
    'simple_login',
    'transition_keyframe_test',
    'web_compiler',
    'event_bubbling',
    'pixel_art_maker',
    'css_with_3d',
    'ball_collision',
    'flask_sending_email_test',
    'following_post_it',
    'spinning_dots'
];

var listLength = files.length;

function addList () {
    for (var i = 0; i < listLength; i++) {
        const addValue = files[i];

        const p = document.createElement("p");
        const a = document.createElement("a");

        p.setAttribute('id', addValue);
        a.setAttribute('href', "/" + addValue);

        const textNode = document.createTextNode(addValue);
        a.appendChild(textNode);

        p.appendChild(a);

        document.getElementById('dir_list').appendChild(p);
    }
}

function handleTitleBar () {
    const scrollY = window.scrollY;
    const titleBar = document.getElementById('title_area');

    if (scrollY > 200) {
        titleBar.style.height = "70px";
    }
    else {
        titleBar.style.height = "150px";
    }
}

window.onload = addList();

document.addEventListener('scroll', handleTitleBar);
document.getElementById('title_area').addEventListener('click', () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
}));