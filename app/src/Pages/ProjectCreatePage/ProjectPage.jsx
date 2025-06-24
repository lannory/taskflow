import React from "react";
import ProjectForm from "../../Components/ProjectForm/ProjectForm";

const users = [
    { id: '1', name: 'Alice', role: 'manager' },
    { id: '2', name: 'John', role: 'manager' },
    { id: '3', name: 'Mark', role: 'developer' },
];

export default function ProjectPage() {
    const handleCreate = (data) => {
        console.log('Project created:', data);
    };

    return (
        <div>
            <ProjectForm
                users={users}
                onSubmit={handleCreate}
                isEdit={false}
            />
        </div>
    );
};
