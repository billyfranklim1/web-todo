// TaskList.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import TaskList from "./index";
import * as TodoHook from "../../hooks/useTodo";
import { UseMutationResult } from "@tanstack/react-query"; // Import the correct type for UseMutationResult

import { Task } from "../../types";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
  }),
}));

jest.mock("react-confirm-alert", () => ({
  confirmAlert: jest.fn(),
}));

jest.mock("next/image", () => {
  const MockedImage = () => <img alt="mocked image" />;
  MockedImage.displayName = "MockedImage";
  return MockedImage;
});

describe("TaskList", () => {
  const mockHandleCompleteTask = jest.fn();
  const mockHandleIncompleteTask = jest.fn();
  const mockHandleDeleteTask = jest.fn();
  const mockHandleEditTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays no tasks message when task list is empty", () => {
    jest.spyOn(TodoHook, "useTodo").mockImplementation(() => ({
      tasks: [] as Task[] | undefined,
      isLoading: false,
      isError: false,
      createTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      updateTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      deleteTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      completeTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      incompleteTaskMutation: {} as UseMutationResult<
        any,
        Error,
        Task,
        unknown
      >,
      totals: () => ({ totalTasks: 0, completedTasks: 0, incompleteTasks: 0 }),
    }));

    const { getByText } = render(
      <TaskList
        handleCompleteTask={mockHandleCompleteTask}
        handleIncompleteTask={mockHandleIncompleteTask}
        handleDeleteTask={mockHandleDeleteTask}
        handleEditTask={mockHandleEditTask}
      />
    );
    expect(getByText("no_tasks_to_show")).toBeInTheDocument();
  });

  it("renders tasks correctly when present", () => {
    jest.spyOn(TodoHook, "useTodo").mockImplementation(() => ({
      tasks: [
        {
          id: "1",
          title: "Test Task",
          description: "Test Description",
          completed: false,
          index: 0,
        },
      ] as unknown as Task[],
      isLoading: false,
      isError: false,
      createTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      updateTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      deleteTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      completeTaskMutation: {} as UseMutationResult<any, Error, Task, unknown>,
      incompleteTaskMutation: {} as UseMutationResult<
        any,
        Error,
        Task,
        unknown
      >,
      totals: (): {
        totalTasks: number;
        completedTasks: number;
        incompleteTasks: number;
      } => ({ totalTasks: 1, completedTasks: 0, incompleteTasks: 0 }),
    }));

    const { getByText } = render(
      <TaskList
        handleCompleteTask={mockHandleCompleteTask}
        handleIncompleteTask={mockHandleIncompleteTask}
        handleDeleteTask={mockHandleDeleteTask}
        handleEditTask={mockHandleEditTask}
      />
    );
    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
  });
});
