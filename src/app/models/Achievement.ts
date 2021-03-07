export class Achievement {
  private earned: boolean;

  constructor(
    public id: string,
    public text: string,
    public imagePath: string,
    public isEarned: Function) { }

  setEarned(value: boolean) {
    this.earned = value;
  }

  getEarned(): boolean {
    return this.earned || this.isEarned();
  }
}