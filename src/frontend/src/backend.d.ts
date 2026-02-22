import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface User {
    name: string;
    email: string;
    phone: string;
    location: string;
    vaccinationCentre: string;
}
export interface Event {
    id: bigint;
    title: string;
    date: Time;
    description: string;
    registrationLink: string;
    location: string;
}
export interface ChatMessage {
    sender: Principal;
    message: string;
    timestamp: Time;
}
export interface StrayDogImage {
    description: string;
    timestamp: Time;
    image: ExternalBlob;
    location: string;
    uploadedBy: string;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    image: ExternalBlob;
    price: bigint;
}
export interface backendInterface {
    addEvent(title: string, date: Time, location: string, description: string, registrationLink: string): Promise<void>;
    addProduct(name: string, description: string, price: bigint, image: ExternalBlob): Promise<void>;
    getAllEvents(): Promise<Array<Event>>;
    getAllMessages(): Promise<Array<ChatMessage>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllStrayDogImages(): Promise<Array<StrayDogImage>>;
    getUser(principal: Principal): Promise<User>;
    registerUser(name: string, email: string, phone: string, location: string, vaccinationCentre: string): Promise<void>;
    sendMessage(message: string): Promise<void>;
    uploadStrayDogImage(image: ExternalBlob, location: string, description: string, uploadedBy: string): Promise<void>;
}
