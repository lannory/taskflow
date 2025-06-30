import React from "react";
import ProjectForm from "../../Components/ProjectForm/ProjectForm";

const users = [
    { id: '1', name: 'Alice', avatar: 'avatars/anna.jpg', role: 'manager' },
    { id: '2', name: 'John', avatar: 'avatars/john.jpg', role: 'manager' },
    { id: '3', name: 'Mark', avatar: 'avatars/kira.jpg', role: 'developer' },
];

export default function CreateProject() {
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
