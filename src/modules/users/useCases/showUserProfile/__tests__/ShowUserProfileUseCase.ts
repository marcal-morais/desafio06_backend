import { ShowUserProfileUseCase } from './../ShowUserProfileUseCase';
import { InMemoryUsersRepository } from '../../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { ShowUserProfileError } from '../ShowUserProfileError';

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show profile users tests", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to show a profile user", async () => {
    const user = { name: "John Doe", email: "john.doe@gmail.com", password: "123456" };
    const userCreated = await createUserUseCase.execute(user);
    const result = await showUserProfileUseCase.execute(userCreated.id as string);

    expect(result).toHaveProperty("id");
  });

  it("should not be able to show a profile nonexist user", async () => {
    expect(async () => {
      const user = { name: "John Doe", email: "john.doe@gmail.com", password: "123456" };
      await createUserUseCase.execute(user);
      await showUserProfileUseCase.execute("123");

    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
