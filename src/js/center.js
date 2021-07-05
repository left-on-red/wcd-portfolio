(function() {
    generatorScripts.center = async function() {
        let xml = await getFile('../data/center.xml');
        let parser = new DOMParser();
        let doc = parser.parseFromString(xml, 'text/xml');
    
        let meta = doc.getElementsByTagName('meta')[0];
        let headers = meta.getAttribute('headers');
    
        let html = document.getElementById('centerContainer');
        let table = document.createElement('table');
        table.classList.add('centerTable');
    
        let elements = doc.children[0].children[1].children;
    
        let inputRow = document.createElement('tr');
    
        let nameCell = document.createElement('td');
        nameCell.setAttribute('colspan', '4');
    
        let nameBox = document.createElement('input');
        nameBox.setAttribute('type', 'text');
        nameBox.setAttribute('placeholder', 'name');
    
        if (!localStorage.getItem(`1-name`)) { localStorage.setItem(`1-name`, '') }
        nameBox.value = localStorage.getItem(`1-name`);
        nameBox.addEventListener('input', function(event) { localStorage.setItem(`1-name`, event.target.value) });
    
        nameCell.appendChild(nameBox);
        inputRow.appendChild(nameCell);
    
        let idCell = document.createElement('td');
        idCell.setAttribute('colspan', '3');
        let idBox = document.createElement('input');
        idBox.setAttribute('type', 'text');
        idBox.setAttribute('placeholder', 'id');
    
        if (!localStorage.getItem(`1-id`)) { localStorage.setItem(`1-id`, '') }
        idBox.value = localStorage.getItem(`1-id`);
        idBox.addEventListener('input', function(event) { localStorage.setItem(`1-id`, event.target.value) });
    
        idCell.appendChild(idBox);
        inputRow.appendChild(idCell);
    
        table.appendChild(inputRow);
    
        let headrow = document.createElement('tr');
        headrow.classList.add('subheader');
        let headArr = headers.split(',');
        for (let h = 0; h < headArr.length; h++) {
            let td = document.createElement('td');
            td.setAttribute('scope', 'col');
            td.innerText = headArr[h];
    
            if (h > 3) { td.classList.add('timeHead') }
            if (h == 1) { td.classList.add('nameHead') }
    
            headrow.appendChild(td);
        }
    
        table.appendChild(headrow);
    
        let count = 0;
    
        function generateRow(entry, number) {
            count += 1;
            let tr = document.createElement('tr');
            let attributes = entry.getAttribute('attr') != null ? entry.getAttribute('attr') : '';
    
            door = entry.getAttribute('door') != null ? entry.getAttribute('door') : '*';
            let special = attributes.includes('special') == true ? 'C/R' : '';
            
            let name = entry.innerHTML;
            if (attributes.includes('call')) { name += ' (call in)' }
    
            name = name.replace(/&amp;/g, '&');
    
            if (attributes.includes('highlighted')) { tr.classList.add('highlighted') }
            
            let tds = [];
    
            if (number != undefined) {
                for (let i = 0; i < 7; i++) { tds[i] = document.createElement('td') }
    
                tds[0].innerText = number+1;
                tds[1].innerText = name;
                tds[1].classList.add('nameCell');
                tds[2].innerText = special;
                tds[3].innerText = door;
            }
    
            else {
                for (let i = 0; i < 6; i++) { tds[i] = document.createElement('td') }
                tds[0].setAttribute('colspan', '2');
                tds[0].innerText = name;
                tds[0].classList.add('nameCell');
    
                tds[1].innerText = special;
                tds[2].innerText = door;
            }
    
            for (let i = tds.length - 3; i < tds.length; i++) {
                let id = tds.length == 7 ? `1-${count}-${i-3}` : `1-${count}-${i-2}`;
                tds[i].setAttribute('id', id);
                tds[i].classList.add('timeCell');
    
                if (!localStorage.getItem(id)) { localStorage.setItem(id, 'unset') }
                if (localStorage.getItem(id) == 'unset') {
                    let button = document.createElement('button');
                    button.setAttribute('type', 'button');
                    button.setAttribute('class', 'btn btn-outline-info');
                    button.innerText = 'Time';
                    button.setAttribute('onclick', `setTime('${id}')`);
    
                    tds[i].appendChild(button);
                }
    
                else {
                    let p = document.createElement('p');
                    p.innerText = localStorage.getItem(id);
                    p.setAttribute('onclick', `unsetTime('${id}')`);
    
                    tds[i].appendChild(p);
                }
            }
    
            for (let t = 0; t < tds.length; t++) { tr.appendChild(tds[t]) }
            return tr;
        }
    
        for (let e = 0; e < elements.length; e++) {
            if (elements[e].tagName == 'header') {
                let tr = document.createElement('tr');
                tr.classList.add('header');
    
                let td = document.createElement('td');
                td.setAttribute('colspan', '7');
                td.innerText = elements[e].innerHTML;
                td.innerText = td.innerText.replace(/&amp;/g, '&');
    
                let color = '#4040FF';
                if (elements[e].getAttribute('color')) { color = elements[e].getAttribute('color') }
                tr.style.backgroundColor = color;
    
                tr.appendChild(td);
                table.appendChild(tr);
            }
    
            else if (elements[e].tagName == 'numbered') {
                let numbered = elements[e].children;
                for (let n = 0; n < numbered.length; n++) {
                    let tr = generateRow(numbered[n], n);
                    table.appendChild(tr);
                }
            }

            else if (elements[e].tagName == 'divider') {
                let tr = document.createElement('tr');
                tr.classList.add('divider');
                let td = document.createElement('td');
                td.innerHTML = elements[e].innerHTML;
                td.setAttribute('colspan', '7');
                tr.appendChild(td);
                table.appendChild(tr);
            }
    
            else {
                let tr = generateRow(elements[e]);
                table.appendChild(tr);
            }
        }
    
        html.appendChild(table);
    }

    exportScripts.center = function() {
        let table = document.getElementsByClassName('centerTable')[0];
        let rows = table.getElementsByTagName('tr');
    
        let rowData = [];
        for (let r = 1; r < rows.length; r++) {
            let obj = { color: rows[r].style.backgroundColor ? parseRGB(rows[r].style.backgroundColor) : null, class: rows[r].getAttribute('class'), cols: [] }
            let cols = rows[r].getElementsByTagName('td');
            for (let c = 0; c < cols.length; c++) {
                if (cols[c].classList.contains('timeCell')) {
                    let time = '';
                    if (cols[c].children[0].tagName == 'P') { time = cols[c].children[0].innerText }
                    obj.cols.push(time);
                }
    
                else { obj.cols.push(cols[c].innerText) }
            }
    
            rowData.push(obj);
        }
    
        let today = new Date();
        let dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let mm = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1; 
        let yy = `${today.getFullYear()}`.slice(2); 
    
        let date = `${mm}/${dd}/${yy}`;
        let name = rows[0].children[0].children[0].value;
        let id = rows[0].children[1].children[0].value;
    
        let final = {
            rows: rowData,
            date: date,
            name: name,
            id: id
        }
    
        let ref = window.open('_blank');
    
        post('/pdf/center', final).then(function(response) {
            if (response == 'success') { ref.location = '/pdf/center' }
            else {ref.close() }
         });
    }
})();