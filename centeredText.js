module.exports = function(pdf, y, txt) {
    let fontSize = pdf.internal.getFontSize();
    let pageWidth = pdf.internal.pageSize.width;
    txtWidth = pdf.getStringUnitWidth(txt) * fontSize / pdf.internal.scaleFactor;
    pdf.text(txt, (pageWidth - txtWidth) / 2, y);
}