import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost";
};
declare function Button({ variant, style, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button };
