import mongoose , { Mongoose} from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn : Mongoose | null;
    promise : Promise<Mongoose> | null;
}

let cached : MongooseConnection = (global as any).mongoose

// It initializes a variable cached with the current value of global.mongoose. This is a global cache object. 

// Whenever we call connect or init, if this value exists then we assume that someone else is managing the connection for us and we should not do anything
if(!cached){
    cached = (global as any).mongoose = {
        conn : null , promise : null
    }
}

export const connectToDatabase = async () =>{
    if(cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('Missing MONGO_DB_URL');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName : 'imaginify',
        bufferCommands : false
    })

    cached.conn = await cached.promise;

    return cached.conn;
}