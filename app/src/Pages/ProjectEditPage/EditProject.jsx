import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../../Components/ProjectForm/ProjectForm";
import { updateProject } from "../../store/projects/projectsSlice";
import { fetchUsers } from "../../store/Users/usersSlice";
import { fetchProjects } from "../../store/projects/projectsSlice";

export default function EditProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProjects = useSelector((state) => state.projects.projectsList);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
      dispatch(fetchProjects());
      dispatch(fetchUsers());
  }, [dispatch, allProjects.length, users.length]);

  const project = allProjects.find((p) => p.id === +id);

  const handleEdit = (data) => {
    dispatch(updateProject(data));
    navigate(`/allprojects/${data.id}`);
  };
  console.log(allProjects)

  if (!allProjects.length || !project) return <p>Loading...</p>;

  return (
    <ProjectForm
      initialValues={project}
      onSubmit={handleEdit}
      users={users}
      isEdit={true}
    />
  );
}
