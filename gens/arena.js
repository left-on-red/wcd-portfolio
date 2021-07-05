let jspdf = require('jspdf');
let centeredText = require('./../centeredText.js');

module.exports = function(data) {
    let pdf = new jspdf.jsPDF('portrait', 'px', 'a4');

    let rows = data.rows;
    let date = data.date;
    let name = data.name;
    let id = data.id;

    let rowC = 0;
    let yMult = (rowC * 15) + 10;;

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);

    pdf.text(35, yMult + 10, date);
    rowC += 1;

    yMult = (rowC * 15) + 10;
    pdf.text(35, yMult + 10, `Name: ${name}`);
    rowC += 1;

    yMult = (rowC * 15) + 10;
    pdf.text(35, yMult + 10, `ID: ${id}`);
    rowC += 1;

    for (let r = 0; r < rows.length; r++) {
        yMult = (rowC * 15) + 10;
        cols = rows[r].cols;

        if (rows[r].class == 'header') {
            pdf.setTextColor(255, 255, 255);

            let color = rows[r].color;

            pdf.setFillColor(color[0], color[1], color[2]);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(30, yMult, 390, 15, 'FD');
            centeredText(pdf, yMult + 10, cols[0]);
        }

        else if (rows[r].class == 'subheader') {

            // #
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(30, yMult, 15, 15, 'FD');
            pdf.text(35, yMult + 10, '#');


            // name
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(45, yMult, 170, 15, 'FD');

            // special
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(215, yMult, 20, 15, 'FD');

            // door
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);
            pdf.setDrawColor(0, 0, 0);
            pdf.setFontSize(10);

            pdf.rect(235, yMult, 35, 15, 'FD');
            pdf.text(239, yMult + 10, 'Door');

            // times
            for (let t = 0; t < 3; t++) {
                pdf.setTextColor(255, 255, 255);
                pdf.setFillColor(0, 0, 0);
                pdf.setDrawColor(0, 0, 0);
                pdf.setFontSize(10);
            
                pdf.rect(270+(t*50), yMult, 50, 15, 'FD');
                pdf.text(285+(t*50), yMult + 10, 'Time');
            }
        }

        else {
            let bg = [255, 255, 255];
            if (rows[r].class == 'highlighted') { bg = [255, 255, 0] }

            let c = 0;
            if (cols.length == 6) {
                pdf.setTextColor(0, 0, 0);
                pdf.setFillColor(bg[0], bg[1], bg[2]);
                pdf.setFontSize(10);

                pdf.rect(30, yMult, 185, 15, 'FD');
                pdf.text(35, yMult + 10, cols[c]);
                c++;
            }

            else {
                pdf.setTextColor(0, 0, 0);
                pdf.setFillColor(bg[0], bg[1], bg[2]);
                pdf.setFontSize(10);

                pdf.rect(30, yMult, 15, 15, 'FD');
                pdf.text(33, yMult + 10, cols[c]);
                c++;

                pdf.setTextColor(0, 0, 0);
                pdf.setFillColor(bg[0], bg[1], bg[2]);
                pdf.setFontSize(10);

                pdf.rect(45, yMult, 170, 15, 'FD');
                pdf.text(50, yMult + 10, cols[c]);
                c++;
            }

            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(bg[0], bg[1], bg[2]);
            pdf.setFontSize(10);

            pdf.rect(215, yMult, 20, 15, 'FD');
            pdf.text(217, yMult + 10, cols[c]);
            c++;

            pdf.setTextColor(0, 0, 0);
            pdf.setFillColor(bg[0], bg[1], bg[2]);
            pdf.setFontSize(10);

            pdf.rect(235, yMult, 35, 15, 'FD');
            pdf.text(239, yMult + 10, cols[c]);
            c++;

            for (let t = 0; t < 3; t++) {
                let time = cols[c+t];

                pdf.setTextColor(0, 0, 0);
                pdf.setFillColor(bg[0], bg[1], bg[2]);
                pdf.setFontSize(10);

                pdf.rect(270+(t*50), yMult, 50, 15, 'FD');
                pdf.text(272+(t*50), yMult + 10, time);
            }
        }

        rowC += 1;

        if (rowC == 40) {
            pdf.addPage();
            rowC = 0;
            yMult = (rowC * 20) + 10;
        }
    }

    return pdf;
}