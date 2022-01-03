import { useMemo } from 'react';
import { Table } from 'react-bootstrap';

import { displayDatetime } from '../utils/datetimeFormat';

/**
 * Metric Recordset Table
 *
 * @param {array} recoardset - [{ value: number, timestamp: string }]
 */
function RecordsetTable({ recordset, ...rest }) {
  const tableData = useMemo(() => {
    if (!recordset?.length) {
      return (
        <tr>
          <td colSpan={2}>No data</td>
        </tr>
      );
    }
    return recordset?.map(({ value, timestamp }, index) => (
      <tr key={index}>
        <td>{value}</td>
        <td>{displayDatetime(timestamp)}</td>
      </tr>
    ));
  }, [recordset]);

  return (
    <Table {...rest}>
      <thead>
        <tr>
          <td>Value</td>
          <td>Timestamp</td>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </Table>
  );
}

export { RecordsetTable };
