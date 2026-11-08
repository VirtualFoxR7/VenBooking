export interface VehicleData {
    id: number;
    inn_id: number;
    type: string;
    brand: string;
    description: string;
    price: number;
    capacity: number;
    year: number;
    model: string;
    registration_plate: string;
    image_url: string;
    created_at: string; // o Date según cómo manejes las marcas de tiempo
    updated_at: string; // o Date
    status: number;
    block: number;
    image_url2?: string;
    image_url3?: string;
    image_url4?: string;
    image_url5?: string;
}