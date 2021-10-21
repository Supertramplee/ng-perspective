import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import perspective, { PerspectiveEvents, PerspectiveWorker } from "@finos/perspective";

import "@finos/perspective-workspace";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import { PerspectiveViewerElement } from '@finos/perspective-viewer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  // encapsulation: ViewEncapsulation.None
}

) export class AppComponent {
  private worker: PerspectiveWorker;
  table: any;
  title = 'ng-perspective';

  @ViewChild('tableOnly', { static: false }) tableOnly: PerspectiveViewerElement

  constructor() {
    this.worker = perspective.worker();
  }

  datasource = async () => {

    const SCHEMA = {
      "Title": "string",
      "US Gross": "float",
      "Worldwide Gross": "float",
      "US DVD Sales": "float",
      "Production Budget": "float",
      "Release Date": "date",
      "MPAA Rating": "string",
      "Running Time min": "integer",
      "Distributor": "string",
      "Source": "string",
      "Major Genre": "string",
      "Creative Type": "string",
      "Director": "string",
      "Rotten Tomatoes Rating": "integer",
      "IMDB Rating": "float",
      "IMDB Votes": "integer"
    };

    const URL = "https://vega.github.io/editor/data/movies.json";

    const request = fetch(URL);
    const response = await request;
    const json = await response.json();
    for (const row of json) {
      row["Release Date"] = row["Release Date"] ? new Date(row["Release Date"]) || null : null;
    }
    const table = await this.worker.table(SCHEMA);
    table.update(json);
    return table;
  };

  async ngOnInit(): Promise<void> {
    this.table = await this.datasource()
    this.initWorkspace()
    this.initTableOnly()
  }

  initWorkspace() {
    let layout = {

      "sizes": [0.35, 0.65],
      "detail": {
        "main": {
          "type": "split-area",
          "orientation": "vertical",
          "children": [{
            "type": "tab-area",
            "widgets": ["PERSPECTIVE_GENERATED_ID_0",
              "PERSPECTIVE_GENERATED_ID_3"
            ],
            "currentIndex": 0
          },
          {
            "type": "tab-area",
            "widgets": ["PERSPECTIVE_GENERATED_ID_1"],
            "currentIndex": 0
          }],
          "sizes": [0.5, 0.5]
        }
      },
      "mode": "globalFilters",
      "master": {
        "widgets": ["PERSPECTIVE_GENERATED_ID_2"],
        "sizes": [0.5, 0.5]
      },
      "viewers": {
        "PERSPECTIVE_GENERATED_ID_2": {
          "selectable": true,
          "plugin": "Datagrid",
          "row_pivots": ["Distributor"],
          "aggregates": {
            "IMDB Rating": "avg"
          },
          "sort": [["US Gross",
            "desc"]],
          "columns": ["US Gross"],
          "expressions": null,
          "column_pivots": null,
          "filter": null,
          "plugin_config": {
            "IMDB Rating": {
              "color_mode": "gradient",
              "pos_color": "#b87ff0",
              "neg_color": "#FF9485",
              "gradient": 8.1
            }

            ,
            "US Gross": {
              "color_mode": "gradient",
              "pos_color": "#126e3a",
              "neg_color": "#FF9485",
              "gradient": 19729862602
            }
          }

          ,
          "master": true,
          "name": null,
          "table": "movies",
          "linked": false
        }

        ,
        "PERSPECTIVE_GENERATED_ID_0": {

          "plugin": "X/Y Scatter",
          "row_pivots": ["Title"],
          "aggregates": {
            "IMDB Rating": "avg",
            "Rotten Tomatoes Rating": "avg",
            "Director": "last",
            "Release Date": "last",
            "MPAA Rating": "last"
          }

          ,
          "sort": [["US Gross",
            "asc"]],
          "columns": ["Rotten Tomatoes Rating",
            "IMDB Rating",
            "US Gross",
            null,
            "Director",
            "Release Date",
            "MPAA Rating"
          ],
          "selectable": null,
          "expressions": null,
          "column_pivots": null,
          "filter": null,
          "plugin_config": {
            "realValues": ["Rotten Tomatoes Rating",
              "IMDB Rating",
              "US Gross",
              null,
              "Director",
              "Release Date",
              "MPAA Rating"

            ],
            "zoom": {
              "k": 1,
              "x": 0,
              "y": 0
            }
          },
          "master": false,
          "name": null,
          "table": "movies",
          "linked": false
        }

        ,
        "PERSPECTIVE_GENERATED_ID_3": {
          "plugin": "Y Area",
          "expressions": ["bucket(\"Release Date\", 'Y')"],
          "row_pivots": ["bucket(\"Release Date\", 'Y')"],
          "aggregates": {
            "Rotten Tomatoes Rating": "avg"
          },
          "columns": ["US Gross"],
          "column_pivots": ["Major Genre"],
          "selectable": null,

          "filter": null,
          "sort": null,
          "plugin_config": {
            "realValues": ["US Gross"],
            "legend": {
              "left": "91px",
              "top": "25px"
            }
          },
          "master": false,
          "name": "US Gross by Genre",
          "table": "movies",
          "linked": false
        }

        ,
        "PERSPECTIVE_GENERATED_ID_1": {
          "plugin": "Y Line",
          "expressions": ["bucket(\"Release Date\", 'Y')"],
          "row_pivots": ["bucket(\"Release Date\", 'Y')"],
          "aggregates": {
            "Rotten Tomatoes Rating": "avg"
          },
          "columns": [
            "US Gross",
            "Rotten Tomatoes Rating",
            "Production Budget",
            "Worldwide Gross",
            "US DVD Sales"
          ],
          "selectable": null,
          "column_pivots": null,
          "filter": null,
          "sort": null,
          "plugin_config": {
            "realValues": [
              "US Gross",
              "Rotten Tomatoes Rating",
              "Production Budget",
              "Worldwide Gross",
              "US DVD Sales"
            ],
            "splitMainValues": ["Rotten Tomatoes Rating"],
            "legend": {
              "left": "79px",
              "top": "174px"
            }
          },
          "master": false,
          "name": "Ratings vs Sales",
          "table": "movies",
          "linked": false
        }
      }
    };
    let el = document.getElementById("workspace");
    (el as any).tables.set("movies", this.table);
    (el as any).restore(layout);
  }


  async initTableOnly() {
    let el = document.getElementById("tableOnly") as PerspectiveViewerElement;
    el.load(this.table);
    el.restore({
      "row_pivots": [
        "Distributor",
        "MPAA Rating"
      ],
      "column_pivots": [
        "Creative Type"
      ],
      "columns": [
        "US Gross"
      ],
      "aggregates": {
        "IMDB Rating": "avg"
      },
      "sort": [["US Gross", "desc"]],
      "expressions": null,
      "filter": null,
    })
    el.addEventListener("perspective-click", function (event: any) {
      console.log(event)
      var config = event.detail.config;
      // el.restore(config);
    });
  }

  logSettings() {
    let el = document.getElementById("workspace");
    (el as any).save().then(json => {
      console.log(json)
    })
  }
}