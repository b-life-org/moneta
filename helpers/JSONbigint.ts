export function bigIntReplacer(_key: string, value: any): any {
    if (typeof value === "bigint") {
      return value.toString() + 'n';
    }
    return value;
  }
  
export function bigIntReviver(_key: string, value: any): any {
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      return BigInt(value.slice(0, -1));
    }
    return value;
  }