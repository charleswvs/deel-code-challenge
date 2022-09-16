export interface FilterDataInput {
  id: string | number;
  value?: string;
}

export type FilterDataOutput<T> = T & {
  startMatchIndex?: number;
  endMatchIndex?: number;
};

const removeAccents = (value?: string) =>
  value?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function filterDataByQuery<
  T extends FilterDataInput = FilterDataInput
>(data: T[] = [], query = ""): FilterDataOutput<T>[] {
  const values = data.reduce((acc, current) => {
    // TODO: currently, `indexOf` searches for a a sequential subsequence. In the future, it can be improved by using approaches to match any subsequence instead, using Longest Common Subsequence (LCS) algorithm, for example.
    const startMatchIndex = removeAccents(current.value)
      ?.toLocaleLowerCase()
      .indexOf(removeAccents(query.toLocaleLowerCase())!);

    if (startMatchIndex !== undefined && startMatchIndex > -1) {
      return [
        ...acc,
        {
          ...current,
          startMatchIndex: startMatchIndex,
          endMatchIndex: startMatchIndex + query.length - 1,
        },
      ];
    }

    return acc;
  }, [] as FilterDataOutput<T>[]);

  return values;
}
