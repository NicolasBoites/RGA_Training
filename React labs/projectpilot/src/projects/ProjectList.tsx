import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {

    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    }

    const cancelEditing = () => {
        setProjectBeingEdited({});
    }   

    return (

        <div className="grid grid-cols-4 gap-4">
            {
                projects.map((project) => (
                    <div className="" key={project._id}>

                        {
                            projectBeingEdited === project ?
                                <ProjectForm project={project} onCancel={cancelEditing} />
                                : <ProjectCard project={project} onEdit={handleEdit} />
                        }
                        </div>
                ))
            }

        </div>
    );
}

export default ProjectList;