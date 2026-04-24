import { ITerritory } from "../../../contexts/interfaces";
import { groupBy } from "../../../helpers/arrays";
import { formatDate, getCheckoutsForServiceYear, getLastWorkedDate } from "./checkouts";

const baseHtmlHead = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Przykład kartoterki terenów</title>
    <style> 
         h1 {
            text-align: center;
            text-transform: uppercase;
        }

        body {
            padding: 50px 20px;
            margin: 0 auto;
        }

        table thead,
        tr,
        th,
        td {
            border-collapse: collapse;
        }

        #main {
            border: 5px solid black;
            table-layout: fixed;
        }

        #main {
            border-collapse: collapse;
        }

        .nested td {
          width: 100%;
            text-align: center;
            padding: 4px 14px;
        }


        .nested,
        .nested tr,
        .nested td {
            border-collapse: collapse;
        }

        th:not(.nested th),
        td:not(.nested td) {
            border: 2px solid black;
            text-align: center;
            border-collapse: collapse;
        }

        .nested tr {
          width: 100%;
        }

        .nested th {
            padding: 0 10px;
        }

        th {
            background-color: #D9D9D9;
            color: #404040;
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

export function buildTerritoryHistoryPDF(territories: ITerritory[]) {
  const groupedTerritories = groupBy(territories, item => item.kind);
  let date = new Date();
  const serviceYear = date.getMonth() <= 7 ? date.getFullYear() : date.getFullYear() + 1;
  const content = Object.keys(groupedTerritories)
    .map(
      (kind) => `
        <h1 style="font-weight: 700; margin-top: 30px;">Zestawienie przydziałów terenów</h1>
        <p style="font-weight: 400; text-align: center; font-size: 22px; margin-top: 10px;">${territoriesKinds[kind] || kind}</p>

        <h2 style="font-weight: 700; margin-top: 30px;">Rok służbowy: ${serviceYear}</h2>
        <table id="main">
        <colgroup>
    <col style="width:60px">
    <col style="width:140px">
    <col style="width:180px">
    <col style="width:180px">
    <col style="width:180px">
    <col style="width:180px">
  </colgroup>

        <tbody>
        <tr>
                <th style="padding: 0 10px;">Teren <br> nr</th>
                <th style="border-right: 5px solid black; padding: 0 10px;">Data <br> ostatniego <br> opracowania</th>
                <th>
                    <table class="nested">
                        <tr style="border-bottom: 2px solid black;">
                            <th colspan="2" style="border-collapse: collapse;">Przydzielono: </th>
                        </tr>
                        <tr>
                            <th>Data <br> przydziału</th>
                            <th style="border-left: 2px solid black">Data <br> opracowania</th>
                        </tr>
                    </table>
                    
                </th>
                <th>
                    <table class="nested">
                        <tr style="border-bottom: 2px solid black;">
                            <th colspan="2">Przydzielono: </th>
                        </tr>
                        <tr>
                            <th>Data <br> przydziału</th>
                            <th style="border-left: 2px solid black">Data <br> opracowania</th>
                        </tr>
                    </table>
                    
                </th>
                <th>
                    <table class="nested">
                        <tr style="border-bottom: 2px solid black;">
                            <th colspan="2">Przydzielono: </th>
                        </tr>
                        <tr>
                            <th>Data <br> przydziału</th>
                            <th style="border-left: 2px solid black">Data <br> opracowania</th>
                        </tr>
                    </table>
                    
                </th>
                <th>
                    <table class="nested">
                        <tr style="border-bottom: 2px solid black;">
                            <th colspan="2">Przydzielono: </th>
                        </tr>
                        <tr>
                            <th>Data <br> przydziału</th>
                            <th style="border-left: 2px solid black">Data <br> opracowania</th>
                        </tr>
                    </table>
                    
                </th>
            </tr>
           ${groupedTerritories[kind].map((t) => {
            const checkouts = getCheckoutsForServiceYear(t, serviceYear);
const lastWorkedDate = getLastWorkedDate(t, serviceYear);

return `
<tr>
  <td>${t.number}</td>

  <td style="border-right:5px solid black;">
    ${lastWorkedDate}
  </td>

  ${checkouts.map(entry => `
    <td>
      <table class="nested">
        <tr style="border-bottom: 1px solid black;">
          <td colspan="2">
            ${
              entry
                ? `${entry.preacher?.name || ""}`
                : ""
            }
          </td>
        </tr>
        <tr>
          <td>${entry ? formatDate(entry.takenDate) : ""}</td>
          <td style="border-left: 1px solid black">${entry && !entry.isActive ? formatDate(entry.passedBackDate) : ""}</td>
        </tr>
      </table>
    </td>
  `).join("")}
</tr>
`;
           }).join("")}
      
        </tbody>
    </table>
  
       
        
          
        `
    )
    .join("");

  return `
    <html>
      ${baseHtmlHead}
      <body>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                  ${content}
                </div>
            </div>
        </div>
      </body>
    </html>
  `;
}
