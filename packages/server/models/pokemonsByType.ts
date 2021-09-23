import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  types: string[];
}
const SIZE = 10;


export function query(args: {
  type: string;
  after?: string;
  limit?: number;
}): Connection<Pokemon> {
  const { type, after, limit = SIZE } = args;

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    type === undefined
      ? identity
      : A.filter(p => p.types.find(t => t.toLowerCase() === type.toLowerCase()) !== undefined);

    const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
    ? identity
    : as =>
        pipe(
            as,
            A.findIndex(a => a.id === after),
            O.map(a => a + 1),
            O.fold(() => as, idx => as.slice(idx))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByType,
    sliceByAfter,
    slice(0, limit + 1)
  );
  return toConnection(results,limit);
}
