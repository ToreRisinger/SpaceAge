import mongoose, {Schema, Document} from 'mongoose'

export interface IUserDocument extends Document {
    username: string;
    password: string
}

const UserSchema : Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false }
});

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
export default UserModel;