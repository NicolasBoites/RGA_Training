import { useState } from 'react';
import { projectAPI } from './projectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Project } from './Project';

export function useProjects() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');

  const queryInfo = useQuery({
    queryKey: ['projects', page, name],
    queryFn: () => projectAPI.get(page + 1),
    placeholderData: (previousData) => previousData,
  });
  // console.log(queryInfo);
  return { ...queryInfo, page, setPage, name, setName };
}

export function useSaveProject() {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (project: Project) => projectAPI.put(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => projectAPI.post(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => projectAPI.delete(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useCreateSaveProject(isNew: boolean) {
  return isNew ? useCreateProject() : useSaveProject();
}