import UserModel, { IUserDocument } from "./models/user.model";
import { Logger } from "../../shared/logger/Logger";
import CharacterModel, { ICharacterDocument } from "./models/character.model";
import { SCharacter } from "../objects/SCharacter";

const mongoose = require('mongoose')
const dbName = 'space-age-test'
const url = 'mongodb://127.0.0.1:27017/' + dbName

export module Database {

    export enum EDataBaseError {
      NO_ERROR,
      WRONG_PASSWORD,
      DOES_NOT_EXIST,
      USERNAME_ALREADY_EXISTS,
      UNKNOWN_ERROR
    }

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

    export function newUser(_username: string, _password: string, callback: (error: EDataBaseError, users: IUserDocument | undefined) => void) {
      const userModel = new UserModel({username : _username, password: _password});
      userModel.save((error: any, user: IUserDocument) => {
        if(error) {
          Logger.error("Database Error: " + error);
          if(error.code == "11000") {
            callback(EDataBaseError.USERNAME_ALREADY_EXISTS, undefined);
          } else {
            callback(EDataBaseError.UNKNOWN_ERROR, undefined);
          }
        } else {
          callback(EDataBaseError.NO_ERROR, user)
        }
      });
    }

    export function getUser(usernameToFind: string, _password: string, callback: (error: EDataBaseError, users: IUserDocument | undefined) => void) : void {
      UserModel.find({username: usernameToFind}, (error: any, users: Array<IUserDocument>) => {
        let errorRet = EDataBaseError.NO_ERROR;
        let user = undefined;
        if(error) {
          Logger.debug("Database Error: " + error);
          callback(EDataBaseError.UNKNOWN_ERROR, undefined);
        }
        else if(users.length > 0) {
          if(passwordHash(users[0].password) != _password) {
            errorRet = EDataBaseError.WRONG_PASSWORD
          } else {
            user = users[0];
          }
        } else {
          errorRet = EDataBaseError.DOES_NOT_EXIST
        }
        callback(errorRet, user);
      });
    }

    export function getCharacters(user: IUserDocument, callback: (error: EDataBaseError, characters: Array<SCharacter>) => void) : void {
        CharacterModel.find({user: user._id}, (error: string, characterDocuments: Array<ICharacterDocument>) => {
          if(error) {
            Logger.debug("Database Error: " + error);
            callback(EDataBaseError.UNKNOWN_ERROR, new Array());
          } else {
                let characterArray : Array<SCharacter> = new Array();
                characterDocuments.forEach(characterDocument => {
                    let foundCharacter = SCharacter.createCharacter(characterDocument.character);
                    characterArray.push(foundCharacter);
                });
                callback(EDataBaseError.NO_ERROR, characterArray);
            }
        });
    }

    export function writeNewCharacter(user: IUserDocument, characterName: string, location: string, callback: (error: EDataBaseError) => void) : void {
      let character : SCharacter = SCharacter.createNewCharacter(user, characterName, location);
      const model = new CharacterModel({character: character.getData(), user: user._id});
      model.save((error: string, obj: ICharacterDocument) => {
            if(error) {
              Logger.debug("Database Error: " + error);
              callback(EDataBaseError.UNKNOWN_ERROR);
            } else {
              callback(EDataBaseError.NO_ERROR);
            }
        });
    }

    export function writeCharacter(character: SCharacter, user: IUserDocument, callback: (error: string) => void) : void {
      //Fix according to above. Add a skill progress last date transformation.
      character.resetState();
      CharacterModel.findOneAndUpdate({user: user._id, 'character.name': character.getData().name}, {$set:{character:character.getData()}}, callback);
    }

    export function getPlayerShipLocation(playerId : number) {
      return {
        sector_x: 0,
        sector_y: 0
      }
    }

    function passwordHash(password: string): string {
      //TODO
      return password;
    }
}