export interface UserData {
  username: string,
  age: number,
  hobbies: string[]
}

export interface User extends UserData {
  id: string
}

export interface HttpResponse { 
  code: number, 
  message: string 
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}