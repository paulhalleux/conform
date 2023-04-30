import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ForwardedComponent<
  Props,
  Ref,
  Extend = {}
> = ForwardRefExoticComponent<Props & RefAttributes<Ref>> & Extend;
