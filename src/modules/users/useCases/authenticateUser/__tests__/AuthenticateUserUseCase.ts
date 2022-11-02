import { InMemoryUsersRepository } from '../../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from '../AuthenticateUserUseCase';
import { IncorrectEmailOrPasswordError } from '../IncorrectEmailOrPasswordError';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create users tests", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });
  it("should be able to user authenticate", async () => {
    const user = { name: "John Doe", email: "john.doe@gmail.com", password: "123456" };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty("token");
  });

  it("must not authenticate without a valid user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: "false@email.com", password: "123456" });

    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it("must not authenticate without a valid pass", async () => {
    expect(async () => {
      const user = { name: "John Doe", email: "john.doe@gmail.com", password: "123456" };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: user.email, password: "1234567" });

    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
});
