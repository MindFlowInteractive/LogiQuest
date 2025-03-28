import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator"

export enum LifelineType {
  FIFTY_FIFTY = "fiftyFifty",
  ASK_FRIEND = "askFriend",
  AUDIENCE_POLL = "audiencePoll",
}

export class UseLifelineDto {
  @IsEnum(LifelineType)
  @IsNotEmpty()
  @ApiProperty({
    description: "The type of lifeline to use",
    enum: LifelineType,
    example: LifelineType.FIFTY_FIFTY,
  })
  lifelineType: LifelineType

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the step/question for which the lifeline is used",
    example: 3,
  })
  stepId: number
}

