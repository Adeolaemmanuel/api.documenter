import { Api, AppState, Folder } from "../@types";

import ejs from "ejs";
import config from "../config/default";
import Config from "./utils";

export default class ApiDoc extends Config {
  constructor(protected appState?: AppState) {
    super({ ...config, ...appState });
    this.appState = { ...config, ...appState };
  }

  private static instance: ApiDoc;
  private engine = ejs;

  static getInstance(appState: AppState) {
    if (!this.instance) {
      this.instance = new ApiDoc(appState);
    }
    return this.instance;
  }

  addApi(api: Api) {
    this.appState?.apis?.push(api);
  }

  render(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.engine.renderFile(
        __dirname + "/views/index.ejs",
        {
          folders: this.arrangeByFolderName(),
          title: "",
          baseUrl: this.appState?.baseUrl,
        },
        function (err, data) {
          if (err) return reject(err);

          return resolve(data);
        }
      );
    });
  }
}

const ee = ApiDoc.getInstance({
  baseUrl: "localhost://api",
  apis: [
    {
      folder: "wallet",
      body: {
        name: "string",
        age: "int",
      },
      method: "POST",
      path: "create",
      header: { "Content-Type": "application/json" },
    },
    { folder: "wallet", body: {}, method: "PATCH", path: "update" },
    { folder: "sallet", body: {}, method: "GET", path: "" },
  ],
});

ee.addApi({ folder: "Math", body: {}, method: "GET", path: "" });

// console.log(ee.arrangeByFolderName());

ee.render().then((b) => console.log(b));
