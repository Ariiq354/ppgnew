import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  sidebar: ["admin", "user"],
} as const;

export type TStatement = {
  [key in keyof typeof statement]?: Array<
    (typeof statement)[key] extends readonly unknown[]
      ? (typeof statement)[key][number]
      : never
  >;
};

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  sidebar: ["user", "admin"],
  ...adminAc.statements,
});

export const user = ac.newRole({
  sidebar: ["user"],
});
