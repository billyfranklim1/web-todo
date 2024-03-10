export interface Task {
  id: number | null;
  title: string;
  description?: string;
  completed: boolean;
  index: number;
}

export interface TaskInputFormProps {
  onSubmit: (task: Task) => void;
  selectedTask: Task | null;
  isEditing: boolean;
  closeEdit: () => void;
}

export interface TaskListProps {
  handleCompleteTask: (task: Task) => void;
  handleIncompleteTask: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
  handleEditTask: (task: Task) => void;
}

export interface TaskListItemProps {
  task: Task;
  i: number;
  handleCompleteTask: (task: Task) => void;
  handleIncompleteTask: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
  handleEditTask: (task: Task) => void;
}

interface ToastNotificationProps {
  message: string;
  type: "info" | "success" | "warning" | "error";
}
