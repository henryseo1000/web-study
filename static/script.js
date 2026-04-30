import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

async function addList () {
    const files = await axios.get('/dir_info')
    .then(function (result) {
    	const status = result.status;
        const data = result.data;
        return data.dir_list;
     })
     .catch(function (err) {
          console.log(err);
     });

    var listLength = files.length;

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

window.onload = await addList();

document.addEventListener('scroll', handleTitleBar);
document.getElementById('title_area').addEventListener('click', () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
}));