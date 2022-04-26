import BaseModel from './BaseModel';
export default interface Model extends BaseModel{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    token: {
        type: string,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600,
    },
}








