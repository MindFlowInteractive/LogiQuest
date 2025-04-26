import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { LoginDto } from "./dto/login.dto"
import * as bcrypt from "bcrypt"
import { User } from "src/users/entities/user.entity"

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    if (user.role !== "admin") {
      throw new UnauthorizedException("Access denied: Admin privileges required")
    }

    const payload = { email: user.email, sub: user.id, role: user.role }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
        role: user.role,
      },
    }
  }
}

