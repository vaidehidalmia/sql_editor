const aggregateFnDict = {
  "Count": {
    aggregate: "count",
    Aggregated: ({ value, key }) => `${value}`,
  },
  "Unique Count": {
    aggregate: "uniqueCount",
    Aggregated: ({ value, key }) => `${value}`,
  },
  "Avg": {
    aggregate: "average",
    Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
  },
  "Sum": {
    aggregate: "sum",
    Aggregated: ({ value }) => `${value}`,
  },
};

const transformAggregateData = (aggregateBy) => {
  let aggregateFn = {}
  aggregateBy.forEach(function (item, index) {
    const splitArray = item.split(' ');
    aggregateFn[splitArray[2]] = splitArray[0];
  });
  return aggregateFn;
}

export const transformFilteredData = (filterBy) => {
  let filters = [];
  filterBy.forEach(function (item) {
    const splitArray = item.split(" ");
    const id = splitArray[0];
    const op = splitArray[1];
    const value = splitArray.slice(2).join(" ");
    let filterValue;
    switch(op) {
      case "=":
        filterValue=[value, value];
        break;
      case ">=":
        filterValue=[Number(value), null];
        break;
      case "<=":
        filterValue=[null, Number(value)];
        break;
      case ">":
        filterValue=[Number(value), null];
        break;
      case "<":
        filterValue=[null, Number(value)];
        break;
      default:
        filterValue=[null,null];
    }
    filters.push({
      id: id,
      value: filterValue,
    })
  })
  return filters;
}

export function getColumns(object, aggregateBy) {
  let columns = [];

  let aggregateFn = transformAggregateData(aggregateBy);
  Object.keys(object).forEach(function (key) {
    let fn = "Count";
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
