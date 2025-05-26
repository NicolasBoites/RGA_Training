import { useEffect, useState } from 'react';
import ProjectForm from './ProjectForm';
import { Project } from './Project';

function NewProjectPage() {

  return (
    <div>
        <h1>New Project</h1>
        <ProjectForm project={new Project} onCancel={() => {}} isNew={true} />
    </div>
  );
}

export default NewProjectPage;