import { ErrorMessages, Resolver } from './types';

export const customZodResolver: Resolver =
  (schema: any) => (values: object) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    } else {
      return {
        values: {},
        errors: result.error.format(),
      };
    }
  };

export const renderErrors = ({ _errors }: ErrorMessages) => {
  return _errors.map((val, idx) => <li key={idx}>{val}</li>);
};
