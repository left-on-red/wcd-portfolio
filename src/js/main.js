function setTime(id) {
    let cell = document.getElementById(id);
    let date = new Date();
    let time = date.toLocaleTimeString();

    if (confirm(`Set the Time to ${time}?`)) {
        localStorage.setItem(id, time);
        let p = document.createElement('p');
        p.innerText = time;
        p.setAttribute('onclick', `unsetTime('${id}')`);
        cell.innerHTML = '';
        cell.appendChild(p);
    }
}

function unsetTime(id) {
    let cell = document.getElementById(id);
    let time = cell.children[0].innerText;
    if (confirm(`Are you sure you want to reset the Time? (${time})`)) {
        localStorage.setItem(id, 'unset');

        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-outline-info');
        button.setAttribute('onclick', `setTime('${id}')`);
        button.innerText = 'Time';

        cell.innerHTML = '';
        cell.appendChild(button);
    }
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function parseRGB(str) {
    let sep = str.indexOf(",") > -1 ? "," : " ";
    return  str.substr(4).split(")")[0].split(sep).map(Number); 
}

let generatorScripts = {};
let exportScripts = {};

function getFile(path) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.send(null);
        request.onreadystatechange = function() { if (request.readyState == 4 && request.status == 200) { resolve(request.responseText) } }

        /*
        $.ajax({
            url: path,
            success: function(data) { resolve(data) }
        })*/
    });
}

async function post(path, data) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('POST', path, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ value: data }));
        request.onreadystatechange = function() {
            if (request.readyState == 4) { resolve(request.responseText) }
        }
    });
}

function reset() {
    if (confirm('Are you sure you want to reset the table data?') == true) {
        if (confirm('Are you really sure you want to reset the table data?') == true) {
            localStorage.clear();
            location.reload();
        }
    }
}

let current;

let navs = [
    document.getElementById('centerNav'),
    document.getElementById('arenaNav'),
    document.getElementById('inventoryNav')
]

let containers = [
    document.getElementById('masterCenterContainer'),
    document.getElementById('masterArenaContainer'),
    document.getElementById('masterInventoryContainer')
]

let names = [ 'center', 'arena', 'inventory' ]

function navigate(id) {
    current = id;

    for (let n = 0; n < navs.length; n++) { navs[n].classList.remove('active') }
    navs[current].classList.add('active');

    for (let c = 0; c < containers.length; c++) { containers[c].classList.add('hidden') }
    containers[current].classList.remove('hidden');

    window.history.pushState('', '', `/${names[current]}`);
}

function exportPDF() { exportScripts[names[current]]() }

navigate(names.indexOf(window.location.pathname.substring(1)));