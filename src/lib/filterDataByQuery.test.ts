import filterDataByQuery from "./filterDataByQuery";

describe("filterDataByQuery", () => {
  test("given a data array and a query, when the query is an exact match, then return only the exact match value", () => {
    const testData = [
      { id: 1, value: "apple" },
      { id: 2, value: "banana" },
    ];

    const filteredData = filterDataByQuery(testData, "apple");

    expect(filteredData).toHaveLength(1);
    expect(filteredData[0]).toEqual({
      id: 1,
      value: "apple",
      startMatchIndex: 0,
      endMatchIndex: 4,
    });
  });

  test("given a data array and a query, when the query is a match but with different case, then return matches case insensitive", () => {
    const testData = [
      { id: 1, value: "apple" },
      { id: 2, value: "banana" },
    ];

    const filteredData = filterDataByQuery(testData, "bANanA");

    expect(filteredData).toHaveLength(1);
    expect(filteredData[0]).toEqual({
      id: 2,
      value: "banana",
      startMatchIndex: 0,
      endMatchIndex: 5,
    });
  });

  test("given a data array and a query, when the query is a match but has accents, then return the match", () => {
    const testData = [
      { id: 1, value: "apple" },
      { id: 2, value: "café" },
    ];

    const filteredData = filterDataByQuery(testData, "cafe");

    expect(filteredData).toHaveLength(1);
    expect(filteredData[0]).toEqual({
      id: 2,
      value: "café",
      startMatchIndex: 0,
      endMatchIndex: 3,
    });
  });

  test("given a data array and a query, when the query has accents, then return the match without the accent", () => {
    const testData = [
      { id: 1, value: "apple" },
      { id: 2, value: "cafe" },
    ];

    const filteredData = filterDataByQuery(testData, "café");

    expect(filteredData).toHaveLength(1);
    expect(filteredData[0]).toEqual({
      id: 2,
      value: "cafe",
      startMatchIndex: 0,
      endMatchIndex: 3,
    });
  });

  test("given a data array and a query, when the query is partial match, then return all values matching the query", () => {
    const testData = [
      { id: 1, value: "apple" },
      { id: 2, value: "banana" },
      { id: 3, value: "tomato" },
      { id: 4, value: "peach" },
      { id: 5, value: "chocolate" },
    ];

    const filteredData = filterDataByQuery(testData, "at");

    expect(filteredData).toHaveLength(2);
    expect(filteredData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "tomato",
          startMatchIndex: 3,
          endMatchIndex: 4,
        }),
        expect.objectContaining({
          value: "chocolate",
          startMatchIndex: 6,
          endMatchIndex: 7,
        }),
      ])
    );
  });
});
