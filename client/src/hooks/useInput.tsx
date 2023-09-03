import { useState } from "react";

export function useInput({ type }: { type: string }, label: string): [string, JSX.Element] {
    const [value, setValue] = useState("");
    const input = <label>{label}<input value={value} onChange={e => setValue(e.target.value)} type={type} /></label>;
    return [value, input,];
}

