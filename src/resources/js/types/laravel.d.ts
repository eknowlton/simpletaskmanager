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
id: string;
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
id: string | null;
title: string;
slug: string;
description: string | null;
color: string | null;
icon: string | null;
status: Shared.Data.ProjectStatus;
created_at: string | null;
updated_at: string | null;
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
export type TaskAudit = {
id: number;
user: Shared.Data.User | null;
event: string;
old_values: {[key: string]:any;};
new_values: {[key: string]:any;};
created_at: string;
updated_at: string;
};
export type Task = {
id: string | null;
title: string;
description: string;
due_date: string | null;
status: Shared.Data.TaskStatus;
priority: number;
project_id: string | null;
audits: Array<Shared.Data.TaskAudit> | null;
tags: Array<Shared.Data.Tag> | null;
created_at: string;
updated_at: string;
};
export type TaskStatus = {
label: string;
value: Shared.TaskStatus;
};
export type User = {
id: number;
name: string;
email: string;
created_at: string;
updated_at: string;
};
}
