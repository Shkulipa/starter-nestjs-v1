import { IQuery, IParsedQuery } from 'src/common/interfaces/query.interfaces';

export const queryHelper = ({ limit, page }: IQuery): IParsedQuery => {
  limit ? (limit = Math.max(1, Math.round(+limit))) : (limit = 10);
  page ? (page = Math.max(1, Math.round(+page))) : (page = 1);

  return { limit, page };
};
