export type Subcircle = "NodeJS" | "PHP" | "Java" | ".NET";
export type Level = "Beginner" | "Intermediate" | "Advanced";
export interface MemberInput {
  name: string;
  subcircle: Subcircle;
  level: Level;
}