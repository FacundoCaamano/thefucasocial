import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar encabezados comunes
    const headers = req.headers
      .set('Content-Type', 'application/json')
      // Agregar otros encabezados si es necesario
    

    // Clonar la solicitud original y agregar los nuevos encabezados
    const authReq = req.clone({ headers });

    // Pasar la solicitud clonada con los nuevos encabezados al siguiente manejador
    return next.handle(authReq);
  }
}
