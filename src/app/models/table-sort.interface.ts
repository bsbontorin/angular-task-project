import TableColumn from './table-column.interface';

export default interface TableSort {
  column: TableColumn;
  direction: 'asc' | 'desc' | null;
}
