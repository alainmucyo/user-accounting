import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserDetailsDto } from "./dto/user-details.dto";
import { UserDetailService } from "./user-detail.service";
import { User } from "../user/user.entity";

@ApiTags("User Details")
@Controller({ version: "1", path: "user-detail" })
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/user-details")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: "User details saved successfully",
    type: UserDetailsDto,
  })
  @ApiForbiddenResponse({ description: "Not allowed to access" })
  @ApiOperation({ summary: "Save user details" })
  save(@Body() userDetailDto: UserDetailsDto, @Request() req) {
    const user: User = req.user;

    return this.userDetailService.save(userDetailDto, user);
  }
}
