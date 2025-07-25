declare namespace Shared {
export type ProjectStatus = 'in_progress' | 'completed' | 'cancelled';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
}
declare namespace Shared.Data {
export type BoardColumn = {
id: string;
title: string;
color: string;
items: Array<Shared.Data.BoardItem>;
};
export type BoardItem = {
id: number;
data: Shared.Data.Task;
};
export type CalendarEvent = {
id: string;
title: string;
color: string;
start: string | null;
end: string | null;
data: Shared.Data.Task;
};
export type Project = {
id: string;
title: string;
slug: string;
description: string | null;
color: string | null;
icon: string | null;
status: Shared.Data.ProjectStatus;
created_at: string;
updated_at: string;
tasks_count: number;
completed_tasks_count: number;
};
export type ProjectStatus = {
label: string;
value: Shared.ProjectStatus;
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
status: Shared.Data.TaskStatus;
priority: number;
project_id: number | null;
tags: Array<Shared.Data.Tag> | null;
created_at: string;
updated_at: string;
};
export type TaskStatus = {
label: string;
value: Shared.TaskStatus;
};
}
