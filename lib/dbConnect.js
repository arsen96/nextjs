import mongoose from 'mongoose';

const connectMongo = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            resolve();
        }).catch((e) => {
            reject(e)
        })
    })
};

export default connectMongo;