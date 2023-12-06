import { Mapping } from "./Mapping";

export class Set {
  public readonly destination: string;
  public readonly source: string;
  public readonly maps: Mapping[];

  constructor(label: string, maps: Mapping[]) {
    const labelParts = label.split(" ")[0].split("-");
    this.destination = labelParts[2];
    this.source = labelParts[0];

    this.maps = maps;
  }

  public getDestination(source: number): number {
    let destination: number = source;

    this.maps.forEach(m => {
      if (m.containsSource(source)) {
        destination = m.getDestination(source);
      }
    })

    return destination;
  }
}
