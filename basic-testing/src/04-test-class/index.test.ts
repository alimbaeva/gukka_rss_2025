import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(100);
    expect(account.getBalance()).toBe(100);
    const account2 = new BankAccount(0);
    expect(account2.getBalance()).toBe(0);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );
    const account2 = new BankAccount(0);
    expect(() => account2.withdraw(1)).toThrow(InsufficientFundsError);
    expect(() => account2.withdraw(1)).toThrow(
      'Insufficient funds: cannot withdraw more than 0',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    expect(() => account1.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account1.transfer(200, account2)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(1);
    expect(() => account.transfer(5, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(5, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = new BankAccount(1);
    account.deposit(5);
    expect(account.getBalance()).toBe(6);
  });

  test.each([
    { initialBalance: 100, withdrawAmount: 50, expectedBalance: 50 },
    { initialBalance: 200, withdrawAmount: 100, expectedBalance: 100 },
    { initialBalance: 100, withdrawAmount: 100, expectedBalance: 0 },
    {
      initialBalance: 50,
      withdrawAmount: 60,
      error: new InsufficientFundsError(50),
    },
    { initialBalance: 0, withdrawAmount: 0, expectedBalance: 0 },
  ])(
    'should withdraw money for $initialBalance, $withdrawAmount, expected: $expectedBalance',
    ({ initialBalance, withdrawAmount, expectedBalance, error }) => {
      const account = new BankAccount(initialBalance);

      if (error) {
        expect(() => account.withdraw(withdrawAmount)).toThrow(error);
      } else {
        account.withdraw(withdrawAmount);
        expect(account.getBalance()).toBe(expectedBalance);
      }
    },
  );

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);

    expect(() => account1.transfer(50, account1)).toThrow(TransferFailedError);
    expect(() => account2.transfer(50, account2)).toThrow(TransferFailedError);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(200);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    const balance = await account.fetchBalance();
    expect(balance).toBeNull();
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
