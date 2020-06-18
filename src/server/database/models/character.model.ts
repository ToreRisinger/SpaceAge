import mongoose, {Schema, Document, Types} from 'mongoose'
import { ICharacter } from '../../../shared/data/gameobject/ICharacter';

export interface ICharacterDocument extends Document {
    character : ICharacter;
    user: Types.ObjectId;
}

const CharacterSchema : Schema = new Schema({
    character: { type: Object, required: true },
    user : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const CharacterModel = mongoose.model<ICharacterDocument>('Character', CharacterSchema);
export default CharacterModel;