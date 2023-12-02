type Method = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
type ContentType = "application/json" | "text/plain" | "text/json";

type Header = {
  Authorization: string;
  "Content-Type": ContentType;
};

export type Api = {
  path: string;
  version?: string;
  method: Method;
  body?: { [x: string]: any };
  header?: Partial<Header>;
  folder: string;
};

type Folder = Omit<Api, "folder" | "body"> & {
  body: string;
};

export type AppState = {
  baseUrl: string;
  apis?: Api[];
};

export enum DataType {
  String = "string",
  Int = "int",
  Boolean = "boolean",
}
