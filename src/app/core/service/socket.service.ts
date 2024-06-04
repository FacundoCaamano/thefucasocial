import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket
 constructor(){
  this.socket = io(environment.socketUrl,{
    withCredentials:true,
    autoConnect:false
  })
 }

 connect(userId:string):void{
  if(!this.socket.connected){
    this.socket.connect()
    this.socket.emit('register', userId);
    console.log('Conectado a Socket.io');
  }
 }

 disconnect(){
  if(this.socket.connected){
    this.socket.disconnect
  }
 }

 emit(eventName: string, data: any): void {
  console.log(`Emitiendo evento ${eventName} con datos:`, data);
  this.socket.emit(eventName, data);
}

 on(eventName: string, callback: (data: any) => void): void {
  this.socket.on(eventName, (data) => {
    console.log(`Evento recibido: ${eventName} con datos:`, data);
    callback(data);
  });
}

 of(eventName:string, callback?:(data:any)=> void){
  this.socket.off(eventName, callback)
 }
   
}
