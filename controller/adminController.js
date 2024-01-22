const Team = require("../model/team");
const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");

const adminRoute = async (req, res) => {
  res.status(200).json({ message: "Admin Route" });
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find(
      {},
      {
        email: 0,
        events: 0,
        accommodation: 0,
        paymentStatus: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    res.status(200).json(teams);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};


const getCodingMems = async (req, res) => {
  const codingDataUG = await Team.aggregate([
    { $match: { "events.coding.name": { $ne: "N/A" }, "events.coding.phone": { $ne: "N/A" } } },
    { $unwind: "$events.coding" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.coding.name",
        phone: "$events.coding.phone",
        isUG: "$isUG",
      },
    },
    { $match: { isUG: true } },
    {
      $group: {
        _id: "$teamName",
        members: { $push: { name: "$name", phone: "$phone" } },
      },
    },
  ]);

  const codingDataPG = await Team.aggregate([
    { $match: { "events.coding.name": { $ne: "N/A" }, "events.coding.phone": { $ne: "N/A" } } },
    { $unwind: "$events.coding" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.coding.name",
        phone: "$events.coding.phone",
        isUG: "$isUG",
      },
    },
    { $match: { isUG: false } },
    {
      $group: {
        _id: "$teamName",
        members: { $push: { name: "$name", phone: "$phone" } },
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      headless: "new",
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data

    const ugPage = await browser.newPage();
    const ugHtml = generateHtml(codingDataUG, "UG", "Coding");
    await ugPage.setContent(ugHtml);
    const ugPdfBuffer = await ugPage.pdf({ format: "A4" });

    // PG Data
    const pgPage = await browser.newPage();
    const pgHtml = generateHtml(codingDataPG, "PG", "Coding");
    await pgPage.setContent(pgHtml);
    const pgPdfBuffer = await pgPage.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    // Combine the two pdfs
    // Load PDF documents
    const ugPdfDoc = await PDFDocument.load(ugPdfBuffer);
    const pgPdfDoc = await PDFDocument.load(pgPdfBuffer);

    // Create a new PDF document
    const combinedPdfDoc = await PDFDocument.create();

    // Copy pages from UG and PG PDFs to the new document
    const ugPdfPages = await combinedPdfDoc.copyPages(ugPdfDoc, [0]);
    const pgPdfPages = await combinedPdfDoc.copyPages(pgPdfDoc, [0]);

    // Add copied pages to the new document
    combinedPdfDoc.addPage(ugPdfPages[0]);
    combinedPdfDoc.addPage(pgPdfPages[0]);

    // Save the combined PDF as a buffer
    const combinedPdfBuffer = await combinedPdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=coding-participants.pdf");
    res.write(combinedPdfBuffer);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};

const getWebDesigningMems = async (req, res) => {
  const webDataUG = await Team.aggregate([
    { $match: { "events.web.name": { $ne: "N/A" }, "events.web.phone": { $ne: "N/A" } } },
    { $unwind: "$events.web" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.web.name",
        phone: "$events.web.phone",
        isUG: "$isUG",
      },
    },
    { $match: { isUG: true } },
    {
      $group: {
        _id: "$teamName",
        members: { $push: { name: "$name", phone: "$phone" } },
      },
    },
  ]);

  const webDataPG = await Team.aggregate([
    { $match: { "events.web.name": { $ne: "N/A" }, "events.web.phone": { $ne: "N/A" } } },
    { $unwind: "$events.web" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.web.name",
        phone: "$events.web.phone",
        isUG: "$isUG",
      },
    },
    { $match: { isUG: false } },
    {
      $group: {
        _id: "$teamName",
        members: { $push: { name: "$name", phone: "$phone" } },
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    // UG Data
    const ugPage = await browser.newPage();
    const ugHtml = generateHtml(webDataUG, "UG", "Web Designing");
    await ugPage.setContent(ugHtml);
    const ugPdfBuffer = await ugPage.pdf({ format: "A4" });

    // PG Data
    const pgPage = await browser.newPage();
    const pgHtml = generateHtml(webDataPG, "PG", "Web Designing");
    await pgPage.setContent(pgHtml);
    const pgPdfBuffer = await pgPage.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    // Combine the two pdfs
    // Load PDF documents
    const ugPdfDoc = await PDFDocument.load(ugPdfBuffer);
    const pgPdfDoc = await PDFDocument.load(pgPdfBuffer);

    // Create a new PDF document
    const combinedPdfDoc = await PDFDocument.create();

    // Copy pages from UG and PG PDFs to the new document
    const ugPdfPages = await combinedPdfDoc.copyPages(ugPdfDoc, [0]);
    const pgPdfPages = await combinedPdfDoc.copyPages(pgPdfDoc, [0]);

    // Add copied pages to the new document
    combinedPdfDoc.addPage(ugPdfPages[0]);
    combinedPdfDoc.addPage(pgPdfPages[0]);

    // Save the combined PDF as a buffer
    const combinedPdfBuffer = await combinedPdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=web-participants.pdf");
    res.write(combinedPdfBuffer);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};


const getItManagerMems = async (req, res) => {
  const itManagerData = await Team.aggregate([
    { $match: { "events.itManager.name": { $ne: "N/A" }, "events.itManager.phone": { $ne: "N/A" } } },
    { $unwind: "$events.itManager" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.itManager.name",
        phone: "$events.itManager.phone"
      },
    },
    {
      $group: {
        _id: "$teamName",
        members: { $push: { name: "$name", phone: "$phone" } },
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    // Data
    const page = await browser.newPage();
    const html = generateHtml(itManagerData, "PG", "IT Manager");
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });


    // Close the browser
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=it-manager-participants.pdf");
    res.write(pdfBuffer);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getDesigningMems = async (req, res) => {};

const getDumbCharadesMems = async (req, res) => {};

const getPhotographyMems = async (req, res) => {};

const getProductLaunchMems = async (req, res) => {};

const getQuizMems = async (req, res) => {};

const getDebateMems = async (req, res) => {};

const getDanceMems = async (req, res) => {};

const getGamingMems = async (req, res) => {};

const getTreasureMems = async (req, res) => {};

function generateHtml(data, category, event) {
  return `
    <html>
      <head>
        <title>Coding Participants - ${category}</title>
        <style>
          section {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            gap: 0.5rem;
          }
          th, td {
            padding: 0.5rem 1.5rem;
          }
        </style>
      </head>
      <body>
        <section>
          <h1 style="text-align:center">${event}</h1>
          <h2>${category}</h2>
          <table border=1>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Participants</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (team) => `
                    <tr>
                      <td rowspan="2">${team._id}</td>
                      <td>${team.members[0].name}</td>
                      <td>${team.members[0].phone}</td>
                    </tr>
                    <tr>
                      <td>${team.members[1].name}</td>
                      <td>${team.members[1].phone}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </section>
      </body>
    </html>
  `;
}

module.exports = { 
  adminRoute, 
  getAllTeams, 
  getCodingMems, 
  getWebDesigningMems,
  getItManagerMems,
  getDesigningMems,
  getDumbCharadesMems,
  getPhotographyMems,
  getProductLaunchMems,
  getQuizMems,
  getDebateMems,
  getDanceMems,
  getGamingMems,
  getTreasureMems
};
