import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createRemoteJWKSet, jwtVerify, JWTVerifyGetKey } from 'jose';
import { IS_PUBLIC_KEY } from './public.decorator';

/**
 * Verifies the Keycloak-issued Bearer token's signature and expiry via the
 * realm's JWKS endpoint. Issuer (`iss`) is deliberately NOT checked — see
 * controlplane/src/common/keycloak-auth.guard.ts for why (same guard,
 * duplicated rather than shared via a package for this PoC's scope).
 */
@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  private jwks: JWTVerifyGetKey | undefined;

  constructor(private readonly reflector: Reflector) {}

  private getJwks(): JWTVerifyGetKey {
    if (!this.jwks) {
      const jwksUrl = process.env.KEYCLOAK_JWKS_URL;
      if (!jwksUrl) throw new Error('KEYCLOAK_JWKS_URL is not set');
      this.jwks = createRemoteJWKSet(new URL(jwksUrl));
    }
    return this.jwks;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;
    if (!token) throw new UnauthorizedException('Missing bearer token');

    try {
      const { payload } = await jwtVerify(token, this.getJwks());
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
