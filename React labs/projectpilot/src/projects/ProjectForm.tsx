import { useState } from 'react'
import type { SyntheticEvent } from 'react';
import { Project } from './Project';
import { useCreateSaveProject, useDeleteProject } from './projectHooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

interface ProjectFormProps {
    onCancel: () => void;
    project: Project;
}

function ProjectForm(props: ProjectFormProps) {
    const { onCancel, project: initialProject } = props;

    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({ name: '', description: '', budget: '' });
    const { mutate: saveCreateProject, isPending } = useCreateSaveProject(initialProject.isNew);
    const { mutate: deleteProject } = useDeleteProject();

    const handlerCancelClick = () => {
        onCancel()
    }

    const handlerDeleteClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject(project);
            }
        });
    }

    const handlerSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        const cleanedProject = new Project({
            ...project,
            name: project.name.trim(),
            description: project.description.trim(),
        })

        const validationErrors = validate(cleanedProject);
        setErrors(validationErrors);

        if (!isValid()) return;

        saveCreateProject(cleanedProject, {
            onSuccess: () => {
                toast.success('Project saved successfully!');
            },
            onError: (error: Error) => {
                toast.error(error.message || 'There was an error saving the project.');
            },
        });

        setProject(new Project({ name: '', description: '', budget: '' }))
    };

    function validate(project: Project) {

        let errors: any = { name: '', description: '', budget: '' };

        const trimmedName = project.name.trim();

        if (trimmedName.length === 0) {
            errors.name = 'Name is required and cannot be only blank spaces.';
        } else if (trimmedName.length < 3) {
            errors.name = 'Name must be at least 3 characters.';
        } else if (trimmedName.length > 100) {
            errors.name = 'Max name length is 100 characters.';
        }


        const trimmedDesc = project.description.trim();
        if (trimmedDesc.length === 0) {
            errors.description = 'Description is required.';
        } else if (trimmedDesc.length > 2000) {
            errors.description = 'Max description length is 2000 characters.';
        }

        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }

        return errors;
    }

    function isValid() {

        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updatedValue string to a number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited + like project.id
        // the spread operator (...) is used to
        // spread the previous project properties and the new change
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
    };

    return (
        <div className='w-full flex justify-center'>

            <form className="!rounded-xl !w-96" onSubmit={handlerSubmit} action="">
                {isPending && <span className="toast">Saving...</span>}

                <div className="w-full px-2">

                    <label htmlFor="name">Project Name</label>
                    {errors.name.length > 0 && (
                        <div className="card error">
                            <p>{errors.name}</p>
                        </div>
                    )}
                    <input className="w-full box-border" type="text" name="name" placeholder="enter name"
                        value={project.name}
                        onChange={handleChange} />
                </div>
                <div className="w-full px-2">

                    <label htmlFor="description">Project Description</label>
                    {errors.description.length > 0 && (
                        <div className="card error">
                            <p>{errors.description}</p>
                        </div>
                    )}
                    <textarea className="w-full box-border" name="description" placeholder="enter description"
                        value={project.description}
                        onChange={handleChange} ></textarea>

                </div>
                <div className="w-full px-2">

                    <label htmlFor="budget">Project Budget</label>
                    {errors.budget.length > 0 && (
                        <div className="card error">
                            <p>{errors.budget}</p>
                        </div>
                    )}
                    <input className="w-full box-border" type="number" name="budget" placeholder="enter budget"
                        value={project.budget}
                        onChange={handleChange} />
                </div>
                <div className="w-full px-2">

                    <label htmlFor="isActive">Active?</label>
                    <input className="w-full box-border" type="checkbox" name="isActive"
                        checked={project.isActive}
                        onChange={handleChange} />
                </div>
                <div className="w-full flex flex-row">
                    <button className="!px-4 !py-2 !bg-blue-600 !text-white !rounded-xl !hover:bg-blue-700 !focus:outline-none !focus:ring-2 !focus:ring-blue-400 !transition-all ">{project.isNew ? "Create" : "Save"}</button>
                    <span></span>
                    {
                        project.isNew ? '' :
                            <>

                                <button type="button" className="!px-4 !py-2 !bg-red-600 !text-white !rounded-xl !hover:bg-red-700 !focus:outline-none !focus:ring-2 !focus:ring-red-400 !transition-all " onClick={handlerDeleteClick}>Delete</button>
                                <button type="button" className="!px-4 !py-2 !bg-gray-400 !text-white !rounded-xl !hover:bg-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-gray-400 !transition-all " onClick={handlerCancelClick}>Cancel</button>
                            </>
                    }
                </div>
            </form>
        </div>
    )
}

export default ProjectForm