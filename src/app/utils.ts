import { AppState, Folder } from "../@types";

export default class Config {
  constructor(protected appState?: AppState) {}

  checkIfBodyIsEmpty(body: any) {
    return Object.keys(body).length > 0 ? this.formatJson(body) : undefined;
  }

  formatJson(body: any) {
    return JSON.stringify(body, null, 4);
  }

  transformPath(path: string, folder: string, version?: string) {
    return `${this.appState?.baseUrl}/${
      version ? `/${version}` : ""
    }${folder}/${path}`;
  }

  getGetMethodApis() {
    const apis = this.appState?.apis!;

    const getMethods = apis?.filter((api) => {
      if (api.method === "GET") {
        return api;
      }
    });

    return getMethods;
  }

  getPostMethodApi() {
    const apis = this.appState?.apis!;

    const postMethods = apis?.filter((api) => {
      if (api.method === "POST") {
        return api;
      }
    });

    return postMethods;
  }

  getPatchMethodApi() {
    const apis = this.appState?.apis!;

    const patchMethods = apis?.filter((api) => {
      if (api.method === "PATCH") {
        return api;
      }
    });

    return patchMethods;
  }

  getPutMethodApi() {
    const apis = this.appState?.apis!;

    const putMethods = apis?.filter((api) => {
      if (api.method === "PUT") {
        return api;
      }
    });

    return putMethods;
  }

  getDeleteMethodApi() {
    const apis = this.appState?.apis!;

    const deleteMethods = apis?.filter((api) => {
      if (api.method === "DELETE") {
        return api;
      }
    });

    return deleteMethods;
  }

  getFolderNamesFromApi() {
    const apis = this.appState?.apis!;

    const foldersSet = new Set(apis.map((api) => api.folder));

    const folders = [...foldersSet];

    return folders;
  }

  arrangeByFolderName(): Folder[] {
    const apis = this.appState?.apis!;

    return apis.reduce((acc, folder) => {
      const f = folder.folder;

      let data: any = {
        ...acc,
      };

      if (data[f.toUpperCase()]?.length > 0) {
        data[f.toUpperCase()].push({
          body: this.checkIfBodyIsEmpty(folder.body),
          header: folder.header,
          method: folder.method,
          path: this.transformPath(folder.path, folder.folder, folder?.version),
          version: folder.version,
        });
      } else {
        data[f.toUpperCase()] = [
          {
            body: this.checkIfBodyIsEmpty(folder.body),
            header: folder.header,
            method: folder.method,
            path: this.transformPath(
              folder.path,
              folder.folder,
              folder?.version
            ),
            version: folder.version,
          },
        ];
      }

      return data;
    }, []);
  }
}
