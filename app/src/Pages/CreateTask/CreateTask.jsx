import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addTask, saveEditedTask } from '../../store/Tasks/TasksSlice';
import TaskForm from "../../Components/CreateTask/TaskForm";
import { fetchUsers } from '../../store/Users/usersSlice';

export default function CreateTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { users } = useSelector(state => state.users);
    const { editTask } = useSelector(state => state.tasks);

    const emptyValues = {
        title: '',
        description: '',
        duoDate: '',
        userId: '',
        projectId: '',
    };

    const isEdit = !!editTask;
    const initialValues = isEdit
        ? { ...emptyValues, ...editTask }
        : emptyValues;

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSubmit = (data) => {
        if (isEdit) {
            dispatch(saveEditedTask(data));
            navigate('/alltasks');

        } else {
            dispatch(addTask(data));
            navigate('/alltasks');
        }

    };



    return (
        <div>
            <TaskForm
                initialValues={initialValues}
                users={users}
                onSubmit={handleSubmit}
                isEdit={isEdit}
            />
        </div>
    );
};