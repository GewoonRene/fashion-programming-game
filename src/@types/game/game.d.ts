
declare interface IGameState
{
	charachters: ICharacters[],
	clothes: PIXI.Sprite[]
	stage: PIXI.Container | null
}

declare interface IGameProps
{
	code: string | null
}

interface ICharacters
{
	body: PIXI.Sprite,
	active: boolean,
	playable: boolean
}