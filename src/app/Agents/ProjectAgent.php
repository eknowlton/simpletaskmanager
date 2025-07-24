<?php

namespace App\Agents;

use App\TaskStatus;
use LarAgent\Agent;

class ProjectAgent extends Agent
{
    protected $model = 'gpt-4.1';

    protected $history = 'cache';

    protected $provider = 'default';

    protected $tools = [];

    protected $temperature = 0.7;

    public function instructions()
    {
        $currentDate = now()->format('Y-m-d H:i:s');

        return "Its your job to help the user design a project by providing a title, a description and the project details including the breakdown of its tasks. Be sure to create due dates that reflect the current date of {$currentDate} Never give more than 10 tasks.";
    }

    public function prompt($message)
    {
        return $message;
    }


    public function structuredOutput()
    {
        return [
            'name' => 'project_details',
            'schema' => [
                'type' => 'object',
                'properties' => [
                    'project' => [
                        'type' => 'object',
                        'description' => 'Details of the project including title, description, and tasks involved.',
                        'properties' => [
                            'title' => [
                                'type' => 'string',
                                'description' => 'The title of the project.',
                            ],
                            'description' => [
                                'type' => 'string',
                                'description' => 'A summary of the project and its objectives.',
                            ],
                            'tasks' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'title' => [
                                            'type' => 'string',
                                            'description' => 'The name of the task.',
                                        ],
                                        'description' => [
                                            'type' => 'string',
                                            'description' => 'A brief description of the task.',
                                        ],
                                        'due_date' => [
                                            'type' => 'string',
                                            'format' => 'date-time',
                                            'description' => 'The due date for the task.',
                                        ],
                                        'priority' => [
                                            'type' => 'number',
                                            'description' => 'Numerical priority of the task, where a higher number indicates higher priority.',
                                        ],
                                        'status' => [
                                            'type' => 'string',
                                            'enum' => collect(TaskStatus::cases())->map(fn($status) => $status->value)->toArray(),
                                            'description' => 'The current status of the task.',
                                        ],
                                        'status_label' => [
                                            'type' => 'string',
                                            'enum' => collect(TaskStatus::cases())->map(fn($status) => $status->label())->toArray(),
                                            'description' => 'The display label for the task status, used for user-friendly representation.',
                                        ],
                                        'tags' => [
                                            'type' => 'array',
                                            'items' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'label' => [
                                                        'type' => 'string',
                                                        'description' => 'The display label for the tag, used for categorization.',
                                                    ],
                                                    'value' => [
                                                        'type' => 'string',
                                                        'description' => 'The machine value of the tag, used for filtering or searching.',
                                                    ],

                                                ],
                                                'required' => [
                                                    'label',
                                                    'value'
                                                ],
                                                'additionalProperties' => false,
                                            ],
                                            'description' => 'Tags associated with the task for categorization of priority and urgency.',
                                        ],
                                    ],
                                    'required' => ['title', 'description', 'due_date', 'priority', 'tags'],
                                    'additionalProperties' => false,
                                ],
                                'description' => 'A list of tasks involved in the project.',
                            ],
                        ],
                        'required' => ['title', 'description', 'tasks'],
                        'additionalProperties' => false,
                    ],
                    'message' => [
                        'type' => 'string',
                        'description' => 'Your response to the users message outside of the project details.'
                    ],
                ],
                'required' => ['project', 'message'],
                'additionalProperties' => false
            ]
        ];
    }
}
