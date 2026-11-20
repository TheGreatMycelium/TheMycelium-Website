import servicesJson from './services.json';

export interface Service {
    title: string;
    description: string;
    features: string[];
}

export const SERVICES: Service[] = servicesJson;
