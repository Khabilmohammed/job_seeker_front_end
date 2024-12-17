import React from 'react';
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Pagination, Badge, Avatar } from '@windmill/react-ui';

interface TableComponentProps {
  headers: string[];
  data: any[];
  resultsPerPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  renderRow: (item: any) => JSX.Element;
}

const TableComponent: React.FC<TableComponentProps> = ({ headers, data, resultsPerPage, totalResults, onPageChange, renderRow }) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => renderRow(item))}
        </TableBody>
      </Table>
      <TableFooter>
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          label="Table navigation"
          onChange={onPageChange}
        />
      </TableFooter>
    </TableContainer>
  );
};

export default TableComponent;
