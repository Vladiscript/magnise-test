import {computed, inject, Injectable, signal} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {AuthToken} from '../models/token'
import {Observable, tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient)

  #authToken = signal<AuthToken | null>(null)

  accessToken = computed(() => this.#authToken()?.access_token)

  fetchToken(): Observable<AuthToken> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'app-cli')
      .set('username', environment.userName)
      .set('password', environment.password)
      .toString()

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.#http.post<AuthToken>(environment.apiUri + '/identity/realms/fintatech/protocol/openid-connect/token', body, {headers}).pipe(
      tap((credentials) => {
        this.#authToken.set(credentials)
      })
    )
  }
}
