'use client'

import { client } from '@/lib/sanity';
import { p } from 'framer-motion/client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { set } from 'sanity';



export type ProjectStatus = 'pending' | 'active' | 'paused' | 'completed';

export interface Project {
  id: string;
  location: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string;
  houseUnitsinProject?: [string]; // Array of HouseUnit IDs associated with this project
}



  


export interface ProjectsContextValue {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, update: Partial<Project>) => void;
  removeProject: (projectId: string) => void;
  projectHouseData:any
}

const defaultProjects: Project[] = [
  {
    id: 'project-1',
    location: 'Lagos, Nigeria',
    name: 'Initial Concept House',
    description: 'Build a sample project structure for workspace onboarding.',
    status: 'active',
    startDate: new Date().toISOString(),

  },
];

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {

  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(defaultProjects[0] ?? null);
  //need to change this to a more specific type once we know the structure of the data coming from sanity

  //Hold Sanity data for houses in the project, to be used in the HouseUnitContext
  const [projectHouseData, setprojectHouseData] = React.useState<any[]>([]);

  // interface IprojectData {
  //   HouseData:any,
  // }

  const addProject = (project: Project) => {
    setProjects((state) => [...state, project]);
    setSelectedProject(project);
  };




  
  // Fetch projects from Sanity and update state i.e HOUSEDATA

    const getStaticHouseData = async () => {
const data = await client.fetch(`*[_type == "house"]`)

  setprojectHouseData(data)

console.log('Fetched posts in HouseUnitProvider: Sanity Data', data)
}

React.useEffect(() => {

  if(projectHouseData.length == 0){
    getStaticHouseData()
  }else {
    console.log('HouseUnitProvider: Using existing projectHouseData', projectHouseData)
  }
}, [projectHouseData]);

  // Fetch projects from Sanity and update state i.e HOUSEDATA



// getStaticHouseData()

  const updateProject = (projectId: string, update: Partial<Project>) => {
    setProjects((state) =>
      state.map((project) => (project.id === projectId ? { ...project, ...update } : project)),
    );

    if (selectedProject?.id === projectId) {
      setSelectedProject((prev) => (prev ? { ...prev, ...update } : prev));
    }
  };

  const removeProject = (projectId: string) => {
    setProjects((state) => state.filter((item) => item.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, selectedProject, setSelectedProject, addProject, updateProject, removeProject, projectHouseData }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextValue {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return ctx;
}
