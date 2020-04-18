import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router(); // ok

const transactionsRepository = new TransactionsRepository(); // ok

transactionRouter.get('/', (request, response) => {
  const transactions = transactionsRepository.all();
  return response.json(transactions);
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body; // ok

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    ); // ok
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
