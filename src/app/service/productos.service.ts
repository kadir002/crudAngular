import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Productos } from '../interface/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    private url:string;
  constructor(private http: HttpClient) {
    this.url=environment.url;
   }

public show(){
  return this.http.get<Productos>(`${this.url}api/productos`);
}

   public storage(data:Productos) {

   return  this.http.post<Productos>(`${this.url}api/storage`,data);
   }

   public update(data:Productos,id:number) {
     return this.http.put<Productos>(`${this.url}api/update/${id}`,data)
   }

  public delete(data:Productos) {
  return  this.http.delete<Productos>(`${this.url}api/delete/${data}`)
  }

  public categoria() {
    return this.http.get<any>(`${this.url}api/categorias`);
  }
}
