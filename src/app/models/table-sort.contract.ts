import TableColumn from './table-column.contract';

export default interface TableSort {
  column: TableColumn;
  direction: 'asc' | 'desc' | null;
}
