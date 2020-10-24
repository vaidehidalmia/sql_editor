export default function get_columns(object) {
  console.log(object);
  let columns = [];
  Object.keys(object).forEach(function (key) {
    columns.push({
      Header: key,
      accessor: key,
      aggregate: "count",
      Aggregated: ({ value }) => `${value} ${key}s`,
    });
  });
  return columns;
}
