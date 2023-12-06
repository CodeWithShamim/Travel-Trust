export type IFilters = {
  amount?: string;
  currency?: string;
  transactionId?: string;
  paymentIntent?: string;
  searchTerm?: string;
};

export type IPaymentIntentResponse = {
  id: string;
  clientSecret: string | null;
};
