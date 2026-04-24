import { ITerritory } from "../../../contexts/interfaces";
import { groupBy } from "../../../helpers/arrays";

const baseHtmlHead = `
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Montserrat', sans-serif;
        margin: 0 15px;
        font-style: normal;
      }
      thead {
        background: #1f8aad;
        color: #fff;
        font-family: 'Poppins', sans-serif;
      }
      tr:nth-of-type(2n) {
        background: rgba(0, 0, 0, 0.05);
      }
    </style>
  </head>
`;

const territoriesKinds = {
  city: "Tereny miejskie",
  village: "Tereny wiejskie",
  market: "Tereny handlowo-usługowe",
  other: "Inne tereny"
}

export function buildTerritorysPDF(territories: ITerritory[]) {
  const groupedTerritories = groupBy(territories, item => item.kind);
  const content = Object.keys(groupedTerritories)
    .map(
      (kind) => `
        <h2 style="font-weight: 700; margin-top: 30px;">${territoriesKinds[kind] || kind}</h2>
        <div style="display: flex; flex-wrap:wrap; justify-content: space-between; margin-bottom: 15px;">
          ${groupedTerritories[kind].map((t) => `<p style="width: 48%;">${t.number}. ${t?.city} ${t?.street} ${t?.beginNumber ? t?.beginNumber : ''} ${t.endNumber ? '- ' + t?.endNumber: ''} ${t.description || t?.description !== ''  ? '(' + t?.description + ')' : ''}</p>`)}
        </div>
          
        `
    )
    .join("");

  return `
    <html>
      ${baseHtmlHead}
      <body>
        <div class="container">
            <div class="row" style="margin-top: 5%;">
                <div class="col-lg-12">
                  <h1 class="text-center" style="font-weight: 700;">Tereny zboru</h1>
                  ${content}
                </div>
            </div>
        </div>
      </body>
    </html>
  `;
}
