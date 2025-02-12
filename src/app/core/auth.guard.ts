import {CanActivateFn} from '@angular/router'
import {AuthService} from '../services/auth.service'
import {inject} from '@angular/core'
import {map} from 'rxjs'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  return authService.fetchToken().pipe(
    map((token) => !!token)
  )
}
