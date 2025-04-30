export default interface Task {
  id: number;
  name: string;
  description: string;
  date: Date;
  effort: number;
  status: 'todo' | 'in-progress' | 'done';
  responsible: string;
}
