export type Todo = {
    id: string;
    title: string | undefined;
    description?: string | undefined;
    emoji: string | undefined;
    checks: TodoCheckbox[] | undefined;
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