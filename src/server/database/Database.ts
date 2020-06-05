import { IdHandler } from "./../IdHandler";
import { ItemFactory } from "./../ItemFactory";
import { ObjectInterfaces } from "../../shared/scripts/ObjectInterfaces";
import { Items } from "./../../shared/scripts/Items";
import UserModel, { IUserDocument } from "./models/user.model";
import { Logger } from "../../shared/logger/Logger";
import CharacterModel, { ICharacterDocument } from "./models/character.model";
import { ICharacter } from "../../shared/interfaces/ICharacter";
import { ICargo } from "../../shared/interfaces/ICargo";
import { Stats } from "../../shared/stats/Stats";
import { SCharacter } from "../objects/SCharacter";
import { SShip } from "../objects/SShip";

const mongoose = require('mongoose')
const dbName = 'space-age-test'
const url = 'mongodb://127.0.0.1:27017/' + dbName

export module Database {

    let db;

    export function startDb() {
      db = mongoose.connection
      db.once('open', (_: any) => {
        Logger.info('Database connected:' + url)
      })
      
      db.on('error', (err: any) => {
        Logger.error('Database connection error: ' + err)
      })

      mongoose.connect(url, {
        useUnifiedTopology : true,
        useNewUrlParser: true
      });
    }

    export function newUser(_username: string, callback : (error: string, user: IUserDocument) => void) {
      const userModel = new UserModel({username : _username});
      userModel.save(callback);
    }

    export function getUser(usernameToFind: string, callback : (error: string, users: Array<IUserDocument>) => void) : void {
      UserModel.find({username: usernameToFind}, callback);
    }

    export function getCharacters(user: IUserDocument, callback: (error: string | undefined, characters: Array<SCharacter>) => void) : void {
        CharacterModel.find({user: user._id}, (err: string, characterDocuments: Array<ICharacterDocument>) => {
            if(err) {
                callback("Database error: " + err, new Array());
            } else {
                let characterArray : Array<SCharacter> = new Array();
                characterDocuments.forEach(characterDocument => {
                    let foundCharacter = SCharacter.createCharacter(characterDocument.character);
                    characterArray.push(foundCharacter);
                });
                callback(undefined, characterArray);
            }
        });
    }

    export function writeNewCharacter(user: IUserDocument, location: string, callback: (error: string | undefined) => void) : void {
      let character : SCharacter = SCharacter.createNewCharacter(user, location);
      const model = new CharacterModel({character: character.getData(), user: user._id});
      model.save((err: string, obj: ICharacterDocument) => {
            if(err) {
                callback("Database error: " + err);
            } else {
                callback(undefined);
            }
        });
    }

    export function writeCharacter(character: SCharacter, user: IUserDocument, callback: (error: string) => void) : void {
      //Fix according to above. Add a skill progress last date transformation.
      let ship : SShip = character.getShip();
      ship.resetState();
      CharacterModel.findOneAndUpdate({user: user._id, 'character.name': character.getData().name}, {$set:{character:character.getData()}}, callback);
    }

    export function getPlayerShipLocation(playerId : number) {
      return {
        sector_x: 0,
        sector_y: 0
      }
    }
}