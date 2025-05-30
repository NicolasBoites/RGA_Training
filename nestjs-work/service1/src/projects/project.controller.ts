import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AccessTokenGuard } from 'src/common/gaurds/gaurd.access_token';

@UseGuards(AccessTokenGuard)
@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  async createProject(@Res() response, @Body() createProjectDto: CreateProjectDto) {
    try {
      const newProject = await this.projectService.createProject(createProjectDto)
      return response.status(HttpStatus.CREATED).json({
        message: "Project has been created successfully",
        data: newProject
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        messages: "Error: Project not created",
        error: "Bad request"
      })

    }
  }

  @Put('/:id')
  async updateProject(@Res() response,
    @Param('id') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto) {
    try {
      const existingProject = await this.projectService.updateProject(projectId, updateProjectDto);
      return response.status(HttpStatus.OK).json({
        message: 'Project has been successfully updated',
        data: existingProject,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getProjects(@Res() response, @Query('_page') page: number, @Query('_limit') limit: number, @Query('_sort') sort: string,) {
    try {
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 10;
      const sortBy = sort || 'name';

      const projects = await this.projectService.getAllProjects({page: pageNumber,limit: limitNumber, sort: sortBy});
      return response.status(HttpStatus.OK).json({
        message: "All projects data found successfully",
        data: projects
      })
    } catch (error) {
      return response.status(error.status).json(error.response);

    }
  }

  @Get('/:id')
  async getProject(@Res() response, @Param('id') projectId: string) {
    try {
      const existingProject = await this.projectService.getProject(projectId);
      return response.status(HttpStatus.OK).json({
        message: 'Project found successfully',
        data: existingProject,
      });
    } catch (err) {
      console.log(err);

      return response.status(err.status).json(err.response);
    }
  }

   @Get('/name/:name')
  async getProjectByName(@Res() response, @Param('name') name: string) {
    try {
      const existingProject = await this.projectService.getProjectByName(name);
      return response.status(HttpStatus.OK).json({
        message: 'Project found successfully',
        data: existingProject,
      });
    } catch (err) {
      console.log(err);

      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteProject(@Res() response, @Param('id') projectId: string) {
    try {
      const deletedProject = await this.projectService.deleteProject(projectId);
      return response.status(HttpStatus.OK).json({
        message: 'Project deleted successfully',
        data: deletedProject,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
