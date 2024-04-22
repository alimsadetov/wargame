import { RolesService } from './../../roles/roles.service';
import { Injectable } from '@nestjs/common';
import { SecureService } from '../../../utils/secure.service';
import { ValidationException } from '../../../exceptions/validation.exception';
import { User } from '../entities/user.entity';
import { USER_WITH_EMAIL_ALREADY_EXISTS_ERROR } from '../constants/auth.errors';
import { RegistrationDto } from '../dto/registration.dto';
import { AGENT_ROLE_ID } from '../../../modules/roles/roles-precreated-via-migrations';
import { UserEvernetService } from './user-evernet.service';
import { EvernetType } from '../types/evernet.type';

@Injectable()
export class UserService {
  constructor(
    private readonly secureService: SecureService,
    private readonly rolesService: RolesService,
    private readonly userEvernetService: UserEvernetService,
  ) {}

  async findOneByLogin(login: string): Promise<User> {
    const user = await User.findOne({
      where: { login },
      select: ['id', 'login', 'passwordHash'],
      relations: ['roles', 'wallets', 'userEvernet'],
    });
    if (user && !user.userEvernet) {
      console.log(true);
      user.userEvernet = await this.userEvernetService.create(user.id);
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id }, relations: ['wallets', 'roles', 'userEvernet'] });
    if (user && !user.userEvernet) {
      user.userEvernet = await this.userEvernetService.create(user.id);
    }
    return user;
  }

  async findOneByWallet(walletAddress: string): Promise<User> {
    const user = await User.findOne({ where: { wallets: { address: walletAddress } }, relations: ['wallets', 'roles', 'userEvernet'] });
    return user;
  }

  async findByEvernet(evernet: EvernetType): Promise<string[]> {
    const users = await User.find({ where: { userEvernet: { evernet } }, relations: ['wallets', 'roles', 'userEvernet'] });
    return [].concat(...users.map((user) => user.wallets.map((wallet) => wallet.address)));
  }

  async createUser(regDto: RegistrationDto): Promise<User> {
    let user = await this.findOneByLogin(regDto.login);
    if (user) {
      throw new ValidationException(USER_WITH_EMAIL_ALREADY_EXISTS_ERROR, 'login');
    }
    user = await User.save({
      login: regDto.login,
      passwordHash: await this.secureService.hashString(regDto.password),
      createdAt: new Date(),
    });
    user.userEvernet = await this.userEvernetService.create(user.id);
    return user;
  }

  async createAgent(login: string, password: string): Promise<User> {
    let user = await this.findOneByLogin(login);
    if (user) {
      throw new ValidationException(USER_WITH_EMAIL_ALREADY_EXISTS_ERROR, 'login');
    }
    const role = await this.rolesService.findOneById(AGENT_ROLE_ID);

    let savedUser = await User.save({
      login: login,
      passwordHash: await this.secureService.hashString(password),
      roles: [role],
      createdAt: new Date(),
    });
    savedUser.userEvernet = await this.userEvernetService.create(savedUser.id);
    return savedUser;
  }

  async findOrcreateUserForWallet(login: string): Promise<User> {
    let user = await this.findOneByLogin(login);
    if (!user) {
      return await this.createUserForWallet(login);
    }
    return user;
  }

  async createUserForWallet(login: string): Promise<User> {
    const password = this.generateRandomString();
    let user = await User.save({
      login: login,
      passwordHash: await this.secureService.hashString(password),
      createdAt: new Date(),
    });
    user.userEvernet = await this.userEvernetService.create(user.id);
    return user;
  }

  private generateRandomString(stringLength = 8): string {
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsForPassword = [];

    for (let i = 0; i < stringLength; i++) {
      charsForPassword.push(possibleChars.charAt(Math.floor(Math.random() * possibleChars.length)));
    }

    return charsForPassword.join('');
  }
}
