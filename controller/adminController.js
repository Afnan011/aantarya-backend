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
    { 
      $match: {
        "events.coding.name": { $nin: ["", "N/A"] },
        "events.coding.phone": { $nin: ["", "N/A"] }
      }
    },
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
    { 
      $match: {
        "events.coding.name": { $nin: ["", "N/A"] },
        "events.coding.phone": { $nin: ["", "N/A"] }
      }
    },
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
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data

    const ugPage = await browser.newPage();
    const ugHtml = generateHtml(codingDataUG, "UG", "Coding");
    ugPage.setDefaultNavigationTimeout(0);
    await ugPage.setContent(ugHtml);
    const ugPdfBuffer = await ugPage.pdf({ format: "A4" });

    // PG Data
    const pgPage = await browser.newPage();
    const pgHtml = generateHtml(codingDataPG, "PG", "Coding");
    pgPage.setDefaultNavigationTimeout(0);
    await pgPage.setContent(pgHtml);
    const pgPdfBuffer = await pgPage.pdf({ format: "A4" });

    
    
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

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
  finally{
  }
};

const getWebDesigningMems = async (req, res) => {
  const webDataUG = await Team.aggregate([
    { 
      $match: {
        "events.web.name": { $nin: ["", "N/A"] },
        "events.web.phone": { $nin: ["", "N/A"] }
      }
    },
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
    { 
      $match: {
        "events.web.name": { $nin: ["", "N/A"] },
        "events.web.phone": { $nin: ["", "N/A"] }
      }
    },
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
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data
    const ugPage = await browser.newPage();
    const ugHtml = generateHtml(webDataUG, "UG", "Web Designing");
    ugPage.setDefaultNavigationTimeout(0);
    await ugPage.setContent(ugHtml);
    const ugPdfBuffer = await ugPage.pdf({ format: "A4" });

    // PG Data
    const pgPage = await browser.newPage();
    const pgHtml = generateHtml(webDataPG, "PG", "Web Designing");
    pgPage.setDefaultNavigationTimeout(0);
    await pgPage.setContent(pgHtml);
    const pgPdfBuffer = await pgPage.pdf({ format: "A4" });


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

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};


const getItManagerMems = async (req, res) => {
  const itManagerData = await Team.aggregate([
    { 
    $match: {
      "events.itManager.name": { $nin: ["", "N/A"] },
      "events.itManager.phone": { $nin: ["", "N/A"] }
    }
  },
    { $unwind: "$events.itManager" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.itManager.name",
        phone: "$events.itManager.phone"
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // Data
    const page = await browser.newPage();
    const html = generateHtmlFor1(itManagerData, "PG", "IT Manager");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=it-manager-participants.pdf");
    res.write(pdfBuffer);
    res.end();
    // Close the browser
    await browser.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getDesigningMems = async (req, res) => {
  const designingData = await Team.aggregate([
    { 
      $match: {
        "events.designing.name": { $nin: ["", "N/A"] },
        "events.designing.phone": { $nin: ["", "N/A"] }
      }
    },
    { $unwind: "$events.designing" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.designing.name",
        phone: "$events.designing.phone"
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // Data
    const page = await browser.newPage();
    const html = generateHtmlFor1(designingData, "PG", "Designing");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=designing-participants.pdf");
    res.write(pdfBuffer);
    res.end();
    // Close the browser
    await browser.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getPhotographyMems = async (req, res) => {
  const photographyData = await Team.aggregate([
    { 
      $match: {
        "events.photography.name": { $nin: ["", "N/A"] },
        "events.photography.phone": { $nin: ["", "N/A"] }
      }
    },
    { $unwind: "$events.photography" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.photography.name",
        phone: "$events.photography.phone"
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // Data
    const page = await browser.newPage();
    const html = generateHtmlFor1(photographyData, "UG/PG", "Photography");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=photography-participants.pdf");
    res.write(pdfBuffer);
    res.end();
    // Close the browser
    await browser.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getProductLaunchMems = async (req, res) => {
  const productLaunchData = await Team.aggregate([
    { 
      $match: {
        "events.productLaunch.name": { $nin: ["", "N/A"] },
        "events.productLaunch.phone": { $nin: ["", "N/A"] }
      }
    },
    { $unwind: "$events.productLaunch" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.productLaunch.name",
        phone: "$events.productLaunch.phone"
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // Data
    const page = await browser.newPage();
    const html = generateHtmlFor1(productLaunchData, "UG/PG", "Product Launch");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=productLaunch-participants.pdf");
    res.write(pdfBuffer);
    res.end();
    // Close the browser
    await browser.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getDebateMems = async (req, res) => {
  const debateData = await Team.aggregate([
    { 
      $match: {
        "events.debate.name": { $nin: ["", "N/A"] },
        "events.debate.phone": { $nin: ["", "N/A"] }
      }
    },
    { $unwind: "$events.debate" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.debate.name",
        phone: "$events.debate.phone"
      },
    },
  ]);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // Data
    const page = await browser.newPage();
    const html = generateHtmlFor1(debateData, "UG/PG", "Debate");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=debate-participants.pdf");
    res.write(pdfBuffer);
    res.end();
    // Close the browser
    await browser.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getDumbCharadesMems = async (req, res) => {

  const dumbCharadesData = await Team.aggregate([
    {
        $match: {
            "events.dumbCharades.name": { $nin: ["", "N/A"] },
            "events.dumbCharades.phone": { $nin: ["", "N/A"] }
        }
    },
    { $unwind: "$events.dumbCharades" },
    {
        $project: {
            _id: 0,
            teamName: "$teamName",
            name: "$events.dumbCharades.name",
            phone: "$events.dumbCharades.phone",
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
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data

    const page = await browser.newPage();
    const html = generateHtml(dumbCharadesData, "UG", "Dumb Charades");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=dumb-charades-participants.pdf");
    res.write(pdfBuffer);
    res.end();

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getQuizMems = async (req, res) => {

  const quizData = await Team.aggregate([
    {
        $match: {
            "events.quiz.name": { $nin: ["", "N/A"] },
            "events.quiz.phone": { $nin: ["", "N/A"] }
        }
    },
    { $unwind: "$events.quiz" },
    {
        $project: {
            _id: 0,
            teamName: "$teamName",
            name: "$events.quiz.name",
            phone: "$events.quiz.phone",
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
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data

    const page = await browser.newPage();
    const html = generateHtml(quizData, "UG/PG", "Quiz");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=quiz-participants.pdf");
    res.write(pdfBuffer);
    res.end();

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getGamingMems = async (req, res) => {

  const gamingData = await Team.aggregate([
    {
        $match: {
            "events.gaming.name": { $nin: ["", "N/A"] },
            "events.gaming.phone": { $nin: ["", "N/A"] }
        }
    },
    { $unwind: "$events.gaming" },
    {
        $project: {
            _id: 0,
            teamName: "$teamName",
            name: "$events.gaming.name",
            phone: "$events.gaming.phone",
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
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data

    const page = await browser.newPage();
    const html = generateHtml(gamingData, "UG/PG", "Gaming");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=gaming-participants.pdf");
    res.write(pdfBuffer);
    res.end();

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getTreasureMems = async (req, res) => {

  const treasureData = await Team.aggregate([
    {
        $match: {
            "events.treasure.name": { $nin: ["", "N/A"] },
            "events.treasure.phone": { $nin: ["", "N/A"] }
        }
    },
    { $unwind: "$events.treasure" },
    {
        $project: {
            _id: 0,
            teamName: "$teamName",
            name: "$events.treasure.name",
            phone: "$events.treasure.phone",
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
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // UG Data

    const page = await browser.newPage();
    const html = generateHtml(treasureData, "UG/PG", "Tressure Hunt");
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=tressure-hunt-participants.pdf");
    res.write(pdfBuffer);
    res.end();

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};

const getDanceMems = async (req, res) => {

  const danceData = await Team.aggregate([
    { $unwind: "$events.dance" },
    {
      $project: {
        _id: 0,
        teamName: "$teamName",
        name: "$events.dance.name",
        phone: "$events.dance.phone"
      }
    },
    {
      $group: {
        _id: "$teamName",
        members: { $push: { name: "$name", phone: "$phone" } }
      }
    },
    {
      $addFields: {
        members: {
          $slice: ["$members", 0, { $min: [{ $size: "$members" }, 7] }]
        }
      }
    },
    {
      $project: {
        _id: 1,
        members: {
          $filter: {
            input: "$members",
            as: "member",
            cond: { $ne: ["$$member.name", ""] }
          }
        }
      }
    },
    {
      $match: {
        "members.phone": { $nin: ["", "N/A"] },
        "members.name": { $nin: ["", "N/A"] }
      }
    },
  ]);


  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
      ],
      executablePath:  process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    // Data

    const page = await browser.newPage();
    const html = generateHtmlForDance(danceData);
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","inline; filename=dance-participants.pdf");
    res.write(pdfBuffer);
    res.end();

    // res.send(danceData);

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }

};



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

function generateHtmlFor1(data, category, event) {
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
                      <td>${team.teamName}</td>
                      <td>${team.name}</td>
                      <td>${team.phone}</td>
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

function generateHtmlForDance(data) {
  return `
    <html>
      <head>
        <title>Dance Participants </title>
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
          <h1 style="text-align:center">Dance</h1>
          <h2>UG/PG</h2>
          <table border=1>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Participants</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(
                (team) => `
                  <tr>
                    <td rowspan="${team.members.length}">${team._id}</td>
                    ${team.members
                      .map(
                        (member) => `
                          <td>${member.name}</td>
                          <td>${member.phone}</td>
                        `
                      )
                      .join("</tr><tr>")}
                  </tr>
                `
              ).join("")}
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
