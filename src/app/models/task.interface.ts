export default interface Task {
  id: string | null;
  date: string;
  name: string;
  effort: number;
  status: 'todo' | 'in-progress' | 'done';
  description: string;
  responsible: string;
}
