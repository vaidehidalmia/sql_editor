// Source: https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/grouping?from-embed

import React, { useMemo } from "react";
import { useTable, useGroupBy, useExpanded, useSortBy } from "react-table";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import {getColumns, transformFilteredData} from "./transformData";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: "96%",
    minWidth: "650px",
    maxHeight: "85vh",
    overflowX: "scroll",
    overflowY: "scroll",
    margin: "20px",
    border: "1px solid grey",
  },
  headerCell: {
    borderBottom: "1px solid grey",
    borderRight: "1px solid rgba(224, 224, 224, 1);",
    fontWeight: "bolder",
    minWidth: "130px",
  },
  groupedByRow: {
    minWidth: "150px",
  },
  cell: {
    borderRight: "1px solid rgba(224, 224, 224, 1);",
  },
  sortArrow: {
    fontSize: "1rem",
    color: "grey",
    marginTop: "2px",
  }
});

// const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
//   const defaultRef = useRef();
//   const resolvedRef = ref || defaultRef;

//   useEffect(() => {
//     resolvedRef.current.indeterminate = indeterminate;
//   }, [resolvedRef, indeterminate]);

//   return <input type="checkbox" ref={resolvedRef} {...rest} />;
// });

function CustomTable({ columns, data, controlledState = {} }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // allColumns,
    // getToggleHideAllColumnsProps,
    state,
  } = useTable(
    {
      columns,
      data,
      useControlledState: state => {
        return useMemo(
          () => ({
            ...state,
            ...controlledState,
          }),
          [state]
        )
      }
    },
    useGroupBy,
    useSortBy,
    useExpanded
  );

  // We don't want to render all of the rows for this example, so cap
  // it at 100 for this use case
  // const firstPageRows = rows.slice(0, 100);
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="a dense table"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className={`${classes.headerCell} ${
                      column.isGrouped ? classes.groupedByRow : null
                    }`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <span>
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <ArrowDownwardIcon className={classes.sortArrow}/>
                            : <ArrowUpwardIcon className={classes.sortArrow}/>
                          : <ImportExportIcon className={classes.sortArrow}/>}
                      </span>
                      {column.render("Header")}
                      {state.groupBy.length > 0 && !column.isGrouped && (
                        <div>({column.aggregate})</div>
                      )}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell className={classes.cell}>
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            {cell.render("Cell")}
                            <div className="flex-grow" /> 
                            <div className="fontsize07 textalign-right">
                              {row.subRows.length}
                              <span {...row.getToggleRowExpandedProps()}>
                                <IconButton aria-label="expand row" size="small">
                                  {row.isExpanded ? (
                                    <KeyboardArrowUpIcon />
                                  ) : (
                                    <KeyboardArrowDownIcon />
                                  )}
                                </IconButton>
                              </span>
                            </div>
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render("Aggregated")
                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          cell.render("Cell")
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {/* <div>Showing the first 100 results of {rows.length} rows</div> */}
      
      {/* useful to debug table */}
      {/* <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre> */}
      
      {/* <div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div> */}
    </>
  );
}

function TableExample(props) {
  const { tableData, tableQuery } = props;
  let aggregateBy = [];
  let controlledState = {
    "groupBy": [...tableQuery.groupBy], 
    "filters": transformFilteredData(tableQuery.filterBy),
    // "hiddenColumns": [...tableQuery.hideColumns],
  };

  // console.log(transformFilteredData(tableQuery.filterBy));

  if (tableQuery.aggregateBy.length > 0) {
    aggregateBy = tableQuery.aggregateBy;
  }

  const columns = useMemo(() => getColumns(tableData[0], aggregateBy), [tableData, aggregateBy]);
  const data = useMemo(() => tableData, [tableData]);

  return (
    <CustomTable columns={columns} data={data} controlledState={controlledState}/>
  );
}

export default TableExample;
