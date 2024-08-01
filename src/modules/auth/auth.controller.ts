import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UniqueValidationPipe } from './pipe/unique.pipe';
import {
  ChangePasswordDto,
  CreateLoginDto,
  CreateUserDto,
  ResetAccountDto,
  VerifyCodeDto,
} from './dto/authentication.dto';
import { BaseResponse } from '../../libs/response/base_response';
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-account')
  @UsePipes(UniqueValidationPipe)
  async registerAccount(
    @Body() createUserDto: CreateUserDto,
  ): Promise<BaseResponse<any>> {
    return this.authService.createUser(createUserDto);
  }

  @Post('verify-account-email')
  async verifyAccountEmail(
    @Body() verifyAccountEmail: VerifyCodeDto,
  ): Promise<BaseResponse<HttpStatus> | BaseResponse<{ user: UserEntity }>> {
    return this.authService.verifyWithEmail(verifyAccountEmail);
  }

  @Post('verify-account-phone')
  async verifyAccountPhone(
    @Body() verifyAccountPhone: VerifyCodeDto,
  ): Promise<BaseResponse<UserEntity | null>> {
    return this.authService.verifyWithPhone(verifyAccountPhone);
  }

  @Post('reset-account')
  async resetAccount(
    @Body() resetAccount: ResetAccountDto,
  ): Promise<BaseResponse<UserEntity | null>> {
    return this.authService.resetAccount(resetAccount);
  }

  @Post('change-password')
  async changePassword(
    @Body() changePassword: ChangePasswordDto,
  ): Promise<BaseResponse<UserEntity | null>> {
    return this.authService.changePassword(changePassword);
  }

  @Post('login')
  async login(
    @Body() createLoginDto: CreateLoginDto,
  ): Promise<BaseResponse<UserEntity | null>> {
    return this.authService.login(createLoginDto);
  }

  //resendVerificationCode
  @Post('resend-verification-code')
  async resendVerificationCode(
    @Body() data: ResetAccountDto,
  ): Promise<BaseResponse<UserEntity | null>> {
    return this.authService.resendVerificationCode(data);
  }
}
