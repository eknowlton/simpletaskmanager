import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { Button } from '@/components/ui/button';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, ChartNoAxesColumnIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: '/chat',
    },
];

interface Message {
    id: number;
    message: string;
    sender: 'user' | 'assistant';
    isLoading?: boolean;
}

interface Project {
    title: string;
    description: string;
    tasks?: Task[];
}

function CreateProjectSheet({ open }: { open?: boolean }) {
    return (
        <Sheet open={open}>
            <SheetTrigger>
                <Button className="w-full">Create Project</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Creating Project...</SheetTitle>
                </SheetHeader>
                <SheetDescription className="flex flex-col items-center justify-center gap-4">
                    <div>Step 1. Create project...</div>
                    <div>Step 2. Create tasks...</div>
                    <div className="text-xl">Project Created!</div>
                    <Link href={route('projects.show', 123)} className="text-blue-500 hover:underline">
                        View your new project.
                    </Link>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default function Chat({ sessionId, message }: { sessionId: string; message: Message }) {
    const [messages, setMessages] = useState<Message[]>([message]);
    const [project, setProject] = useState<Project>();

    const sendMessage = (message: string) => {
        const newAssistantMessageId = Date.now() + 650 / 1000;
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: Date.now() / 1000,
                message,
                sender: 'user',
                isLoading: false,
            },
            {
                id: newAssistantMessageId,
                message: '',
                sender: 'assistant',
                isLoading: true,
            },
        ]);
        axios
            .post(route('chat.store'), { message, sessionId, messageId: newAssistantMessageId })
            .then((response) => {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === newAssistantMessageId ? { ...msg, message: response.data.message.message, isLoading: false } : msg,
                    ),
                );
                if (response.data.project) {
                    setProject(response.data.project);
                }
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="flex h-full flex-row gap-4 p-4">
                <ContentContainer className="flex h-full w-1/3 flex-col">
                    <ContentHeader title="Chat" />
                    <ContentBody className="flex max-h-[calc(100vh-160px)] flex-grow flex-col">
                        <ChatMessageList className="max-h-[calc(100vh-330px)] flex-grow overflow-y-auto">
                            {messages.map((message) => {
                                const variant = message.sender === 'user' ? 'sent' : 'received';
                                return (
                                    <ChatBubble key={message.id} variant={variant}>
                                        <ChatBubbleAvatar fallback={variant === 'sent' ? 'ME' : 'AI'} />
                                        <ChatBubbleMessage isLoading={message.isLoading} className="text-sm">
                                            {message.message}
                                        </ChatBubbleMessage>
                                    </ChatBubble>
                                );
                            })}
                        </ChatMessageList>
                        <Textarea
                            placeholder="Enter your message and press enter..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    const message = e.currentTarget.value.trim();
                                    if (message) {
                                        sendMessage(message);
                                        e.currentTarget.value = '';
                                    }
                                }
                            }}
                        ></Textarea>
                    </ContentBody>
                </ContentContainer>

                {project && (
                    <ContentContainer className="flex h-full flex-grow flex-col">
                        <ContentHeader color="red" title={`${project.title}`} />
                        <ContentBody className="flex max-h-[calc(100vh-170px)] flex-grow flex-col gap-4">
                            <div className="px-2 text-gray-500 dark:text-gray-400">{project.description}</div>
                            <div className="flex-grow overflow-y-auto">
                                {project &&
                                    project.tasks &&
                                    project.tasks.map((task: Task) => (
                                        <div
                                            key={task.id}
                                            className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                        >
                                            <div className="flex flex-grow">
                                                <div className="flex-grow text-lg">{task.title}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <ChartNoAxesColumnIcon className="h-4 w-4" /> {task.status_label}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <Sparkles className="h-4 w-4" /> {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow">
                                                <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4" />
                                                    <span className="">{new Date(task.due_date).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow pt-2">
                                                <div className="flex-grow"></div>
                                                <div className="text-gray-700 dark:text-gray-400">
                                                    {task.tags &&
                                                        task.tags.length > 0 &&
                                                        task.tags.map(({ label, value }) => (
                                                            <span
                                                                key={value}
                                                                className="ml-2 inline-block rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                                            >
                                                                {label}
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <CreateProjectSheet />
                        </ContentBody>
                    </ContentContainer>
                )}
            </div>
        </AppLayout>
    );
}
