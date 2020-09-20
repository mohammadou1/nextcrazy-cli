export interface SSGExampleObject {
  [key: string]: string;
}

export interface GeneratedPageProps {
  pageName: string;
  isDynamicRoute?: boolean;
  dynamicParams?: SSGExampleObject[];
}

export interface GeneratedComponentProps {
  name: string;
}
