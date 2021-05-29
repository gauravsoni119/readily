import { Connection } from "mongoose";
import { ShelfSchema } from "./schemas/shelf.schema";

export const shelvesProviders = [
    {
        provide: 'SHELF_MODEL',
        useFactory: (connection: Connection) => connection.model('Shelf', ShelfSchema),
        inject: ['DATABASE_CONNECTION']
    }
];
