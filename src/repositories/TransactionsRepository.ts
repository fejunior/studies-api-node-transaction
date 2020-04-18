import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionList {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): TransactionList {
    const transactionsDisplay = {
      transactions: this.transactions,
      balance: this.balance,
    };

    return transactionsDisplay;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'outcome') {
      if (value > this.balance.total) {
        throw Error('string');
      }
      this.balance.outcome += value;
      this.balance.total -= value;
    } else {
      this.balance.income += value;
      this.balance.total += value;
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
