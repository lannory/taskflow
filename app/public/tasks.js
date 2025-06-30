const tasks = [
    {
        id: 1,
        projectId: 1,
        tick: true,
        title: 'Tech requirements',
        taskCreated: '2024-01-04',
        duoDate: '2025-06-16',
        status: 'Approved',
        description: 'This redesign proposal aims to enhance the user experience, reflect Infoware Technologies commitment to digital innovation'
    },
    {
        id: 2,
        projectId: 2,
        tick: false,
        title: 'UI Design Draft',
        taskCreated: '2024-01-12',
        duoDate: '2025-06-17',
        status: 'Re work',
        description: 'Initial draft of the UI mockups for the dashboard and user profile pages.'
    },
    {
        id: 3,
        projectId: 2,
        tick: false,
        title: 'Backend Integration',
        taskCreated: '2024-01-07',
        duoDate: '2025-06-18',
        status: 'Pending',
        description: 'Connect frontend with the REST API endpoints and test CRUD operations.'
    },
    {
        id: 4,
        projectId: 1,
        tick: false,
        title: 'Team Feedback Review',
        taskCreated: '2024-01-09',
        duoDate: '2025-06-18',
        status: 'Approved',
        description: 'Gather and address feedback from team members on the current implementation.'
    },
    {
        id: 5,
        projectId: 4,
        tick: true,
        title: 'Deployment Setup',
        taskCreated: '2024-01-12',
        duoDate: '2025-06-19',
        status: 'Re work',
        description: 'Configure CI/CD pipelines and prepare production server for deployment.'
    },
    {
        id: 6,
        projectId: 5,
        tick: false,
        title: 'UI Design Draft',
        taskCreated: '2024-01-12',
        duoDate: '2025-06-17',
        status: 'In progress',
        description: 'Initial draft of the UI mockups for the dashboard and user profile pages.'
    },
];

export default tasks;