import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "src/utils/taskStatus";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    reward: string;

    @IsEnum(TaskStatus)
    status: TaskStatus.Open

}
