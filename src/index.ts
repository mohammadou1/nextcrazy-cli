import NextCrazy from "./nextcrazy";
import clear from "clear";
export function index(): Promise<any> {
  clear();
  return NextCrazy();
}

index();
