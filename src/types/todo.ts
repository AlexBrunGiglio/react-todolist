export type Todo = {
    title: string;
    description?: string;
    emoji: string;
    checks: TodoCheckbox[];
};

export type TodoCheckbox = {
    order: number;
    checked: boolean;
    label: string;
    description?: string;
    tags?: string[];
    startDate?: Date;
    endDate?: Date;
};