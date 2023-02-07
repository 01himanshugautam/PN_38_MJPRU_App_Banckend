import { mapWithObject } from './helper-function.util';

export async function executeAsync(db: any, query: string) {
  return await new Promise((resolve, reject) => {
    db.query(query, (err: any, result: any) => {
      if (err) {
        throw reject(err);
      }
      resolve(mapWithObject(result));
    });
  });
}
