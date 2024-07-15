import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  username: string;
  password: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  email: string;
}
