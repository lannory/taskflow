import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addTask } from '../../store/Tasks/TasksSlice';
import TaskForm from "../../Components/CreateTask/TaskForm";
import { fetchUsers } from '../../store/Users/usersSlice';

export default function CreateTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);

    const handleCreate = (data) => {
        dispatch(addTask(data));
        navigate('/alltasks');
    };

    const initialValues = {
        title: '',
        description: '',
        duoDate: '',
        userId: '',
        projectId: '',
    };

    return (
        <div>
            <TaskForm
                initialValues = {initialValues}
                users={users}
                onSubmit={handleCreate}
                isEdit={false}
            />
        </div>
    );
};