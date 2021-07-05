let jspdf = require('jspdf');
let centeredText = require('./../centeredText.js');

module.exports = function(data) {
    let oncoming = data.oncoming;
    let offgoing = data.offgoing
    let radios = data.radios;
    let keys = data.keys;
    let date = data.date;

    let pdf = new jspdf.jsPDF('portrait', 'px', 'a4');

    let rowC = 0;
    let pageC = 0;
    let yMult = (rowC * 15) + 10;

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);

    pdf.text(35, yMult + 10, date);
    rowC += 1;

    yMult = (rowC * 15) + 10;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text(35, yMult + 10, `on-coming supervisor: ${oncoming}`);
    rowC += 1;

    yMult = (rowC * 15) + 10;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text(35, yMult + 10, `off-going supervisor: ${offgoing}`);
    rowC += 1;

    for (let r = 0; r < radios.length; r++) {
        let isEntry = false;
        yMult = (rowC * 15) + 10;

        let cols = radios[r].cols;

        if (radios[r].class == 'header') {
            // equipment
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(30, yMult, 150, 15, 'FD');
            pdf.text(35, yMult + 10, cols[0]);

            // serial
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(180, yMult, 50, 15, 'FD');
            pdf.text(185, yMult + 10, cols[1]);

            // qty
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(230, yMult, 50, 15, 'FD');
            pdf.text(235, yMult + 10, cols[2]);

            // toggles (in, out, repair, miss)
            for (let t = 0; t < 4; t++) {
                pdf.setTextColor(255, 255, 255);
                pdf.setFillColor(0, 0, 0);
                pdf.setDrawColor(0, 0, 0);
                pdf.setFontSize(10);

                pdf.rect(280+(t*35), yMult, 35, 15, 'FD');
                pdf.text(290+(t*35), yMult + 10, cols[3+t]);
            }
        }

        else if (radios[r].class == 'subheader') {
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            if (radios[r].color) { pdf.setFillColor(radios[r].color[0], radios[r].color[1], radios[r].color[2]) }

            pdf.rect(30, yMult, 390, 15, 'FD');
            centeredText(pdf, yMult + 10, cols[0]);
        }

        else if (radios[r].class == 'divider') {
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.rect(30, yMult, 390, 15, 'FD');
        }

        else if (radios[r].class == 'alt') {
            isEntry = true;
            
            // radio text
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(30, yMult, 200, 15, 'FD');
            pdf.text(35, yMult + 10, cols[0]);

            // quantity
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(230, yMult, 50, 15, 'FD');
            pdf.text(235, yMult + 10, cols[1]);
        }

        else {
            isEntry = true;

            // radio text
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);
            
            pdf.rect(30, yMult, 150, 15, 'FD');
            pdf.text(35, yMult + 10, cols[0]);

            // serial
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(180, yMult, 50, 15, 'FD');
            pdf.text(185, yMult + 10, cols[1]);

            // quantity
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(230, yMult, 50, 15, 'FD');
            pdf.text(235, yMult + 10, cols[2]);
        }

        if (isEntry) {
            let colors = [
                [232, 154, 102],
                [232, 102, 102],
                [232, 219, 102],
                [102, 232, 156]
            ]

            for (let t = 0; t < 4; t++) {
                // taking the toggle buttons backwards rather than forwards because alt entries have 5 cols instead of 6
                let i = (cols.length - t) - 1;

                let color = [230, 230, 230];
                let char = '-';
                if (cols[i] == true || (!isNaN(cols[i]) && parseInt(cols[i]) > 0) || (typeof cols == 'string' && cols != '')) { color = colors[t]; char = '+'; }

                pdf.setTextColor(0, 0, 0);
                pdf.setFillColor(color[0], color[1], color[2]);

                if (typeof cols[i] == 'boolean') {
                    pdf.setFontSize(16);
                    pdf.rect(385-(t*35), yMult, 35, 15, 'FD');
                    pdf.text(397-(t*35), yMult + 10, char);
                }

                else {
                    pdf.rect(385-(t*35), yMult, 35, 15, 'FD');
                    pdf.text(390-(t*35), yMult + 10, cols[i]);
                }
            }
        }

        rowC += 1;

        if (rowC == 40) {
            pdf.addPage();
            pageC += 1;
            rowC = 0;
            yMult = (rowC * 20) + 10;
        }
    }

    pdf.addPage();

    rowC = 0;

    for (let k = 0; k < keys.length; k++) {
        let cols = keys[k].cols;
        yMult = (rowC * 15) + 10;

        if (keys[k].class == 'header') {
            // #
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(30, yMult, 20, 15, 'FD');
            pdf.text(35, yMult + 10, cols[0]);

            // keys
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(50, yMult, 50, 15, 'FD');
            pdf.text(55, yMult + 10, cols[1]);

            // descriptions
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(100, yMult, 150, 15, 'FD');
            pdf.text(105, yMult + 10, cols[2]);

            // toggles (in, out, miss, damg)
            for (let t = 0; t < 4; t++) {                
                pdf.setTextColor(255, 255, 255);
                pdf.setFillColor(0, 0, 0);
                pdf.setDrawColor(0, 0, 0);
                pdf.setFontSize(8);

                pdf.rect(250+(t*20), yMult, 20, 15, 'FD');
                pdf.text(253+(t*20), yMult + 10, cols[3+t]);
            }

            // comments
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(330, yMult, 100, 15, 'FD');
            pdf.text(335, yMult + 10, cols[7]);
        }

        else {
            // #
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(30, yMult, 20, 15, 'FD');
            pdf.text(35, yMult + 10, cols[0]);

            // keys
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(50, yMult, 50, 15, 'FD');
            pdf.text(55, yMult + 10, cols[1]);

            // descriptions
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(100, yMult, 150, 15, 'FD');
            pdf.text(105, yMult + 10, cols[2]);


            // toggles (in, out, miss, damg)

            let colors = [
                [102, 232, 156],
                [232, 219, 102],
                [232, 102, 102],
                [232, 154, 102]
            ]

            for (let t = 0; t < 4; t++) {
                pdf.setTextColor(0, 0, 0);
                let char = '-';
                let color = [230, 230, 230];

                if (cols[3+t] == true || (!isNaN(cols[3+t]) && parseInt(cols[3+t]) > 0) || (typeof cols == 'string' && cols != '')) { color = colors[t]; char = cols[3+t] }
                if (typeof cols[3+t] == 'boolean' && cols[3+t] == true) { char = '+' }

                pdf.setFillColor(...color);

                pdf.rect(250+(t*20), yMult, 20, 15, 'FD');
                pdf.text(255+(t*20), yMult + 10, char);                
            }

            // comments
            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(8);

            pdf.rect(330, yMult, 100, 15, 'FD');
            pdf.text(335, yMult + 10, cols[7]);
        }

        rowC += 1;

        if (rowC == 40) {
            pdf.addPage();
            pageC += 1;
            rowC = 0;
            yMult = (rowC * 20) + 10;
        }
    }

    return pdf;
}