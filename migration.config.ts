import shell from 'shelljs';

export class Migration {
  public static run() {
    shell.exec('yarn migrate:up', { silent: false });
  }
}
