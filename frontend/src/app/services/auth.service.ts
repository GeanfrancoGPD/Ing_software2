import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
  tipo_usuario?: number;
}

export interface RecoverPayload {
  email: string;
}

export interface ResetPayload {
  email: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export interface UserData {
  name: string;
  email: string;
  profile: string;
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(payload: LoginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, payload, {
      withCredentials: true
    });
  }

  register(payload: RegisterPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, payload, {
      withCredentials: true
    });
  }

  recoverPassword(payload: RecoverPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/recover`, payload, {
      withCredentials: true
    });
  }

  resetPassword(payload: ResetPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/resetpassword`, payload, {
      withCredentials: true
    });
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }

  getData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/getdata`, {
      withCredentials: true
    });
  }
}
