export class Investment {


  constructor(
    public amount: number,
    public duration: number,
    public interest: number
  ) { }

  public decreaseDuration() {
    this.duration--;
  }
}
