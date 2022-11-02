import { InMemoryUsersRepository } from '../../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from '../CreateUserError';
import { CreateUserUseCase } from './../CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create users tests", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });
  it("should be able to create a new user", async () => {
    const user = { name: "John Doe", email: "john.doe@gmail.com", password: "123456" };
    await createUserUseCase.execute(user);
    const userCreated = await inMemoryUsersRepository.findByEmail(user.email);
    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user duplicated", async () => {

    expect(async () => {
      const user = { name: "John Doe", email: "john.doe@gmail.com", password: "123456" };
      await createUserUseCase.execute({ name: "John Doe", email: "john.doe@gmail.com", password: "123456" });
      await createUserUseCase.execute({ name: "John Doe", email: "john.doe@gmail.com", password: "123456" });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});
