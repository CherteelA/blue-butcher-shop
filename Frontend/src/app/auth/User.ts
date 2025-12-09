export class User {
  id: string = "";
  username: string = "";
  password: string = "";
  email: string = "";
  created_at: string = "";
  admin: boolean = false;

  constructor(id: string, username: string, password: string, email: string, admin: boolean, created_at :string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.admin = admin;
    this.created_at = created_at;
  }

}
