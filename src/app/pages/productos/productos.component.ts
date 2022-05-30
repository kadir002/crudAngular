import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/service/productos.service';
import { faCircle,faPen,faTrash,faSearch,faPlus,faSliders } from '@fortawesome/free-solid-svg-icons';
import { Productos } from 'src/app/interface/productos';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public imagen!: string;
  public productos: Productos[];
  public img: any;
  //iconos
  public circle = faCircle;
  public faPenClip = faPen;
  public trash = faTrash;
  public fasearch = faSearch;
  public plus = faPlus;
  public faSlider=faSliders;
  //fin iconos
  public status: boolean = false;
  public load: boolean = false;
  public itemSearch: string = '';
  public imgPrevi: string = '';
  public UpdateBtn: boolean = true;
  private id: number = 0;
  public categoria:any[];

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required, Validators.pattern(/.*^\d+$/)]),
    descripcion: new FormControl('', [Validators.required]),
    inventario: new FormControl('', [Validators.required,Validators.pattern(/.*^\d+$/)]),
    categoria: new FormControl('', [Validators.required])


  })
  constructor(private formBuild: FormBuilder, private productoService: ProductosService) {
    this.productos = [];
    this.categoria=[];
    this.itemSearch = '';
  }

  ngOnInit(): void {

    this.productoService.show().subscribe(res => {
      this.load = true;
      if (res.status) {
        this.status = true;
        this.productos = res.producto;
      } else {
        this.status = false;

      }
    })

   
    this.productoService.categoria().subscribe(res=>{
    
      this.categoria=res;
    })

  }





  public get Fail() {
    return this.form.controls;
  }

  public upload(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.imgPrevi = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result
        })

      }
    }

  }

  public submit() {

    this.productoService.storage(this.form.value).subscribe(res => {

   
      if (res.status) {
        this.productos.unshift(res.producto);
        this.resetForm();
      }else{
       
        
      }


    })

  }

  public update() {

    let val = this.productos.findIndex(element => element.id == this.id)
    let dataNew = [...this.productos]


    this.productoService.update(this.form.value, this.id).subscribe(res => {

      dataNew[val] = {
        ...dataNew[val], descripcion: res.descripcion, img: res.img,
        inventario: res.inventario, nombre: res.nombre, precio: res.precio, categoria: res.categoria
      }

      this.productos = dataNew;


    })
  }




  public delete(data: any) {

    this.productoService.delete(data).subscribe(res => {
      const producto = this.productos.findIndex((element) => element.id === data);
      this.productos.splice(producto, 1);
    })

  }


  public resetForm() {
    this.UpdateBtn = false;
    this.imgPrevi = './assets/img/sinImg.png';
    this.id = 0;
    this.form.reset();
  }


  public updateBtn(data: any) {

    this.UpdateBtn = true;
    this.form.patchValue(data)
    this.imgPrevi = data.img
    this.id = data.id;

  }
}
