import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { IProject } from './interfaces/project.interface';
import { Model } from 'mongoose';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<IProject>) { }

  async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    console.log("createProjectDto", createProjectDto);

    createProjectDto.name = createProjectDto.name.trim()
    createProjectDto.description = createProjectDto.description.trim()

    if (createProjectDto.name.trim() === "" || !createProjectDto.name.trim()) {
      throw new BadRequestException('Invalid name');
    }

    if (createProjectDto.description.trim() === "" || !createProjectDto.description.trim()) {
      throw new BadRequestException('Invalid description');
    }

    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async updateProject(projectId: string, updateProjectDto: UpdateProjectDto): Promise<IProject> {
    if (projectId.length !== 24) {
      throw new BadRequestException('Invalid ID format');
    }

    if (updateProjectDto.name?.trim() === "" || !updateProjectDto.name?.trim()) {
      throw new BadRequestException('Invalid name');
    }

    if (updateProjectDto.description?.trim() === "" || !updateProjectDto.description?.trim()) {
      throw new BadRequestException('Invalid description');
    }

    const existingProject = await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto, { new: true });
    if (!existingProject) {
      throw new NotFoundException(`Project #${projectId} not found`)
    }
    return existingProject;
  }

  async getAllProjects(params): Promise<IProject[]> {
    const pageNumber = Number(params.page);
    const limitNumber = Number(params.limit);
    const sortBy = params.sort;
    const name = params.name;

    const filter: any = {};

    if (name && name.trim() !== '') {
      filter.name = { $regex: name, $options: 'i' };
    }


    const projects = await this.projectModel.find(filter).limit(limitNumber).skip((pageNumber - 1) * limitNumber).sort(sortBy);
    if (!projects || projects.length == 0) {
      throw new NotFoundException('Projects data not found!');

    }
    return projects;
  }

  async getProject(projectId: string): Promise<IProject> {
    if (projectId.length !== 24) {
      throw new BadRequestException('Invalid ID format');
    }

    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }
    return project;
  }

  async searchProjectByName(name: string): Promise<IProject[]> {
    if (!name || name.trim() === '') {
      return [];
    }

    const projects = await this.projectModel.find({ "name": name });
    if (!projects) {
      throw new NotFoundException(`No projects found with the name: ${name}`);
    }
    return projects;
  }

  async deleteProject(ProjetId: string): Promise<IProject> {
    const deletedProject = await this.projectModel.findByIdAndDelete(ProjetId);
    if (!deletedProject) {
      throw new NotFoundException(`Project #${ProjetId} not found`);
    }
    return deletedProject;
  }

}
