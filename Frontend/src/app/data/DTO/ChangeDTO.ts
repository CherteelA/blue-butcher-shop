export class NameChange {
  email: string;
  password: string;
  username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
export class PasswordChange {
  email: string;
  password: string;
  newPassword: string;

  constructor(email: string, password: string, newPassword: string) {
    this.email = email;
    this.password = password;
    this.newPassword = newPassword;
  }
}

export class EmailChange {
  email: string;
  password: string;
  newEmail: string;

  constructor(email: string, password: string, newEmail: string) {
    this.email = email;
    this.password = password;
    this.newEmail = newEmail;
  }
}
