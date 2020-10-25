const aggregateFnDict = {
  count: {
    aggregate: "count",
    Aggregated: ({ value, key }) => `${value}`,
  },
  "unique count": {
    aggregate: "uniqueCount",
    Aggregated: ({ value, key }) => `${value}`,
  },
  avg: {
    aggregate: "average",
    Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
  },
  sum: {
    aggregate: "sum",
    Aggregated: ({ value }) => `${value}`,
  },
};

export default function getColumns(object, aggregateFn = {}) {
  console.log(object);
  let columns = [];
  let fn = "count";
  Object.keys(object).forEach(function (key) {
    if (key in aggregateFn) {
      fn = aggregateFn[key];
    }
    columns.push({
      Header: key,
      accessor: key,
      ...aggregateFnDict[fn],
    });
  });
  return columns;
}
