export type User = {
  id: number
  name: string
  email: string
}

import { UnitItemProps } from "@/app/home/page"

export const userMockData: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
  { id: 5, name: "Maria Garcia", email: "maria.garcia@example.com" },
  { id: 6, name: "Chen Wei", email: "chen.wei@example.com" },
]


export const UnitItemMockArray: UnitItemProps[] = [
    {id: 'J19', description: 'Completed initial design mockups for user dashboard. Awaiting feedback from UX team.', updatedAt: '2023-12-10T10:00:00Z'},
    {id: 'J20', description: 'Completed initial design mockups for user dashboard. Awaiting feedback from UX team.', updatedAt: '2023-12-11T11:00:00Z'},
    {id: 'J24', description: 'Completed initial design mockups for user dashboard. Awaiting feedback from UX team.', updatedAt: '2023-12-12T12:00:00Z'},];




