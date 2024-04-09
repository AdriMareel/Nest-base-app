import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "./no-auth-required.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private relfector : Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.relfector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            console.log(err, info);
            throw err || new UnauthorizedException();
        }
        return user;
    }
}