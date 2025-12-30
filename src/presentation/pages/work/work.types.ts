export interface WorkProject {
  id: number;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  description: string;
  tags: string[];
}

export interface WorkPageProps {
  projects: WorkProject[];
}
