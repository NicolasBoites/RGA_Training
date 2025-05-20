import React from 'react'
import { SyntheticEvent, useState } from 'react';
import { Project } from './Project';

interface ProjectFormProps {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;

}

function ProjectForm(props: ProjectFormProps) {
    const { onCancel, onSave, project: initialProject } = props;

    const [project, setProject] = useState(initialProject);
    // const [name, setName] = useState(initialProject.name || '');
    // const [description, setDescription] = useState(initialProject.description || '');
    // const [budget, setBudget] = useState(initialProject.budget || 0);
    // const [isActive, setIsActive] = useState(initialProject.isActive || 0);

    const handlerCancelClick = () => {
        onCancel()
    }

    const handlerSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onSave(new Project(project))
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
    };

    return (
        <div><form className="input-group vertical" onSubmit={handlerSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name"
                value={project.name}
                onChange={handleChange} />
            <label htmlFor="description">Project Description</label>

            <textarea name="description" placeholder="enter description"
                value={project.description}
                onChange={handleChange} ></textarea>
            <label htmlFor="budget">Project Budget</label>

            <input type="number" name="budget" placeholder="enter budget"
                value={project.budget}
                onChange={handleChange} />
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive"
                checked={project.isActive}
                onChange={handleChange} />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={handlerCancelClick}>cancel</button>
            </div>
        </form></div>
    )
}

export default ProjectForm