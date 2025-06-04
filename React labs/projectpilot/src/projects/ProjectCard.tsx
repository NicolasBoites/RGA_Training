import { Project } from './Project';
import { Link } from 'react-router';

interface ProjectProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function formatDescription(description: string): string {
    return description.substring(0, 60) + "...";

}

function ProjectCard(props: ProjectProps) {
    const { project, onEdit } = props;

    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited)
    };

    return (
        <div className="rounded-xl bg-slate-200 p-2">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={'/projects/' + project._id}>
                    <h5 className="strong !decoration-0">
                        <strong>{project.name}</strong>
                    </h5>
                    <p className='!decoration-0'>{formatDescription(project.description)}</p>
                    <p className='!decoration-0'>Budget: ${project.budget.toLocaleString()}</p>
                </Link>

                <button className="!bg-gray-400 !text-slate-200 !px-4 !py-2 !rounded-lg  !hover:bg-gray-400 !transition-all !duration-200" onClick={() => { handleEditClick(project) }}>
                    {/* <span className="icon-edit !text-slate-900"></span> */}
                    Edit
                </button>
            </section>
        </div>
    )
}


export default ProjectCard