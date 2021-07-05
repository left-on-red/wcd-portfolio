(function() {
    function generateRadios1(num, qty, tds) {
        let radios = [];
        for (let r = 0; r < 4; r++) {
            let div = document.createElement('div');
            div.classList.add('toggle');
            div.setAttribute('id', `3-${num}-${r+1}`);
            radios.push(div);
        }
    
        radios[0].classList.add('in');
        radios[1].classList.add('out');
        radios[2].classList.add('repair');
        radios[3].classList.add('miss');
    
        // is 1
        if (qty == '1') {
            for (let r = 0; r < 4; r++) {
                if (!localStorage.getItem(`3-${num}-${r+1}`)) { localStorage.setItem(`3-${num}-${r+1}`, 'false') }
    
                let p = document.createElement('p');
                radios[r].appendChild(p);
    
                radios[r].children[0].innerText = '‒';
    
                if (localStorage.getItem(`3-${num}-${r+1}`) == 'true') {
                    radios[r].classList.add('selected');
                    radios[r].children[0].innerHTML = '+';
                }
    
                radios[r].addEventListener('click', function(event) {
                    let div = event.target.tagName == 'DIV' ? event.target : event.target.parentElement;
                    if (div.classList.contains('selected')) {
                        div.classList.remove('selected');
                        div.children[0].innerText = '‒';
                        localStorage.setItem(div.getAttribute('id'), 'false');
                    }
    
                    else {
                        for (let d = 0; d < 4; d++) {
                            let selected = document.getElementById(`3-${num}-${d+1}`);
                            selected.classList.remove('selected');
                            selected.children[0].innerText = '‒';
                            localStorage.setItem(`3-${num}-${d+1}`, 'false');
                        }
    
                        radios[r].classList.add('selected');
                        radios[r].children[0].innerText = '+';
                        localStorage.setItem(`3-${num}-${r+1}`, 'true');
                    }
                });
            }
        }
    
        // is a valid number
        else if (!isNaN(qty)) {
            for (let r = 0; r < 4; r++) {
                if (!localStorage.getItem(`3-${num}-${r+1}`)) { localStorage.setItem(`3-${num}-${r+1}`, '0') }
    
                let input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.value = localStorage.getItem(`3-${num}-${r+1}`);
                if (input.value != '0') { radios[r].classList.add('selected') }
    
                radios[r].appendChild(input);
    
                radios[r].children[0].addEventListener('input', function(event) {
                    let div = event.target.parentElement;
    
                    event.target.value = event.target.value.replace(/[^\d.-]/g, '');
                    if (event.target.value.length != 1 && event.target.value.startsWith('0')) { event.target.value = event.target.value.substring(1) }
                    if (event.target.value == '') { event.target.value = '0' }
    
                    let max = parseInt(qty);
                    let total = 0;
                    for (let i = 0; i < 4; i++) {
                        if (i+1 != r+1) {
                            total += parseInt(localStorage.getItem(`3-${num}-${i+1}`));
                        }
                    }
    
                    max -= total;
                    if (parseInt(event.target.value) > max) { event.target.value = `${max}` }
                    if (parseInt(event.target.value) < 0) { event.target.value = '0' }
    
                    localStorage.setItem(`3-${num}-${r+1}`, event.target.value);
                    
                    if (div.classList.contains('selected')) { div.classList.remove('selected') }
                    if (event.target.value != '0') { div.classList.add('selected') }
                });
            }
        }
    
        // is anything else (arbitrary string)
        else {
            for (let r = 0; r < 4; r++) {
                if (!localStorage.getItem(`3-${num}-${r+1}`)) { localStorage.setItem(`3-${num}-${r+1}`, '') }
    
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.value = localStorage.getItem(`3-${num}-${r+1}`);
                if (input.value != '') { radios[r].classList.add('selected') }
                radios[r].appendChild(input);
                radios[r].children[0].addEventListener('input', function(event) {
                    let div = event.target.parentElement;
                    div.classList.remove('selected');
                    localStorage.setItem(`3-${num}-${r+1}`, event.target.value);
                    if (event.target.value != '') { div.classList.add('selected') }
                });
            }
    
            radios[0].children[0].setAttribute('placeholder', 'in');
            radios[1].children[0].setAttribute('placeholder', 'out');
            radios[2].children[0].setAttribute('placeholder', 'repair');
            radios[3].children[0].setAttribute('placeholder', 'miss');
        }
    
        // in, out, repair, miss
        tds[tds.length - 4].classList.add('toggleCell');
        tds[tds.length - 4].appendChild(radios[0]);
    
        tds[tds.length - 3].classList.add('toggleCell');
        tds[tds.length - 3].appendChild(radios[1]);
    
        tds[tds.length - 2].classList.add('toggleCell');
        tds[tds.length - 2].appendChild(radios[2]);
    
        tds[tds.length - 1].classList.add('toggleCell');
        tds[tds.length - 1].appendChild(radios[3]);
    }
    
    function generateRadios2(num, qty, tds) {
        let radios = [];
        for (let r = 0; r < 4; r++) {
            let div = document.createElement('div');
            div.classList.add('toggle');
            div.setAttribute('id', `4-${num}-${r+1}`);
            radios.push(div);
        }
    
        radios[0].classList.add('in');
        radios[1].classList.add('out');
        radios[2].classList.add('miss');
        radios[3].classList.add('damg');
    
        let isToggle = false;
    
        if (qty == '1') {
            isToggle = true;
            for (let r = 0; r < 4; r++) {
                if (!localStorage.getItem(`4-${num}-${r+1}`)) { localStorage.setItem(`4-${num}-${r+1}`, 'false') }
                let p = document.createElement('p');
                p.innerText = '‒';
                radios[r].appendChild(p);
    
                if (localStorage.getItem(`4-${num}-${r+1}`) == 'true') {
                    radios[r].classList.add('selected');
                    radios[r].children[0].innerText = '+';
                }
    
                radios[r].addEventListener('click', function(event) {
                    let div = event.target.tagName == 'DIV' ? event.target : event.target.parentElement;
                    if (div.classList.contains('selected')) {
                        div.classList.remove('selected');
                        div.children[0].innerText = '‒';
                        localStorage.setItem(div.getAttribute('id'), 'false');
                    }
    
                    else {
                        for (let d = 0; d < 4; d++) {
                            let selected = document.getElementById(`4-${num}-${d+1}`);
                            selected.classList.remove('selected');
                            selected.children[0].innerText = '‒';
                            localStorage.setItem(`4-${num}-${d+1}`, 'false');
                        }
    
                        radios[r].classList.add('selected');
                        radios[r].children[0].innerText = '+';
                        localStorage.setItem(`4-${num}-${r+1}`, 'true');
                    }
                });
            }
        }
    
        else if (!isNaN(qty)) {
            for (let r = 0; r < 4; r++) {
                if (!localStorage.getItem(`4-${num}-${r+1}`)) { localStorage.setItem(`4-${num}-${r+1}`, '0') }
    
                let input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.value = localStorage.getItem(`4-${num}-${r+1}`);
                if (input.value != '0') { radios[r].classList.add('selected') }
    
                radios[r].appendChild(input);
    
                radios[r].children[0].addEventListener('input', function(event) {
                    let div = event.target.parentElement;
    
                    event.target.value = event.target.value.replace(/[^\d.-]/g, '');
                    if (event.target.value.length != 1 && event.target.value.startsWith('0')) { event.target.value = event.target.value.substring(1) }
                    if (event.target.value == '') { event.target.value = '0' }
    
                    let max = parseInt(qty);
                    let total = 0;
                    for (let i = 0; i < 4; i++) {
                        if (i+1 != r+1) {
                            total += parseInt(localStorage.getItem(`4-${num}-${i+1}`));
                        }
                    }
    
                    max -= total;
                    if (parseInt(event.target.value) > max) { event.target.value = `${max}` }
                    if (parseInt(event.target.value) < 0) { event.target.value = '0' }
    
                    localStorage.setItem(`4-${num}-${r+1}`, event.target.value);
                    
                    if (div.classList.contains('selected')) { div.classList.remove('selected') }
                    if (event.target.value != '0') { div.classList.add('selected') }
                });
            }
        }
    
        // in, out, miss, damg
        if (isToggle) { tds[tds.length - 5].classList.add('toggleCell') }
        tds[tds.length - 5].appendChild(radios[0]);
    
        if (isToggle) { tds[tds.length - 4].classList.add('toggleCell') }
        tds[tds.length - 4].appendChild(radios[1]);
    
        if (isToggle) { tds[tds.length - 3].classList.add('toggleCell') }
        tds[tds.length - 3].appendChild(radios[2]);
    
        if (isToggle) { tds[tds.length - 2].classList.add('toggleCell') }
        tds[tds.length - 2].appendChild(radios[3]);
    }

    async function loadNames() {
        let html = document.getElementById('keyradioNamesContainer');
    
        let nameTable = document.createElement('table');
        nameTable.classList.add('keyradioNamesTable');
    
        let inputRow = document.createElement('tr');
    
        let nameCell1 = document.createElement('td');
        let nameBox1 = document.createElement('input');
        nameBox1.setAttribute('type', 'text');
        nameBox1.setAttribute('placeholder', 'on-coming supervisor');
        if (!localStorage.getItem(`i-name1`)) { localStorage.setItem(`i-name1`, '') }
        nameBox1.value = localStorage.getItem(`i-name1`);
        nameBox1.addEventListener('input', function(event) { localStorage.setItem(`i-name1`, event.target.value) });
        nameCell1.appendChild(nameBox1);
        inputRow.appendChild(nameCell1);
    
        let nameCell2 = document.createElement('td');
        let nameBox2 = document.createElement('input');
        nameBox2.setAttribute('type', 'text');
        nameBox2.setAttribute('placeholder', 'off-going supervisor');
        if (!localStorage.getItem(`i-name2`)) { localStorage.setItem(`i-name2`, '') }
        nameBox2.value = localStorage.getItem(`i-name2`);
        nameBox2.addEventListener('input', function(event) { localStorage.setItem(`i-name2`, event.target.value) });
        nameCell2.appendChild(nameBox2);
        inputRow.appendChild(nameCell2);
    
        nameTable.appendChild(inputRow);
        html.appendChild(nameTable);
    }
    
    async function loadRadios() {
        let xml = await getFile('../data/radios.xml');
        let parser = new DOMParser();
        let doc = parser.parseFromString(xml, 'text/xml');
    
        let meta = doc.getElementsByTagName('meta')[0];
        let headers = meta.getAttribute('headers');
        let html = document.getElementById('radiosContainer');
    
        let table = document.createElement('table');
        table.classList.add('radiosTable');
    
        let headrow = document.createElement('tr');
        headrow.classList.add('header');
        let headArr = headers.split(',');
        for (let h = 0; h < headArr.length; h++) {
            let td = document.createElement('td');
            td.setAttribute('scope', 'col');
            td.innerText = headArr[h];
            headrow.appendChild(td);
        }
    
        table.appendChild(headrow);
    
        let elements = doc.children[0].children[1].children;
        for (let e = 0; e < elements.length; e++) {
            let tr = document.createElement('tr');
            if (elements[e].tagName == 'header') {
                if (elements[e].getAttribute('color')) { tr.style.backgroundColor = elements[e].getAttribute('color') }
                tr.classList.add('subheader');
                let td = document.createElement('td');
                td.setAttribute('colspan', '7');
                td.innerText = elements[e].textContent;
                tr.appendChild(td);
            }
    
            else if (elements[e].tagName == 'divider') {
                tr.classList.add('divider');
                let td = document.createElement('td');
                td.setAttribute('colspan', '7');
                tr.appendChild(td);
            }
    
            else if (elements[e].tagName == 'entry') {
                let serial = '';
                let quantity = '1';
                if (elements[e].getAttribute('serial') != null) { serial = elements[e].getAttribute('serial') }
                if (elements[e].getAttribute('quantity') != null) { quantity = elements[e].getAttribute('quantity') }
    
                let tds = new Array(7);
                for (let t = 0; t < tds.length; t++) { tds[t] = document.createElement('td') }
                tds[0].innerHTML = elements[e].innerHTML != '' ? elements[e].innerHTML : 'Radio';
                tds[1].innerText = serial;
                tds[2].innerText = quantity;
    
                generateRadios1(e, quantity, tds);
    
                for (let t = 0; t < tds.length; t++) { tr.appendChild(tds[t]) }
            }
    
            else if (elements[e].tagName == 'altentry') {
                let serial = '';
                let quantity = '1';
                if (elements[e].getAttribute('serial') != null) { serial = elements[e].getAttribute('serial') }
                if (elements[e].getAttribute('quantity') != null) { quantity = elements[e].getAttribute('quantity') }
                let tds = new Array(6);
                for (let t = 0; t < tds.length; t++) { tds[t] = document.createElement('td') }
                tds[0].innerHTML = elements[e].innerHTML != '' ? elements[e].innerHTML : 'Radio';
                tds[0].setAttribute('colspan', '2');
                tds[1].innerText = quantity;
    
                generateRadios1(e, quantity, tds);
                for (let t = 0; t < tds.length; t++) { tr.appendChild(tds[t]) }
    
                tr.classList.add('alt');
            }
    
            table.appendChild(tr);
        }
    
        html.appendChild(table);
    }
    
    async function loadKeys() {
        let xml = await getFile('../data/keys.xml');
        let parser = new DOMParser();
        let doc = parser.parseFromString(xml, 'text/xml');
    
        let meta = doc.getElementsByTagName('meta')[0];
        let headers = meta.getAttribute('headers');
    
        let html = document.getElementById('keysContainer');
        let table = document.createElement('table');
        table.classList.add('keysTable');
    
        let headrow = document.createElement('tr');
        headrow.classList.add('header');
        let headArr = headers.split(',');
        for (let h = 0; h < headArr.length; h++) {
            let td = document.createElement('td');
            td.setAttribute('scope', 'col');
            td.innerText = headArr[h];
            headrow.appendChild(td);
        }
    
        table.appendChild(headrow);
    
        let elements = doc.children[0].children[1].children;
        for (let e = 0; e < elements.length; e++) {
            let tr = document.createElement('tr');
    
            let quantity = '1';
            if (elements[e].getAttribute('quantity') != null) { quantity = elements[e].getAttribute('quantity') }
    
            let tds = new Array(8);
            for (let t = 0; t < tds.length; t++) { tds[t] = document.createElement('td') }
    
            generateRadios2(e, quantity, tds);
    
            tds[0].innerText = e+1;
            tds[1].innerText = quantity;
            tds[2].innerText = elements[e].innerHTML;
    
            let text = document.createElement('input');
            text.setAttribute('type', 'text');
            text.setAttribute('id', `4-${e}-text`);
            if (!localStorage.getItem(`4-${e}-text`)) { localStorage.setItem(`4-${e}-text`, '') }
            text.value = localStorage.getItem(`4-${e}-text`);
    
            text.addEventListener('input', function(event) {
                localStorage.setItem(`4-${e}-text`, event.target.value);
            });
            
            tds[7].appendChild(text);
    
            for (let t = 0; t < tds.length; t++) { tr.appendChild(tds[t]) }
    
            table.appendChild(tr);
        }
    
        html.appendChild(table);
    }

    generatorScripts.inventory = async function() {
        await loadNames();
        await loadRadios();
        await loadKeys();
    }

    exportScripts.inventory = function() {
        let today = new Date();
        let dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let mm = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1; 
        let yy = `${today.getFullYear()}`.slice(2); 
        let date = `${mm}/${dd}/${yy}`;
    
        let supers = document.getElementsByClassName('keyradioNamesTable')[0];
        console.log(supers);

        let oncoming = supers.children[0].children[0].children[0].value;
        let offgoing = supers.children[0].children[1].children[0].value;
    
        let radios = document.getElementsByClassName('radiosTable')[0];
        let radioRows = radios.getElementsByTagName('tr');
        let radioData = [];
    
        for (let r = 0; r < radioRows.length; r++) {
            let cols = radioRows[r].getElementsByTagName('td');
            let color = radioRows[r].style.backgroundColor ? parseRGB(radioRows[r].style.backgroundColor) : null;
            let classname = radioRows[r].getAttribute('class') ? radioRows[r].getAttribute('class') : null;
            let colData = [];
    
            for (let c = 0; c < cols.length; c++) {
                if (cols[c].children[0] && cols[c].children[0].tagName == 'DIV') {
                    if (cols[c].children[0].children[0].tagName == 'INPUT') { colData.push(cols[c].children[0].children[0].value) }
                    else { colData.push(cols[c].children[0].classList.contains('selected')) }
                }
    
                else { colData.push(cols[c].innerText) }
            }
    
            radioData.push({ color: color, class: classname, cols: colData });
        }
    
        let keys = document.getElementsByClassName('keysTable')[0];
        let keyRows = keys.getElementsByTagName('tr');
        let keyData = [];
    
        for (let k = 0; k < keyRows.length; k++) {
            let cols = keyRows[k].getElementsByTagName('td');
            let color = keyRows[k].style.backgroundColor ? parseRGB(keyRows[k].style.backgroundColor) : null;
            let classname = keyRows[k].getAttribute('class') ? keyRows[k].getAttribute('class') : null;
            let colData = [];
    
            for (let c = 0; c < cols.length; c++) {
                if (cols[c].children[0] && cols[c].children[0].tagName == 'DIV') {
                    if (cols[c].children[0].children[0].tagName == 'INPUT') { colData.push(cols[c].children[0].children[0].value) }
                    else { colData.push(cols[c].children[0].classList.contains('selected')) }
                }
    
                else if (cols[c].children[0] && cols[c].children[0].tagName == 'INPUT') { colData.push(cols[c].children[0].value) }
    
                else { colData.push(cols[c].innerText) }
            }
    
            keyData.push({ color: color, class: classname, cols: colData });
        }
    
        let final = {
            oncoming: oncoming,
            offgoing: offgoing,
            date: date,
            radios: radioData,
            keys: keyData
        }
    
        let ref = window.open('_blank');
    
        post('/pdf/inventory', final).then(function(response) {
            if (response == 'success') { ref.location = '/pdf/inventory' }
            else {ref.close() }
        });
    }
})();