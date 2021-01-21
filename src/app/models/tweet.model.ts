export class Tweet {
  constructor(
    public _id: string,
    public created_at: string,
    public id_str: string,
    public text: string,
    public lang: string,
    public category: string,
    public topic: string,
    public score: number
  ) {}
}
