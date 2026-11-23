import servicesJson from './services.json';

export interface Service {
    pair: boolean;
    title: string;
    besoin: string;
    imageUrl: string;
    features: string[];
}

export const SERVICES: Service[] = servicesJson;
