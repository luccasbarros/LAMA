export class Shows {
  constructor(
    private id: string,
    private weekDay: string,
    private startTime: number,
    private endTime: number,
    private bandId: string
  ) {}

  public getId = (): string => this.id;
  public getWeekDay = (): string => this.weekDay;
  public getStartTime = (): number => this.startTime;
  public getEndTime = (): number => this.endTime;
  public getBandId = (): string => this.bandId;
}

export interface ShowInputDTO {
  weekDay: string;
  startTime: number;
  endTime: number;
  bandId: string;
}