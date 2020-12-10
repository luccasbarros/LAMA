export class Band {
  constructor(
    private id: string,
    private name: string,
    private musicGenre: string,
    private responsible: string
  ) {}

  public getId = (): string => this.id;
  public getName = (): string => this.name;
  public getGenre = (): string => this.musicGenre;
  public getResponsible = (): string => this.responsible;
}

export interface BandInputDTO {
  name: string,
  musicGenre: string,
  responsible: string,
}
