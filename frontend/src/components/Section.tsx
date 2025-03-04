import { ReactNode } from "react";

export default function Section({children}:{children:ReactNode}) {
    return (
        <div>
            {children}
        </div>
    );
}