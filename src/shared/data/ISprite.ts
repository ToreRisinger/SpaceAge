export interface ISprite {
    key: string,
    file: string,
    width: number,
    height: number
}

export interface ISpriteAnimation {
    animation: number | undefined,
    sprite : ISprite
}