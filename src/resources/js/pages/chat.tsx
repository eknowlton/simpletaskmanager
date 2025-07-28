import { ContentBody } from '@/components/content-body';
import { ContentContainer } from '@/components/content-container';
import { ContentHeader } from '@/components/content-header';
import { Button } from '@/components/ui/button';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, ChartNoAxesColumnIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
    action?: {
        type: 'link';
        text: string;
        url: string;
    };
    isLoading?: boolean;
}

function CreateProjectSheet({ open, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
    return (
        <Sheet open={open} onOpenChange={() => !open && onOpenChange?.(false)}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <div className="mt-10 px-5">
                    <div className="my-40 w-full">
                        <svg
                            aria-hidden="true"
                            className="m-auto h-32 w-32 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                    <div className="text-center text-lg">Creating your project...</div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

interface ChatAgentTask {
    id: string;
    title: string;
    description: string;
    status: { label: string; value: string };
    priority: string;
    due_date?: string;
    tags?: { label: string; value: string }[];
}

interface ChatAgentProject {
    title: string;
    description: string;
    icon?: string;
    color?: string;
    tasks: ChatAgentTask[];
}

export default function Chat({ sessionId, message }: { sessionId: string; message: Message }) {
    const [create, setCreate] = useState(false);
    const [messages, setMessages] = useState<Message[]>([message]);
    const [project, setProject] = useState<ChatAgentProject>();
    const [finished, setFinished] = useState(false);

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
            .put(route('chat.message'), { message, sessionId, messageId: newAssistantMessageId })
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

    const handleCreate = () => {
        setCreate(true);

        axios
            .post(route('chat.store'), {
                project: {
                    title: project?.title,
                    description: project?.description,
                    icon: project?.icon,
                    color: project?.color,
                },
                tasks: project?.tasks || [],
            })
            .then(() => {
                setCreate(false);
                toast.success('Project created successfully!');
            })
            .catch((error) => {
                setCreate(false);
                console.error('Error creating project:', error);
                toast.error('Failed to create project. Please try again.');
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
                                            {message.action && message.action.type == 'link' && (
                                                <Link href={message.action.url}>{message.action.text}</Link>
                                            )}
                                        </ChatBubbleMessage>
                                    </ChatBubble>
                                );
                            })}
                        </ChatMessageList>
                        <Textarea
                            disabled={finished}
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
                        <ContentHeader title={project.title} />
                        <ContentBody className="flex max-h-[calc(100vh-170px)] flex-grow flex-col gap-4">
                            <div className="px-2 text-gray-500 dark:text-gray-400">{project.description}</div>
                            <div className="flex-grow overflow-y-auto">
                                {project &&
                                    project.tasks &&
                                    project.tasks.map((task: ChatAgentTask) => (
                                        <div
                                            key={task.id}
                                            className="mb-2 flex flex-col justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-white/3"
                                        >
                                            <div className="flex flex-grow">
                                                <div className="flex-grow text-lg">{task.title}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <ChartNoAxesColumnIcon className="h-4 w-4" /> {task.status.label}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <Sparkles className="h-4 w-4" /> {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-grow">
                                                <div className="flex-grow text-gray-700 dark:text-gray-400">{task.description}</div>
                                                {task.due_date && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
                                                        <Calendar className="h-4 w-4" />
                                                        <span className="">{new Date(task.due_date).toLocaleString()}</span>
                                                    </div>
                                                )}
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
                            <Button onClick={() => handleCreate(true)}>Create Project</Button>
                            <CreateProjectSheet open={create} onOpenChange={(open) => !open && setCreate(false)} />
                        </ContentBody>
                    </ContentContainer>
                )}
            </div>
        </AppLayout>
    );
}
