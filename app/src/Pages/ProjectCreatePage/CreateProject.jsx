import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addProject } from '../../store/projects/projectsSlice';
import ProjectForm from "../../Components/ProjectForm/ProjectForm";
import { fetchUsers } from '../../store/Users/usersSlice';

export default function CreateProject() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);

    const handleCreate = (data) => {
        dispatch(addProject(data));
        navigate('/allprojects');
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
