export enum enUserRole {
  manager = 2,
  employee = 3,
  driver = 4
}
export const enUserRoleForSaasAdmin = {
  admin: 1,
  ...enUserRole
} as const;
export const userRoleName = {
  [enUserRole.manager]: 'مدير',
  [enUserRole.employee]: 'موظف',
  [enUserRole.driver]: 'سائق'
} as const;
export const userRoleNameForSaasAdmin = {
  [enUserRoleForSaasAdmin.admin]: 'مدير النظام',
  ...userRoleName
} as const;

