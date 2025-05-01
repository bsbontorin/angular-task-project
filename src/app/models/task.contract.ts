export default interface Task {
  id: string;
  date: Date;
  name: string;
  effort: number;
  status: 'todo' | 'in-progress' | 'done';
  description: string;
  responsible: string;
}
