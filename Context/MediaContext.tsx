import React, { createContext, useContext, useState, ReactNode } from 'react'

const man  = ['2', '3', '4', '5', '6', '7', '8', '9', '10']
import { defaultHouses } from './HouseUnitContext'

const Projects = ['']

const BuildingTypes = defaultHouses.map((house) => house.HouseName)

interface File {
    type: 'revit' | 'cad' | 'sketchup' | '3dsmax' | 'other'
    name: string
    size: number
    url: string
    metadata?: Record<string, unknown>
    version?: string
    createdAt?: string
    updatedAt?: string
}

export interface ProjectMedia {
  id: string
  title: typeof BuildingTypes[number]
  description?: string
  metadata?: Record<string, unknown>
  createdAt?: string
  tags: string[]
  buildingtype: typeof BuildingTypes[number][]
  media:ContentMedia[]
  RawFiles?: File[]
}




const tags = ['3D Model', 'Floor Plan', 'Promotional', 'Aerial', 'Personality', 'Investment', 'Tour']
const tagsProject = ['3D Model']

export interface ContentMedia {
  id: string
  src: string
  alt?: string
  caption?: string
  mimeType?: string
  width?: number
  height?: number
  tags: string[]
  size?: number
    type: 'image' | 'video' | 'audio' | 'file'
}


export type MediaContextValue = {
  projectMedia: ProjectMedia[]
  contentMedia: ContentMedia[]
  setProjectMedia: React.Dispatch<React.SetStateAction<ProjectMedia[]>>
  setContentMedia: React.Dispatch<React.SetStateAction<ContentMedia[]>>
}

const defaultValue: MediaContextValue = {
  projectMedia: [],
  contentMedia: [],
  // noop setters for default
  setProjectMedia: () => {},
  setContentMedia: () => {},
}

export const MediaContext = createContext<MediaContextValue>(defaultValue)

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [projectMedia, setProjectMedia] = useState<ProjectMedia[]>([])
  const [contentMedia, setContentMedia] = useState<ContentMedia[]>([])

  return (
    <MediaContext.Provider
      value={{ projectMedia, contentMedia, setProjectMedia, setContentMedia }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export const useMediaContext = () => useContext(MediaContext)

export default MediaProvider
