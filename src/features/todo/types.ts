export interface Task {
  id: number | null;
  title: string;
  description?: string;
  completed: boolean;
  index: number;
}

export interface TaskInputFormProps {
  onSubmit: (event: any) => void;
  task: Task;
  setTask: (task: Task) => void;
}

export interface TaskListProps {
  tasks: Task[];
  handleCompleteTask: (index: number) => void;
  handleDeleteTask: (index: number) => void;
  handleEditTask: (index: number) => void;
  showSkeleton: boolean;
}

export interface TaskListItemProps {
  task: Task;
  i: number;
  handleCompleteTask: (index: number) => void;
  handleDeleteTask: (index: number) => void;
  handleEditTask: (index: number) => void;
}

interface ToastNotificationProps {
    message: string;
    type: "info" | "success" | "warning" | "error";
  }
