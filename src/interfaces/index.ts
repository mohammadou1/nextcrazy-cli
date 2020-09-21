import { Options } from './console.enum';

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

export type Manager = Options.NPM | Options.YARN;
