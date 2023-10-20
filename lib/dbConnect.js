import mongoose from 'mongoose';

const connectMongo = () => {
    return new Promise<any>((resolve,reject) => {
        mongoose.connect(process.env.MONGO_URI).then(() => {
            resolve();
        }).catch((e) => {
            reject(e)
        })
    })
};

export default connectMongo;