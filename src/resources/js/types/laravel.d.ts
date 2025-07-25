declare namespace App {
    export type ProjectStatus = 'in_progress' | 'completed' | 'cancelled';
    export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
}
declare namespace App.Data {
    export type BoardColumn = {
        id: string;
        title: string;
        color: string;
        items: Array<App.Data.BoardItem>;
    };
    export type BoardItem = {
        id: number;
        data: App.Data.Task;
    };
    export type CalendarEvent = {
        id: string;
        title: string;
        color: string;
        start: string;
        end: string;
        data: App.Data.Task;
    };
    export type Project = {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        color: string | null;
        icon: string | null;
        status: App.Data.ProjectStatus;
        created_at: string;
        updated_at: string;
    };
    export type ProjectStatus = {
        label: string;
        value: App.ProjectStatus;
    };
    export type Tag = {
        label: string;
        value: string;
    };
    export type Task = {
        id: number;
        title: string;
        description: string;
        due_date: string | null;
        status: App.Data.TaskStatus;
        priority: number;
        project_id: number | null;
        tags: Array<App.Data.Tag> | null;
        created_at: string;
        updated_at: string;
    };
    export type TaskStatus = {
        label: string;
        value: App.TaskStatus;
    };
}
