import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  let token = '';

  if (isPlatformBrowser(platformId)) {
    // ✅ Only access localStorage in the browser
    const stored = localStorage.getItem('authToken');
    if (stored) {
      try {
        token = JSON.parse(stored)?.token ?? '';
      } catch (e) {
        console.error('Invalid token in localStorage:', e);
      }
    }
  }

  const clonedReq = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return next(clonedReq);
};
