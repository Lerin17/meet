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
  houseUnitsinProject: string[]; 
  axisinProject?: string[];
  // Array of HouseUnit IDs associated with this project
}

export interface MediaUploadData {
  tags: string[];
  ProjectLocation: string;
  projectLocation: string;
  projectName: string;
  ProjectState: string;
  ProjectAxis: string;
}


export interface ProjectsContextValue {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, update: Partial<Project>) => void;
  removeProject: (projectId: string) => void;
  projectHouseData: any;
  mediaUploadData: MediaUploadData;
  setMediaUploadData: React.Dispatch<React.SetStateAction<MediaUploadData>>;
  updateMediaUploadSelection: (item: {
    projectAxis?: string;
    projectName?: string;
    projectLocation?: string;
  }) => void;
  allProjectStates: string[];
  allProjectAxis: string[];
  allProjectLocationsinStates: string[];
  allProjectNames: string[];
  allProjectHouseTypes: string[];
}

const defaultProjects: Project[] = [
  {
    id: 'project-1',
    location: 'Lagos, Nigeria',
    name: 'Initial Concept House',
    description: 'Build a sample project structure for workspace onboarding.',
    houseUnitsinProject: ['houseunit-1', 'houseunit-2'],
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
  const [mediaUploadData, setMediaUploadData] = useState<MediaUploadData>({
    tags: [],
    ProjectLocation: '',
    projectLocation: '',
    projectName: '',
    ProjectState: '',
    ProjectAxis: '',
  });

  const updateMediaUploadSelection = (item: {
    projectAxis?: string;
    projectName?: string;
    projectLocation?: string;
  }) => {
    setMediaUploadData((current) => ({
      ...current,
      ProjectAxis: item.projectAxis ?? current.ProjectAxis,
      projectName: item.projectName ?? current.projectName,
      projectLocation: item.projectLocation ?? current.projectLocation,
    }));
  };

  
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

  const [allProjectStates, setAllProjectStates] = useState<string[]>([
    'Lagos',
    'Abuja',
    'Port Harcourt',
  ]);

  const [allProjectAxis, setallProjectAxis] = React.useState(['Axis 1', 'Axis 2', 'Axis 3', 'Axis 4', 'P-Line', 'QQ-Line', 'T-Line Extension', 'T-Line']);

  const [allProjectLocationsinStates, setAllProjectLocationsinStates] = useState<string[]>([
    'Kabusa',
    'Galadimawa',
  ]);

  const [allProjectNames, setAllProjectNames] = useState<string[]>([
    'City View',
    'Sunny Vale',
    'SVG Kabusa',
    'Rock Vale',
    'Ocean Vale',
    'Wumba',
  ]);

  const [allProjectHouseTypes, setAllProjectHouseTypes] = useState<string[]>([
    '2 Bedroom Bungalow',
    '3 Bedroom Duplex',
    '4 Bedroom Mansion',
    'Studio Apartment',
    '1 Bedroom Flat',
  ]);

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
      value={{
        projects,
        selectedProject,
        setSelectedProject,
        addProject,
        updateProject,
        removeProject,
        projectHouseData,
        mediaUploadData,
        setMediaUploadData,
        updateMediaUploadSelection,
        allProjectStates,
        allProjectAxis,
        allProjectLocationsinStates,
        allProjectNames,
        allProjectHouseTypes,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext(): ProjectsContextValue {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjectsContext must be used within ProjectsProvider');
  }
  return ctx;
}
