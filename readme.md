## wcd-portfolio

This project was commissioned to me by WCD (Wisconin Center District) to aid in internal systems. The real deployment of the application is populated with custom data, but for the purposes of this repository, all data has been replaced with placeholder values, but the application will functionally work exactly the same.

This app uses the following technologies:
- Bootstrap CSS Framework
- PDF generation via JSPDF
- Node.js and Express.js web server backend

In addition to this, there's a few key features that I'd like to outline here:
- Very easy to extend and populate with data
- The entire app is effectively single-page so any subsequent views don't need to be loaded via HTTP requests besides the initial page-load
- PDF generation happens at the back-end which opens up the possibility of programmatically saving generated PDFs at specific locations for archival purposes
- This application was designed for use on Mobile/Tablet devices, so it has been optimized accordingly

All of the source-code of this application is inside this repository. Additionally, a hosted solution of this application can be found [here.](https://wcd-portfolio.glitch.me/)