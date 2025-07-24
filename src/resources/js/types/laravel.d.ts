declare namespace App {
    export type ProjectStatus = 'in_progress' | 'completed' | 'cancelled';
    export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
}
declare namespace App.Data {
    export type BoardItem = {
        id: number;
        title: string;
        description: string;
        due_date: string;
        status: any;
    };
    export type CalendarEvent = {
        id: string;
        title: string;
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
        status: App.Data.ProjectStatusData;
        created_at: string;
        updated_at: string;
    };
    export type ProjectStatusData = {
        label: string;
        value: App.ProjectStatus;
    };
    export type Tag = {
        label: string;
        value: string;
    };
    export type Task = {
        title: string;
        description: string;
        created_at: string;
        updated_at: string;
        due_date: string;
        status: App.Data.TaskStatusData;
        tags: Array<App.Data.Tag>;
    };
    export type TaskStatusData = {
        label: string;
        value: App.TaskStatus;
    };
}
