// vvv WEB SERVER vvv //

function variablize(html, variables) {
    let components = html.match(/(?<={{\s*).*?(?=\s*}})/gs);
    for (let c = 0; c < components.length; c++) { if (variables[components[c]]) { html = html.replace(`{{${components[c]}}}`, variables[components[c]]) } }
    return html;
}

let gens = {
    center: require('./gens/center.js'),
    arena: require('./gens/arena.js'),
    inventory: require('./gens/inventory.js')
}

let fs = require('fs');
let express = require('express');

let app = express();
let port = 80;

let tables = {};

app.use(express.json());

// get landing page
app.get('/', function(request, response) { response.sendFile(`${__dirname}/src/index.html`) });

// get any table web view
app.get('/center', function(request, response) {
    response.send(variablize(fs.readFileSync(`${__dirname}/src/view.html`).toString(), {
        page_title: 'Wisconsin Center',
        center_nav: 'active',
        arena_nav: '',
        inventory_nav: ''
    })); 
});

app.get('/arena', function(request, response) {
    response.send(variablize(fs.readFileSync(`${__dirname}/src/view.html`).toString(), {
        page_title: 'Arena Theater',
        center_nav: '',
        arena_nav: 'active',
        inventory_nav: ''
    }));
});

app.get('/inventory', function(request, response) {
    response.send(variablize(fs.readFileSync(`${__dirname}/src/view.html`).toString(), {
        page_title: 'Inventory',
        center_nav: '',
        arena_nav: '',
        inventory_nav: 'active'
    }));
});

// generate pdf
app.post('/pdf/:type', function(request, response) {
    let type = request.params.type;
    let pdf = gens[type](request.body.value);
    let buffer = Buffer.from(pdf.output('arraybuffer'));

    let meta = { date: request.body.value.date }
    if (type == 'center') { meta.name = request.body.value.name; meta.id = request.body.value.id; }
    else if (type == 'arena') { meta.name = request.body.value.name; meta.id = request.body.value.id; }
    else if (type == 'inventory') { meta.oncoming = request.body.value.oncoming; meta.offgoing = request.body.value.offgoing; }

    tables[type] = { buffer: buffer, meta: meta };
    response.send('success');
});

// fetch pdf (if exists)
app.get('/pdf/:type', function(request, response) {
    let type = request.params.type;
    if (tables[type]) {
        let date = tables[type].meta.date;

        let key1;
        let key2;

        if (type == 'center') { key1 = tables[type].meta.name; key2 = tables[type].meta.id; }
        else if (type == 'arena') { key1 = tables[type].meta.name; key2 = tables[type].meta.id; }
        else if (type == 'inventory') { key1 = tables[type].meta.oncoming; key2 = tables[type].meta.offgoing; }

        let filename = date.split('/').join('.');
        if (key1) { filename = `${filename} - ${key1}` }
        if (key2) { filename = `${filename} - ${key2}` }

        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);
        response.send(tables[type].buffer)
    }

    else { response.send(`<pre>a ${type} pdf has not yet been generated</pre>`) }
});

// any other file
app.get('/*', function(request, response) {
    if (fs.existsSync(`${__dirname}/src/${request.params[0]}`)) { response.sendFile(`${__dirname}/src/${request.params[0]}`) }
    else { response.status(404); response.send('<pre>404 - Not Found</pre>') }
});

app.listen(port, function() { console.log(`listening on port ${port}`) })