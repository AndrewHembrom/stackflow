declare module "react-tag-input" {
  export interface Tag {
    id: string;
    text: string;
    [key: string]: string; // Keep this for additional properties
  }

  // If there are other types or interfaces you want to modify, you can declare them here as well.
}
