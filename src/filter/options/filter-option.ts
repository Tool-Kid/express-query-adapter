export abstract class FilterOption {
  public abstract setOption(
    query: { expressQuery: any, typeORMQuery: any }
  ): { expressQuery: any, typeORMQuery: any };
}
