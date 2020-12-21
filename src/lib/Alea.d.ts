declare module 'Alea' {
  type RandomGenerator = () => number;
  export default function Alea(seed: any): RandomGenerator;
}

