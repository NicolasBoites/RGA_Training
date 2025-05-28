import { useState } from 'react'
import type { SyntheticEvent } from 'react';
import { Project } from './Project';
import { useCreateSaveProject, useDeleteProject } from './projectHooks';

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
        deleteProject(project);
    }



    const handlerSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;

        saveCreateProject(project);
    };

    function validate(project: Project) {

        let errors: any = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }


        /* TODO */
        // add validations name <100 description< 2000 budget> 0
        if (project.name.length > 0 && project.name.length > 100) {
            errors.name = 'Max Name length is 100.';
        }
        if (project.description.length > 0 && project.description.length > 2000) {
            errors.description = 'Max Description length is 2000.';
        }
        if (project.budget < 0) {
            errors.budget = 'Budget cannot be negative.';
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
        <div>

            <form className="input-group vertical" onSubmit={handlerSubmit}>
                {isPending && <span className="toast">Saving...</span>}
                <label htmlFor="name">Project Name</label>
                {errors.name.length > 0 && (
                    <div className="card error">
                        <p>{errors.name}</p>
                    </div>
                )}
                <input type="text" name="name" placeholder="enter name"
                    value={project.name}
                    onChange={handleChange} />


                <label htmlFor="description">Project Description</label>
                {errors.description.length > 0 && (
                    <div className="card error">
                        <p>{errors.description}</p>
                    </div>
                )}
                <textarea name="description" placeholder="enter description"
                    value={project.description}
                    onChange={handleChange} ></textarea>


                <label htmlFor="budget">Project Budget</label>
                {errors.budget.length > 0 && (
                    <div className="card error">
                        <p>{errors.budget}</p>
                    </div>
                )}
                <input type="number" name="budget" placeholder="enter budget"
                    value={project.budget}
                    onChange={handleChange} />


                <label htmlFor="isActive">Active?</label>
                <input type="checkbox" name="isActive"
                    checked={project.isActive}
                    onChange={handleChange} />

                <div className="input-group">
                    <button className="primary bordered medium">{project.isNew ? "Create" : "Save"}</button>
                    <span></span>
                    {
                        project.isNew ? '' :
                            <>

                                <button type="button" className="bordered medium" onClick={handlerCancelClick}>Cancel</button>
                                <button type="button" className="bordered medium danger" onClick={handlerDeleteClick}>Delete</button>
                            </>
                    }
                </div>
            </form>
        </div>
    )
}

export default ProjectForm