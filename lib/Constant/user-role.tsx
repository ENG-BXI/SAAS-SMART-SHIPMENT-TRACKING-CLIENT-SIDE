export enum enUserRole {
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  DRIVER = 'driver'
}
export type UserRole = (typeof enUserRole)[keyof typeof enUserRole];

export const enUserRoleForSaasAdmin = {
  ADMIN: 'admin',
  ...enUserRole
} as const;

export type UserRoleForSaasAdmin = (typeof enUserRoleForSaasAdmin)[keyof typeof enUserRoleForSaasAdmin];

export const userRoleName = {
  [enUserRole.MANAGER]: 'مدير',
  [enUserRole.EMPLOYEE]: 'موظف',
  [enUserRole.DRIVER]: 'سائق'
} as const;
export const userRoleNameForSaasAdmin = {
  [enUserRoleForSaasAdmin.ADMIN]: 'مدير النظام',
  ...userRoleName
} as const;
