export class Investment {
  constructor(
    public amount: number,
    public duration: number,
    public returnAmount: number
  ) {}

  public decreaseDuration(){
      this.duration--;
  }
}
