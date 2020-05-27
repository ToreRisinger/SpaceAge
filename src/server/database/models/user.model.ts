import mongoose, {Schema, Document} from 'mongoose'

export interface IUser extends Document {
    username : string;
}

const UserSchema : Schema = new Schema({
    username: { type: String, required: true, unique: true }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;