import { config } from 'dotenv';

config();

export interface IEnv {
  node_env: string;
  port: number;
  db_host: string;
  db_port: string;
  db_name: string;
  db_user: string;
  db_password: string;

  [key: string]: string | number;
}

export class EnvironmentService {
  public static getOne(key: keyof IEnv): string {
    return <string>EnvironmentService.getMany()[key];
  }
  public static getMany(): IEnv {
    return <IEnv> {
      port: Number(process.env.PORT),
      db_name: process.env.DB_NAME as string,
      db_port: process.env.DB_PORT as string,
      db_host: process.env.DB_HOST as string,
      db_user: process.env.DB_USER as string,
      db_password: process.env.DB_PASSWORD as string,
      node_env: process.env.NODE_ENV as string,
    };
  }
}
