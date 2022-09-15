import { User } from "src/users/users.model";


export class UpdateEventDto {
    readonly title: string;
    readonly date: Date;
    readonly userId: number;
}
