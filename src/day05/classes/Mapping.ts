export class Mapping {
  public readonly destinationRangeStart: number;
  public readonly sourceRangeStart: number;
  public readonly rangeLength: number;

  constructor(mapping: string) {
    const components = mapping.split(" ");

    this.destinationRangeStart = Number(components[0]);
    this.sourceRangeStart = Number(components[1]);
    this.rangeLength = Number(components[2]);
  }

  public containsSource(source: number): boolean {
    const sourceRangeEnd = this.sourceRangeStart + this.rangeLength - 1;
    return source >= this.sourceRangeStart && source <= sourceRangeEnd;
  }

  public getDestination(source: number) {
    if (this.containsSource(source)) {
      const diff = source - this.sourceRangeStart;
      return this.destinationRangeStart + diff;
    } else {
      return source;
    }
  }
}
