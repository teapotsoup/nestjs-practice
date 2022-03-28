import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/createAccount.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((type) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Query((type) => Boolean)
  test() {
    return true;
  }

  @Mutation((type) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return await this.userService.createAccount(
        createAccountInput,
      );
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }
  
  @Mutation(type => LoginOutput)
  async login(@Args('input') loginInput:LoginInput): Promise<LoginOutput>{
    try {
      return this.userService.login(loginInput)
    } catch (error) {
      return {
        ok: false,
        error,
      }
    }
  }
}
