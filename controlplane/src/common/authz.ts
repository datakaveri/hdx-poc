/** Shape of the decoded JWT payload KeycloakAuthGuard attaches as `request.user`. */
export interface AuthUser {
  sub: string;
  realm_access?: { roles?: string[] };
  node_id?: string;
  preferred_username?: string;
}

export function roles(user: AuthUser | undefined): string[] {
  return user?.realm_access?.roles ?? [];
}

export function isAdmin(user: AuthUser | undefined): boolean {
  return roles(user).includes('hdx_admin');
}

export function isNodeOwner(user: AuthUser | undefined): boolean {
  return roles(user).includes('node_owner');
}

/** True if `user` is the approved owner of `nodeId` (or is the platform admin). */
export function isOwnerOfNode(user: AuthUser | undefined, nodeId: string): boolean {
  if (isAdmin(user)) return true;
  return isNodeOwner(user) && user?.node_id === nodeId;
}
