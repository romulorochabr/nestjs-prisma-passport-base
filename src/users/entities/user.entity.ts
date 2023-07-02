import { Role } from "src/auth/enums/role.enum";

export class User {
    userId:  number;

    username: string;

    password: string;

    roles: Role[];
}
