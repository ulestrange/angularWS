export interface User {
    _id?: string;
    name: string;
    phonenumber: string;
    email: string;
    dob?: Date;
    tags: string[];
    dateJoined?: Date,
    lastUpdated?: Date
}


