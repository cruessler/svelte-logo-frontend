type Binding = null | string;

type Variables = Record<string, Binding>;

type Scope =
  | { type: "Root"; variables: Variables }
  | { type: "Local"; address: number; variables: Variables }
  | { type: "Template"; current: Binding; rest: string }
  | { type: "Loop"; current: number };

type Entry =
  | { type: "Input"; input: string }
  | { type: "Output"; output: string }
  | { type: "Error"; error: string };

interface Environment {
  history: Entry[];
}

export interface Vm {
  environment: Environment;
  stack: string[];
  instructions: string[];
  scopes: Scope[];
  programCounter: number;
}
